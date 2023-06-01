'use strict';

var express = require('express');
var bodyParser = require('body-parser');
/*var xmlparser = require('express-xml-bodyparser');
var app = express();
app.use(xmlparser());
var parseString = require('xml2js').parseString;
*/
 /*var app = express();
 app.use(bodyParser.urlencoded({
         extended:true
 }));
*/

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
});

// app.use(bodyParser.json());
const fs = require('fs');
const md5 = require("md5");

var { CertificateClient } = require('./CertificateClient');
var { certificateLogic } = require('./certificateLogic');


var crypto = require("crypto");
const e = require('express');

function prettyJSONString(inputString) {
   return JSON.stringify(JSON.parse(inputString), null, 2);
}

const swaggerOptions = {
        swaggerDefinition:{
                info:{
                  title:'certificate Api',
                  description:" Certificate Api ",
                  servers:["http://10.210.0.124:3002"]

                }
        },
        apis:["router.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));


app.post('/api/verify', async function (req, res) {
        try {

                try {

                        var data = req.body.certificate;

                        //console.log("data :"+data);
                        //console.log("id :"+data.id);
                        var cert = new certificateLogic();
                        var alldata = await cert.verify(data);

                        if(alldata=="verified"){
                                console.log({status:"verified",result:alldata});
                        res.json({status:"verified",result:alldata});

                }else{

                console.log({status:"fail",result:alldata});
                        //res.send(alldata);
                        res.json({status:"fail",result:alldata});

                }

                } finally {

                }
        } catch (error) {
                console.error(`******** FAILED to run the application: ${error}`);
        }

})

app.use(express.json());
/**
 * @swagger
 * definitions:
 *  certificate:
 *   type: object
 *   properties:
 *    id:
 *     type:string
 */


 /**
  * @swagger
  * /api/fetchalldata:
  *  get:
  *   parameters:
  *    - in: body
  *      id: body
  *      required: true
  *      description: body of the team
  *      schema:
  *       $ref: '#/definitions/certificate'
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/certificate'
  *   responses:
  *    200:
  *     description: created succesfully
  *    500:
  *     description: failure in creating
  */

app.post('/api/fetchalldata', async function (req, res) {
        try {

                try {


                        var data = req.body.certificate;

                        var cert = new certificateLogic();
                        var alldata = await cert.retrieveCertificate(data);

                        if(alldata=="certificate is not available in ledger!"){
                        return res.json({ status:"fail",result: alldata });
                        }else{
                        return res.json({ status:"success",result: alldata });

                        }
                } finally {

                }
        } catch (error) {
                console.error(`******** FAILED to run the application: ${error}`);
        }

})

 /**
  * @swagger
  * /api/count:
  *  get:
  *   parameters:
  *    - in: body
  *      id: body
  *      required: true
  *      description: body of the team
  *      schema:
  *       $ref: '#/definitions/certificate'
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/certificate'
  *   responses:
  *    200:
  *     description: created succesfully
  *    500:
  *     description: failure in creating
  */

app.post('/api/count', async function (req, res) {
        try {

                var data = req.body.certificate;
                var certificatelogic=new certificateLogic();
        var cert_length = await certificatelogic.countCertificate(data.id,data.ip);
                if(cert_length=="Certificate is not Available")
                {
                        console.log({status:"fail",result: cert_length});
                   return res.json({ status:"fail",result: cert_length });
                //      res.json({status:"success",result:alldata});
                }else{
                        console.log({status:"success",result: cert_length });
                        res.json({status:"success",result: cert_length });
                }
        } catch (error) {
                console.error(`******** FAILED to run the application: ${error}`);
        }

})

/*app.post('/api/verify', async function (req, res) {
        try {

                        var data = req.body.certificate;
                            var cert = new certificateLogic();
                        var alldata = await cert.matchCertificate(data);

        } catch (error) {
                console.error(`******** FAILED to run the application: ${error}`);
        }
});
*/
/*
app.post('/api/insertcertificate', async function (req, res) {
        try {

                try {

                        var data = req.body.certificate;

                        //console.log("fetch data :"+data);
                        var id = req.body.certificate.id;
                        //console.log(data);
                      var certificatelogic=new certificateLogic();
              var resdata =  await certificatelogic.storeCertificate(data,id);
                        if(resdata=="certificate uploaded successfully"){
                        return res.json({ status:"success",result: resdata });
                        }else{
                        return res.json({ status:"fail",result: resdata });
                        }

                } finally {

                }
        } catch (error) {
                console.error(`******** FAILED to run the application: ${error}`);
        }

})
*/




app.post('/api/insertcertificatebyname', async function (req, res) {
        try {

                try {

                        var data = req.body.certificate;

                       // console.log("fetch data :"+data);
                        var id = req.body.certificate.id;
                       // console.log(data);
                      var certificatelogic=new certificateLogic();
              var resdata =  await certificatelogic.storeCertificate(data,id);
                        //return res.send(resdata.resultdata);
                        if(resdata.resultdata=="certificate uploaded successfully"){
                                console.log({ filename:resdata.alldata.filename,status:"success",result: resdata.resultdata });
                        return res.json({ filename:resdata.alldata.filename,status:"success",result: resdata.resultdata });
                        }else{
                                console.log({filename:resdata.alldata.filename,status:"fail",result: resdata.resultdata});
                        return res.json({filename:resdata.alldata.filename,status:"fail",result: resdata.resultdata});
                        }

                } finally {

                }
        } catch (error) {
                console.error(`******** FAILED to run the application: ${error}`);
        }

})

app.post('/api/bulk_store_certificates', async function (req, res) {
        try {

                try {

                        var data = req.body.certificatelist;
                        var newlist=[];
                         var cert = new certificateLogic();
                        var alldata = await cert.bulkStoreCertificates(data);
        /*              if(alldata=="successfully stored certificates")
                           {
                              return res.json({ status:"success",result:alldata});
                            }else{
                                     return res.json({ status:"fail",result:alldata });
                                  }

                                  */
                        console.log("bulk verify certificate status \n"+{alldata});
                        res.json({alldata});


                      // res.send(alldata);

                } finally {

                }
        } catch (error) {
                console.error(`******** FAILED to run the application: ${error}`);
        }

})


app.post('/api/bulk_verify', async function (req, res) {
        try {

                try {

                        var data = req.body.certificatelist;
                        var newlist=[];
                         var cert = new certificateLogic();
                        var alldata = await cert.bulk_verify(data);
                  /*      if(alldata=="verified")
                           {
                              return res.json({ status:"verified",result: alldata });
                            }else{
                               return res.json({ status:"fail",result: alldata });
                                  }

*/
                      // res.send(alldata);
                        console.log("bulk verify certificate status \n"+{alldata});
                res.json({alldata});

                } finally {

                }
        } catch (error) {
                console.error(`******** FAILED to run the application: ${error}`);
        }

})

console.log("port is listing on " + app.listen(3002));

