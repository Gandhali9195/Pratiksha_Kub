'use strict';var express = require('express');const fs = require('fs');const md5 = require("md5");var isBase64 = require('is-base64');var { CertificateClient } = require('./CertificateClient');
var crypto = require("crypto");
function prettyJSONString(inputString) 
{        return JSON.stringify(JSON.parse(inputString), null, 2);
}
function sleep(ms) {  
return new Promise((resolve) => setTimeout(resolve, ms));
}
class certificateLogic{ 
sconstructor() {  }

//Replace  















async storeCertificate(data,id)
{
                       var name = id;
	               var ip=data.ip;
                       var pri_key = crypto.createHash("sha256").update(name).digest('hex');
                       var newdata={
                               "resultdata":"",
                               "alldata":data
                               };
                       var str = data.certificate;
                        if(str.length % 4 == 0 && /^[A-Za-z0-9+/]+[=]{0,3}$/.test(str))
                     {
                       const hash = md5(data.certificate);
                       data.certificate = hash;
                       console.log(hash);
                       var today = new Date();
                       var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                       var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                     var dateTime = date + ' ' + time;
                       data["Date"] = dateTime;
                       var certificate_client = new CertificateClient(pri_key,ip);
                       const cert_data = await certificate_client._get_data("get");
                       var certCount;
                        if(cert_data == undefined) {
                         certCount = 0;
                       }else{
                       var  checkallreadyExits =await certificate_client._get_data(data.certificate);
                       if(checkallreadyExits == "found"){
                             newdata.resultdata='certificate is already present';
                               return newdata;
                       }else{
                          certCount = await this.countCertificate(id,ip);
                       }}
                               var action = "certificateAdd";
                                               certificate_client.send_data(action,certCount, JSON.stringify(data));
                               newdata.resultdata="certificate uploaded successfully";
                               return newdata;
                           }
                         
                          else{
                         
                                   newdata.resultdata="insert base64 certificate string";
                                  return newdata;
                          }
 
}async bulkStoreCertificates(data)
{
 console.log(data);
       var newlist=[];
       var listd=[];
       newlist = data;
       var notstoredcert=[];
   for(var i=0;i<data.length;i++)
       {
           listd[i]=data[i].certificate;
       }
       for(var i=0;i<newlist.length;i++)
       {
               var cert = await this.storeCertificate(newlist[i],newlist[i].id);
               await sleep(1000);
               var d={
                  "filename":cert.alldata.filename,
                  "status":"",
                  "result":"",
               }
               if(cert.resultdata=="certificate uploaded successfully")
               {
                       d.status="success";
                       d.result=cert.resultdata;
                       notstoredcert[notstoredcert.length]=d;
                     }else{
                     d.status="fail";
                     d.result=cert.resultdata;
                       notstoredcert[notstoredcert.length]=d;
     
                     }
                    
     
             }
             return notstoredcert;
           } async countCertificate(data,ip)
{
var name = data;
               var pri_key = crypto.createHash("sha256").update(name).digest('hex');
               var certificate_client = new CertificateClient(pri_key,ip);
             const cert_data = await certificate_client._get_data("get");
                       if (cert_data == undefined) {
                           return "Certificate is not Available";
                       }
       console.log("cert length "+cert_data.length);
                       return cert_data.length;
}async verify(data){
   var name = data.id;
   var pri_key = crypto.createHash("sha256").update(name).digest('hex');
   var certificate_client = new CertificateClient(pri_key);
 
     const hash = md5(data.certificate);
                     data.certificate = hash;
                     console.log(hash);
                     var today = new Date();
                     var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                     var dateTime = date + ' ' + time;
 
 
                     data["Date"] = dateTime;
 
   var checkallreadyExits =await certificate_client._get_data(data.certificate);
    if(checkallreadyExits == "found"){
          return 'verified';
      }else{
             return 'verification fail'
         }
}async bulk_verify(data){
   var newlist=data;
   var listd=[];
   var notverifiedcert=[];
 
 
 
for(var i=0;i<data.length;i++)
   {
         listd[i]=data[i].certificate;
   }
 
  for(var i=0;i<newlist.length;i++){
 var pri_key = crypto.createHash("sha256").update(newlist[i].id).digest('hex');
 var certificate_client = new CertificateClient(pri_key);
 
 
          const hash = md5(newlist[i].certificate);
                   newlist[i].certificate = hash;
                   var today = new Date();
                   var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                   var dateTime = date + ' ' + time;
 
 
                   newlist[i]["Date"] = dateTime;
                   var d={
                       "filename":newlist[i].filename,
                       "status":"",
                       "result":"",
                      }
    
    
          var checkallreadyExits =await certificate_client._get_data(newlist[i].certificate);
           if(checkallreadyExits == "found"){
                     d.status="verified";
                            d.result="certificate successfully verified";
                  notverifiedcert[notverifiedcert.length] = d;
    
             }else{
    
                      d.status="fail";
                            d.result="certificate is not found";
                     notverifiedcert[notverifiedcert.length] = d;
                }}
    
    
            return notverifiedcert;
    }






















}
module.exports.certificateLogic = certificateLogic;
