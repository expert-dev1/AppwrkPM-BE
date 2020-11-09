var HttpStatus = require('http-status-codes');
class RestServiceTemplateUtils {

    static async createdSuccessResponse(data, res) {
        if (data && data != undefined && data != null && data) {
            if (data.error) {
                console.log('Error in saving record : ', data.error);
                this.response(HttpStatus.INTERNAL_SERVER_ERROR, false, data.error.message, data, res);
            } else {
                this.response(HttpStatus.CREATED, true, "Record successfully saved.", data, res);
            }            
        } else {
            this.response(HttpStatus.INTERNAL_SERVER_ERROR, false, "Data Not Found", data, res);
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
        if (data && data != undefined && data != null && data) {
            if (data.error) {
                console.log('Error in fetching record : ', data.error);
                this.response(HttpStatus.INTERNAL_SERVER_ERROR, false, data.error.message, data, res);
            } else {
                this.response(HttpStatus.OK, true, "Data Successfullt fetched.", data, res);
            }            
        } else {
            this.response(HttpStatus.INTERNAL_SERVER_ERROR, false, "Data Not Found", data, res);
        }
    }
}

module.exports = RestServiceTemplateUtils;