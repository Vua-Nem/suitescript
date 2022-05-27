/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/search', 'N/record'],
    
    (search, record) => {
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
                    message: "Phone param is required"
                }
              }
            var phone = requestParams.phone;
            var mySearch = search.create({
                type: search.Type.CUSTOMER,
                filters: [{
                    name: 'phone', operator: search.Operator.IS, values: phone
                }],
                // columns: ['entityid', 'phone', 'custentity_tbt_loyalty_grp_lvl', 'custentity_tei_loyaltyremainingpointval', 'custentity_tvn_expirationdateforloyalsms'],
            });
            var results = mySearch.run().getRange({
                start: 0,
                end: 1
            });
            var results_length = results.length;
            if(!results_length) {
                return {
                    status: 0,
                    message: "Data not found"
                } 
            }

            var objRecord = record.load({
                type: record.Type.CUSTOMER,
                id: results[0].id });
            objRecord["test"] = 123456;
            // var amount = { order_amounts : 1200000 };
            // data = {order_amounts : 1200000, ...objRecord }
            return {
                status: 1,
                data: objRecord,
                message: "Success test"
            } 
            // return {
            //     status: 1,
            //     data: {
            //         id: objRecord.id,
            //         type: objRecord.type,
            //         order_amounts: 1200000,
            //         fields: objRecord.fields
            //     },
            //     message: "Success test"
            // } 
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
