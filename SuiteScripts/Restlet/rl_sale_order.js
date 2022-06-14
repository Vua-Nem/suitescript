/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/dataset', 'N/query', 'N/record', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (dataset, query, record, search) => {
        /**
         * Defines the function that is executed when a GET request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const get = (requestParams) => {
            if (typeof requestParams.customerId === 'undefined') {
                return {
                    status: 0,
                    message: "CustomerId is required"
                }
              }
            var customerId = requestParams.customerId;
            var myLoadedDataset = dataset.load({
                id: 'custdataset48'    // Use a script ID from an existing script
            });
            // Create a fieldId Column
            var myCustomerIdColumn = dataset.createColumn({
                fieldId: 'entity',
                id: 3
            });
            var myTypeColumn = dataset.createColumn({
                fieldId: 'type',
                id: 6
            });

            var statusColumn = dataset.createColumn({
                fieldId: 'status'
            });

            // // Create a Condition with values
            var myTypeCondition = dataset.createCondition(
                {
                    column: myTypeColumn,
                    operator: query.Operator.ANY_OF,
                    values: ["SalesOrd"]
                }
            );
            var myCustomerIdCondition = dataset.createCondition(
                {
                    column: myCustomerIdColumn,
                    operator: query.Operator.ANY_OF,
                    values: [customerId]
                }
            );
            var statusCondition = dataset.createCondition(
                {
                    column: statusColumn,
                    operator: query.Operator.ANY_OF,
                    values: ["SalesOrd:G"]
                }
            );
            var myCondition = dataset.createCondition({
                column: null,
                operator: 'AND',
                children: [
                    myTypeCondition, 
                    myCustomerIdCondition,
                    statusCondition
                ],
                values: []
            }); 
            myLoadedDataset.condition = myCondition;
            // myLoadedDataset.condition = myCondition
            var result = myLoadedDataset.run();
            var results = result.results;
            var res = [];
            if(results.length > 0) {
                var orderArr = [];
                for (let index = 0; index < results.length; index++) {
                    // const element = array[index];
                    var orderId = results[index].values[6];
                    if(orderArr.includes(orderId)) {
                        continue
                    };
                    orderArr.push(orderId);
                    res.push({ 
                        customerId : results[index].values[0],
                        status: results[index].values[1],
                        documentCode: results[index].values[2],
                        type: results[index].values[3],
                        totalAmount: results[index].values[4],
                        loyalty_remaining_point: results[index].values[5],
                        orderId: orderId,
                        deparmentId: results[index].values[7],
                        deparmentName: results[index].values[8]
                    });
                }
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
