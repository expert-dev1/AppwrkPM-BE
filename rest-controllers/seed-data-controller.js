const SeedDataService = require('../services/seed-data-service');

class SeedDataController {

    static async getAllCountryList(req, res) {
        var data = await SeedDataService.getAllCountryList(req, res);
        res.send(data);
    }

    static async getAllStateListByCountryId(req, res) {
        var data = await SeedDataService.getAllStateListByCountryId(req, res);
        res.send(data);
    }

    static async getAllCityListByStateId(req, res) {
        var data = await SeedDataService.getAllCityListByStateId(req, res);
        res.send(data);
    }
}

module.exports = SeedDataController;