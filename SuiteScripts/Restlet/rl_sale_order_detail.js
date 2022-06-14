/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/dataset', 'N/query'],
    /**
 * @param{dataset} dataset
 */
    (dataset, query) => {
        /**
         * Defines the function that is executed when a GET request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const get = (requestParams) => {
            if (typeof requestParams.orderId === 'undefined') {
                return {
                    status: 0,
                    message: "CustomerId is required"
                }
              }
            var orderId = requestParams.orderId;
            var myLoadedDataset = dataset.load({
                id: 'custdataset48'    // Use a script ID from an existing script
            });
            // return {
            //     data: myLoadedDataset
            // }
            // Type coloumn
            var myTypeColumn = dataset.createColumn({
                fieldId: 'type',
                id: 6
            });
            var myTypeCondition = dataset.createCondition(
                {
                    column: myTypeColumn,
                    operator: query.Operator.ANY_OF,
                    values: ["SalesOrd"]
                }
            );

            // Order Id
            var OrderIdColumn = dataset.createColumn({
                fieldId: 'id',
                id: 61
            });
            var OrderIdCondition = dataset.createCondition(
                {
                    column: OrderIdColumn,
                    operator: query.Operator.EQUAL,
                    values: [orderId]
                }
            );

            // Item type
            var ItemJoin = dataset.createJoin({
                fieldId: 'transactionlines'
            });
            var ItemTypeColumn = dataset.createColumn({
                fieldId: 'itemtype',
                join: ItemJoin,
                id: 10
            });
            var ItemTypeCondition = dataset.createCondition(
                {
                    column: ItemTypeColumn,
                    operator: query.Operator.ANY_OF,
                    values: ["InvtPart", "Discount"]
                }
            );

            var myCondition = dataset.createCondition({
                column: null,
                operator: 'AND',
                children: [
                    myTypeCondition, 
                    OrderIdCondition,
                    ItemTypeCondition
                ],
                values: []
            }); 
            myLoadedDataset.condition = myCondition;
            // myLoadedDataset.condition = myCondition
            var result = myLoadedDataset.run();
            var results = result.results;
            var res = [];
            if(results.length > 0) {
                var itemArr = [];
                var itemArrSet = [];
                var customer = {};
                var orderInformation = {};
                for (let index = 0; index < results.length; index++) {
                    var itemName = results[index].values[16];
                    var itemDescription = results[index].values[17];
                    var think = results[index].values[18];
                    var length = results[index].values[19];
                    var width = results[index].values[20];
                    var quantity = results[index].values[21];
                    var addAmount = results[index].values[22];
                    var removeAmount = results[index].values[23];
                    var lineId = results[index].values[24];
                    var TransactionId = results[index].values[10];
                    var TransactionType = results[index].values[11];
                    if(!itemArrSet.includes(lineId)) {
                        itemArrSet.push(lineId)
                        itemArr.push({
                            TransactionId:TransactionId,
                            TransactionType:TransactionType,
                            itemName: itemName,
                            itemDescription: itemDescription,
                            think: think,
                            length: length,
                            width: width,
                            quantity: quantity,
                            addAmount: addAmount,
                            removeAmount: removeAmount,
                            lineId: lineId
                        });
                    }
                    if(index === (results.length - 1)) {
                        var customerId = results[index].values[0];
                        var status = results[index].values[1];
                        var documentCode = results[index].values[2];
                        var type = results[index].values[3];
                        var totalAmount = results[index].values[4];
                        var loyalty_remaining_point = results[index].values[5];
                        var orderId = results[index].values[6];
                        var deparmentId = results[index].values[7];
                        var deparmentName = results[index].values[8];
                        var createdDate = results[index].values[9];
                        var CustomerPhone = results[index].values[12];
                        var CustomerAddress = results[index].values[13];
                        var firstName = results[index].values[14];
                        var lastName = results[index].values[15];

                        var customer = {
                            customerId: customerId,
                            customerPhone: CustomerPhone,
                            customerAddress: CustomerAddress,
                            firstName: firstName,
                            lastName: lastName
                        }
                        
                        var orderInformation = {
                            status: status,
                            documentCode: documentCode,
                            type: type,
                            loyalty_remaining_point: loyalty_remaining_point,
                            totalAmount: totalAmount,
                            orderId: orderId,
                            deparmentId: deparmentId,
                            deparmentName: deparmentName,
                            createdDate: createdDate
                        }
                    }
                }
                res = {
                    customer: customer,
                    orderInformation: orderInformation,
                    items: itemArr
                };
            }
            return {
                status: 1,
                data: res,
                message: "Success test"
            } 
        }

        /**
         * Defines the function that is executed when a PUT request is sent to a RESTlet.
         * @param {string | Object} requestBody - The HTTP request body; request body are passed as a string when request
         *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
         *     the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const put = (requestBody) => {

        }

        /**
         * Defines the function that is executed when a POST request is sent to a RESTlet.
         * @param {string | Object} requestBody - The HTTP request body; request body is passed as a string when request
         *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
         *     the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const post = (requestBody) => {

        }

        /**
         * Defines the function that is executed when a DELETE request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters are passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const doDelete = (requestParams) => {

        }

        return {get, put, post, delete: doDelete}

    });
