/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/dataset', 'N/record', 'N/query'],
    /**
 * @param{dataset} dataset
 * @param{record} record
 */
    (dataset, record, query) => {
        /**
         * Defines the function that is executed when a GET request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const get = (requestParams) => {
            if (typeof requestParams.startDate === 'undefined') {
                return {
                    status: 0,
                    message: "startDate is required"
                }
              }
            
            var startDate = requestParams.startDate;
            var myLoadedDataset = dataset.load({
                id: 'custdataset41'    // Use a script ID from an existing script
            });
            var startDateColumn = dataset.createColumn({
                fieldId: 'custitem_promotion_start_date'
            });
            var startDateCondition = dataset.createCondition(
                {
                    column: startDateColumn,
                    operator: query.Operator.ON_OR_AFTER,
                    values: [startDate]
                }
            );

            var applyToColumn = dataset.createColumn({
                fieldId: 'custitem_promo_appliedto_'
            });
            var applyToCondition = dataset.createCondition(
                {
                    column: applyToColumn,
                    operator: query.Operator.ANY_OF,
                    values: ["1", "3"]
                }
            );

            var itemTypeColumn = dataset.createColumn({
                fieldId: 'itemtype'
            });
            var itemTypeCondition = dataset.createCondition(
                {
                    column: itemTypeColumn,
                    operator: query.Operator.ANY_OF,
                    values: ["Group"]
                }
            );
    
            var typeByColumn = dataset.createColumn({
                fieldId: 'custitem13'
            });
            var typeByCondition = dataset.createCondition(
                {
                    column: typeByColumn,
                    operator: query.Operator.ANY_OF,
                    values: ["1", "2"]
                }
            );

            var myCondition = dataset.createCondition({
                column: null,
                operator: 'AND',
                children: [
                    startDateCondition, 
                    applyToCondition,
                    itemTypeCondition,
                    typeByCondition
                ],
                values: []
            }); 
            myLoadedDataset.condition = myCondition;
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
