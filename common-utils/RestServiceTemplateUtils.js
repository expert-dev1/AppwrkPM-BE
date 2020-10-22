var HttpStatus = require('http-status-codes');

class RestServiceTemplateUtils {

    static async createdSuccessResponse(data, res) {
        if (data.error) {
            this.response(HttpStatus.INTERNAL_SERVER_ERROR, false, "Error in saving record", data, res);
        } else {
            this.response(HttpStatus.CREATED, true, "Record successfully saved", data, res);
        }

    }

    static async response(httpStatusCode, isSuccess, message, data, res) {
        var responseMap = {
            statusCode: httpStatusCode,
            isSuccess: isSuccess,
            message: message,
        }
        if (isSuccess) {
            responseMap.data = {
                data : data
            }
        } else {
            responseMap.error = {
                "error": data
            }
        }
        res.status(httpStatusCode);
        res.send(JSON.stringify(responseMap));
    }

    static async getRecordSuccessResponse(data, res) {
        if (data && data.error) {
            this.response(HttpStatus.INTERNAL_SERVER_ERROR, false, data.error.message, data, res);
        } else {
            this.response(HttpStatus.OK, true, "Record successfully fetched", data, res);
        }

    }
}

module.exports = RestServiceTemplateUtils;