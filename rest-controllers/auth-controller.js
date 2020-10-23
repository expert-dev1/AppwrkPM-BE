const AuthService = require("../services/auth-service");
const RestServiceTemplateUtils = require('../common-utils/RestServiceTemplateUtils');

class AuthController {

    static async login(req, res) {
        AuthService.login(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async getRefreshToken(req, res) {
        console.log('req for referesh token : ', req.body.refreshToken);
        AuthService.getRefreshToken(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async logout(req, res) {
        AuthService.logout(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }
}

module.exports = AuthController;