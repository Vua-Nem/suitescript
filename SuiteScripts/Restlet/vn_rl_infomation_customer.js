/**
 *@NApiVersion 2.1
 *@NScriptType Restlet
  *@author Hau Nguyen Teibto
 */
define(['N/record', 'N/format', 'N/search', 'N/runtime',],
    /**
    
     * @param {libCode} _libCode
     * @param {libAPI} _libAPI
     */

    function (record, format, search, runtime,) {
        function post(context) {
            try {
                log.debug("Start","Start");
                log.audit('post', 'Context : ' + JSON.stringify(context));
                var email = context.phoneNumber.split(',');
                log.debug("email :", email);
                if (email[0] === "") {
                    return objResp = {
                        status: "failed",
                        code: 500,
                        error: "Please enter phoneNumber "
                    }
                }
                var customerInforFromTransaction = getInfoCustomerFromTransactionType(email);
                if(customerInforFromTransaction.length>0){
                    var customerInforFromTransactionGroup = customerInforFromTransaction.reduce((r, a) => {
                        r[a.rangeDate] = [...r[a.rangeDate] || [], a];
                        return r;
                    }, {});
                    var rangeArr = (Object.keys(customerInforFromTransactionGroup));
                    var rangeArrSort=rangeArr.sort();
                    customerInforFromTransaction=customerInforFromTransactionGroup[rangeArrSort[0]];
                }
                else{
                    customerInforFromTransaction=[];
                }
                var customerInfoFromCustomerType = getInfoCustomerFromCustomerType(email);
                if(customerInfoFromCustomerType.length>0){
                    var customerInfoFromCustomerTypenGroup = customerInfoFromCustomerType.reduce((r, a) => {
                        r[a.rangeDate] = [...r[a.rangeDate] || [], a];
                        return r;
                    }, {});
                    var rangeArr = (Object.keys(customerInfoFromCustomerTypenGroup));
                    var rangeArrSort=rangeArr.sort();
                    customerInfoFromCustomerType=customerInfoFromCustomerTypenGroup[rangeArrSort[0]];
                }
                else{
                    customerInfoFromCustomerType=[];
                }

                for (var i = 0; i < customerInforFromTransaction.length; i++) {
                    for (var j = 0; j < customerInfoFromCustomerType.length; j++) {
                        if (customerInforFromTransaction[i].phone == customerInfoFromCustomerType[j].phone) {
                            customerInforFromTransaction[i].totalAmount = customerInfoFromCustomerType[j].totalAmount;
                        }
                    }
                }
                if(customerInforFromTransaction)
                for (i = 0; i < customerInforFromTransaction.length; i++) {
                    delete customerInforFromTransaction[i]['rangeDate'];
                }
                for (i = 0; i < customerInfoFromCustomerType.length; i++) {
                    delete customerInfoFromCustomerType[i]['rangeDate'];
                  
                }
                if (customerInforFromTransaction.length == 0) {
                    customerInforFromTransaction = customerInfoFromCustomerType
                }

                objResp = {
                    success: true,
                    code: 200,
                    customerInfor: customerInforFromTransaction
                }

            } catch (e) {

                objResp = {
                    success: false,
                    code: 405,
                    error: e.message
                };


            }
            log.debug('objResp', objResp);
            log.debug("finish","finish")
            return objResp;
        }
        function getInfoCustomerFromTransactionType(email) {
            var rs = search.load(
                {
                    id: 1123
                });
            log.debug("rs", rs)
            var filter = search.createFilter({
                "name": "custbody_customer_phone",
                "operator": "is",
                "values": [
                    email
                ],
                "isor": false,
                "isnot": false,
                "leftparens": 0,
                "rightparens": 0
            });
            var cols = rs.columns;
            rs.filters.push(filter);
            var myResults = getAllResults(rs);
            var cols = rs.columns;
            log.debug("myResults", myResults);
            var tmp = [];
            for (var i = 0; i < myResults.length; i++) {
                tmp[i] = {};
                tmp[i].name = myResults[i].getText(cols[1]);
                tmp[i].phone = myResults[i].getValue(cols[2]);
                tmp[i].address = myResults[i].getValue(cols[3]);
                tmp[i].date = myResults[i].getValue(cols[4]);
                tmp[i].recipient = myResults[i].getValue(cols[5]);
                tmp[i].recipientPhone = myResults[i].getValue(cols[6]);
                tmp[i].shippingAddres = myResults[i].getValue(cols[7]);
                tmp[i].item = myResults[i].getValue(cols[8]);
                tmp[i].nameItem = myResults[i].getValue(cols[9]);
                tmp[i].amount = myResults[i].getValue(cols[10]);
                tmp[i].quantity = myResults[i].getValue(cols[11]);
                tmp[i].totalAmountSo = myResults[i].getValue(cols[12]);
                tmp[i].rangeDate = myResults[i].getValue(cols[14]);
                
            }
            return tmp;
        }
        function getInfoCustomerFromCustomerType(email) {
            var rs = search.load(
                {
                    id: 1125
                });
            log.debug("rs1", rs);
            var filter = search.createFilter({
                "name": "phone",
                "operator": "is",
                "values": [
                    email
                ],
                "isor": false,
                "isnot": false,
                "leftparens": 0,
                "rightparens": 0
            });
            var cols = rs.columns;
            rs.filters.push(filter);
            var myResults = getAllResults(rs);
            var cols = rs.columns;
            log.debug("myResults1", myResults);
            var tmp = [];
            for (var i = 0; i < myResults.length; i++) {
                tmp[i] = {};
                tmp[i].name = myResults[i].getValue(cols[1]);
                tmp[i].phone = myResults[i].getValue(cols[2]);
                tmp[i].address = myResults[i].getValue(cols[3]);
                tmp[i].totalAmount = myResults[i].getValue(cols[4]);
                tmp[i].rangeDate= myResults[i].getValue(cols[6])
            }
            return tmp
        }
        function getAllResults(s) {
            var results = s.run();
            var searchResults = [];
            var searchId = 0;
            do {
                var resultSlice = results.getRange({ start: searchId, end: searchId + 1000 });
                resultSlice.forEach(function (slice) {
                    searchResults.push(slice);
                    searchId++;
                });

            } while (resultSlice.length >= 1000);
            return searchResults;
        }
      
        return {
            post: post,

        }
    });
