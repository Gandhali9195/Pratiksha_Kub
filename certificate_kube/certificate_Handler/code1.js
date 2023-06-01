// var parseString = require('xml2js').parseString;
// var xml = "<root>Hello xml2js!</root>"
// parseString(xml, function (err, result) {
//     console.dir(result);
// });

// var map1 = new Map([[1 , 2], [2 ,3 ] ,[4, 5]]);
// console.log(map1);

// var r=["jkclientreq","id","JNKCERT01","domecilecertificate","1 Data"];
// var d={};
// for(var i=0;i<r.length;i++)
// {
   
//     d[r[0]]={};
//     r[0]["hello"]="pratiksha";
//     console.log(typeof(r[1])+"*******"+JSON.stringify(r[0]["hello"]));
// }



	
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

console.log(dateTime);