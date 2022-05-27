/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/dataset','N/query', 'N/record', 'N/search'],
    /**
 * @param{query} query
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
            if (typeof requestParams.phone === 'undefined') {
                return {
                    status: 0,
                    message: "Phone is required"
                }
              }
            var phone = requestParams.phone;
            var myLoadedDataset = dataset.load({
                id: 'custdataset39'    // Use a script ID from an existing script
            });
            // couponCode condition
            var promotionsJoin = dataset.createJoin({
                fieldId: 'promotions'
            });
            var couponcodeColumn = dataset.createColumn({
                fieldId: 'applicabilitystatus',
                join: promotionsJoin,
                id: 10
            });
            var couponCodeCondition = dataset.createCondition(
                {
                    column: couponcodeColumn,
                    operator: query.Operator.ANY_OF,
                    values: ["APPLIED"]
                }
            );

            // Sale order Condition
            var typeColumn = dataset.createColumn({
                fieldId: 'type'
            });
            var typeCondition = dataset.createCondition(
                {
                    column: typeColumn,
                    operator: query.Operator.ANY_OF,
                    values: ["SalesOrd"]
                }
            );

            // Customer phone condition
            var customerJoin = dataset.createJoin({
                fieldId: 'entity',
                target: "customer"
            });
            var phoneColumn = dataset.createColumn({
                fieldId: 'phone',
                join: customerJoin
            });
            var phoneCondition = dataset.createCondition(
                {
                    column: phoneColumn,
                    operator: query.Operator.IS,
                    values: [phone]
                }
            );

            var myCondition = dataset.createCondition({
                column: null,
                operator: 'AND',
                children: [
                    couponCodeCondition, 
                    typeCondition,
                    phoneCondition
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
