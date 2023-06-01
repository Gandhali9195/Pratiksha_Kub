const { createHash } = require('crypto')
const { CryptoFactory, createContext } = require('sawtooth-sdk/signing')
const protobuf = require('sawtooth-sdk/protobuf')
// const fs = require('fs')
const fetch = require('node-fetch');
const { Secp256k1PrivateKey } = require('sawtooth-sdk/signing/secp256k1')
const { TextEncoder, TextDecoder } = require('text-encoding/lib/encoding')
const reader = require('xlsx')
//const file = reader.readFile('./vmconfiguration.xlsx')



const FAMILY_NAME = "certificate";
const FAMILY_VERSION = "1.0";
const ip = "10.210.12.231";


function hash(v) {
  return createHash('sha512').update(v).digest('hex');
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}



class CertificateClient{
  constructor(Key,ipaddr) { 

     // ip=ipaddr;	  
    const context = createContext('secp256k1');
    const secp256k1pk = Secp256k1PrivateKey.fromHex(Key.trim());
    this.signer = new CryptoFactory(context).newSigner(secp256k1pk);
    this.publicKey = this.signer.getPublicKey().asHex();
    this.address = hash(FAMILY_NAME).substr(0, 6) + hash(this.publicKey).substr(0, 64);
    console.log("Storing at: " + this.address);
  }

  async send_data(action, c, quantity) {

    var inputAddressList = [this.address];
    var outputAddressList = [this.address];
    var payload = action + "," + c + "," + quantity;
    var encode = new TextEncoder('utf8');
    const payloadBytes = encode.encode(payload)
    const transactionHeaderBytes = protobuf.TransactionHeader.encode({
      familyName: FAMILY_NAME,
      familyVersion: FAMILY_VERSION,
      inputs: inputAddressList,
      outputs: outputAddressList,
      signerPublicKey: this.signer.getPublicKey().asHex(),
      nonce: "" + Math.random(),
      batcherPublicKey: this.signer.getPublicKey().asHex(),
      dependencies: [],
      payloadSha512: hash(payloadBytes),
	    //-----------
	   // await sleep(1000);

//  console.log("----------------------------------------------------- send data --------------------------------------------------");
    }).finish();

    const transaction = protobuf.Transaction.create({
      header: transactionHeaderBytes,
      headerSignature: this.signer.sign(transactionHeaderBytes),
      payload: payloadBytes
    });
    const transactions = [transaction];
    const batchHeaderBytes = protobuf.BatchHeader.encode({
      signerPublicKey: this.signer.getPublicKey().asHex(),
      transactionIds: transactions.map((txn) => txn.headerSignature),
    }).finish();

    const batch = protobuf.Batch.create({
      header: batchHeaderBytes,
      headerSignature: this.signer.sign(batchHeaderBytes),
      transactions: transactions,
    });

    const batchListBytes = protobuf.BatchList.encode({
      batches: [batch]
    }).finish();
    this._send_to_rest_api(batchListBytes);
     
  }

  async _send_to_rest_api(batchListBytes) {

    let response = await fetch(`http://${ip}:8008/batches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream'
      },
      body: batchListBytes

	    //-------
	 //   await sleep(1000)
//	   console.log("----------------------------------------------------- rest api ---------------------------------------");
    });
	   console.log("----------------------------------------------------- rest api ---------------------------------------");

    console.log("response", response);
  }

  
  async _get_data(access) {
    try {
      let response = await fetch(`http://${ip}:8008/state/` + this.address, {
        method: 'GET',
      });
      let responseJson = await response.json();
      var data = responseJson.data;

      var cert_data = new Buffer(data, 'base64').toString();

	    console.log("\n\n\n");
            var newobj=[];
	    var map1 = new Map();
	    var newlycreatedobj;
	    var newstr = cert_data.split(',,');
	    for(var i=0;i<newstr.length;i++){
                if(newstr[i]=="")		{
                        continue;
			}else{
				if(i==(newstr.length-1))
				{
				var strl = newstr[newstr.length-1].split('},');
				newstr[i]=strl[0].concat('}');
				}
                              newlycreatedobj = JSON.parse(newstr[i]);
				 map1.set(newlycreatedobj.certificate,newlycreatedobj);
                          newobj[newobj.length] = newlycreatedobj;
			}

	    }

	     if(access=="get")
      {
        return newobj;
      }else {

          var d=map1.get(access);
          if(d==undefined)
          {
              return "not found";
          }
          else{
            return "found";
          }

        }

	 
      
    }
    catch (error) {
      console.error(error);
    }

  }


  async _get_obj_data() {
    try {
      let response = await fetch(`http://${ip}:8008/state/` + this.address, {
        method: 'GET',
      });
      let responseJson = await response.json();
      var data = responseJson.data;

      var cookieCount = new Buffer(data, 'base64').toString();
      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%cookieCount new value : %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%" + cookieCount);

      // var myMap = new Map();
      // var alldata=[];
      // var objectlist = [];

      // var objl = cookieCount.split(/[\"\,\",\"]/);

      // for (var i = 0; i < objl.length; i++) {
      //   if(objl[i]==""){

      //   }else{
      //     var data={
      //       "hash":objl[i]
      //     };
      //     myMap.set(objl[i],data);
      //   }
      // }

      // return myMap.get(hash);

      return cookieCount;
    }
    catch (error) {
      console.error(error);
    }

  }

}

module.exports.CertificateClient = CertificateClient;
