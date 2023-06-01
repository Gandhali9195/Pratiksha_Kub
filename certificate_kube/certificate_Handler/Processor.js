/*This code specifies the Transaction Processor part.This code transfers the
  transaction processing requests to a registered handler,the CookieJarHandler.*/

  'use strict'
  //works in strict mode
  const { TransactionProcessor } = require('sawtooth-sdk/processor')
  //requires the module specified in ().
  const Handler = require('./CertificateHandler')
  // handler for cookie store
  




const url_0 = "tcp://10.210.12.231:4004";
const url_1 = "tcp://10.210.12.233:4004";
const url_2 = "tcp://10.210.12.235:4004";
const url_3 = "tcp://10.210.12.233:4004";
const url_4 = "tcp://10.210.12.235:4004";





























//start tp
const transactionProcessors_0 = new TransactionProcessor(url_0)
transactionProcessors_0.addHandler(new Handler())
transactionProcessors_0.start()
const transactionProcessors_1 = new TransactionProcessor(url_1)
transactionProcessors_1.addHandler(new Handler())
transactionProcessors_1.start()
const transactionProcessors_2 = new TransactionProcessor(url_2)
transactionProcessors_2.addHandler(new Handler())
transactionProcessors_2.start()
const transactionProcessors_3 = new TransactionProcessor(url_3)
transactionProcessors_3.addHandler(new Handler())
transactionProcessors_3.start()
const transactionProcessors_4 = new TransactionProcessor(url_4)
transactionProcessors_4.addHandler(new Handler())
transactionProcessors_4.start()


































