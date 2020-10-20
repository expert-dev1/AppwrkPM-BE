// const { where } = require('sequelize/types');
var Country = require('../models/seed-data/Country');
var State = require('../models/seed-data/State');
var City = require('../models/seed-data/City');

// const sequelize = require('../config/sequelize-db');
class SeedDataService {

    static async getAllCountryList(req, res) {
        var countryList = await Country.findAndCountAll().then(data => countryList = data.rows).catch(err => { console.log('err : ', err) });
        return countryList;
    }

    static async getAllStateListByCountryId(req, res) {
        var stateList = await State.findAndCountAll({where : {country: req.query.countryId}}).then(data => stateList = data.rows).catch(err => { console.log('err : ', err) });
        return stateList;
    }

    static async getAllCityListByStateId(req, res) {
        var cityList = await City.findAndCountAll({where : {state: req.query.stateId}}).then(data => cityList = data.rows).catch(err => { console.log('err : ', err) });
        return cityList;
    }

}

module.exports = SeedDataService;