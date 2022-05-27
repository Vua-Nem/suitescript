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
                id: 'custdataset33'    // Use a script ID from an existing script
            });
            // return {
            //     data: myLoadedDataset
            // }
            // Create a fieldId Column
            var myCustomerIdColumn = dataset.createColumn({
                fieldId: 'entity',
                id: 3
            });
            var myTypeColumn = dataset.createColumn({
                fieldId: 'type',
                id: 6
            });
            // Create a multi-level Join
            var transactionlinesJoin = dataset.createJoin({
                fieldId: 'transactionlines',
                join: null
            });
            var myTransactionColumn = dataset.createColumn({
                fieldId: 'itemtype',
                join: transactionlinesJoin,
                id: 29
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
            var myItemCondition = dataset.createCondition(
                {
                    column: myTransactionColumn,
                    operator: query.Operator.ANY_OF,
                    values: ["Discount", "InvtPart"]
                }
            );
            var myCondition = dataset.createCondition({
                column: null,
                operator: 'AND',
                children: [
                    myTypeCondition, 
                    myCustomerIdCondition,
                    myItemCondition
                ],
                values: []
            }); 
            myLoadedDataset.condition = myCondition;
            // myLoadedDataset.condition = myCondition
            var result = myLoadedDataset.run();
            return {
                status: 1,
                data: result,
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
