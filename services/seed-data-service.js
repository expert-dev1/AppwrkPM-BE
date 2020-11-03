// const { where } = require('sequelize/types');
const Country = require('../models/seed-data/Country');
const State = require('../models/seed-data/State');
const City = require('../models/seed-data/City');
const PlatformType = require('../models/seed-data/PlatformType');
const MoreInformation = require('../models/seed-data/MoreInformation');

// const sequelize = require('../config/sequelize-db');
class SeedDataService {

    static async getAllCountryList() {
        var countryList = await Country.findAndCountAll().then(data => countryList = data.rows).catch(err => { console.log('err : ', err) });
        return countryList;
    }

    static async getAllStateListByCountryId(req) {
        var stateList = await State.findAndCountAll({where : {country: req.query.countryId}}).then(data => stateList = data.rows).catch(err => { console.log('err : ', err) });
        return stateList;
    }

    static async getAllCityListByStateId(req) {
        var cityList = await City.findAndCountAll({where : {state: req.query.stateId}}).then(data => cityList = data.rows).catch(err => { console.log('err : ', err) });
        return cityList;
    }

    static async getPlatformTypeList() {
        var platformTypeList = await PlatformType.findAll().then(data => platformTypeList = data).catch(err => { console.log('err : ', err) });
        return platformTypeList;
    }
}

module.exports = SeedDataService;