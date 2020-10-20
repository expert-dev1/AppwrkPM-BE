// const { where } = require('sequelize/types');
var Country = require('../models/seed-data/Country');
var State = require('../models/seed-data/State');
var City = require('../models/seed-data/City');

// const sequelize = require('../config/sequelize-db');
class SeedDataService {

    static async getAllCountryList(req, res) {
        return Country.findAndCountAll().then(data => {            
            res.status(200).send(data.rows);
        }).catch(err => { console.log('err : ', err) });
    }

    static async getAllStateListByCountryId(req, res) {
        return State.findAndCountAll({where : {country: req.query.countryId}}).then(data => {            
            res.status(200).send(data.rows);
        }).catch(err => { console.log('err : ', err) });
    }

    static async getAllCityListByStateId(req, res) {
        return City.findAndCountAll({where : {state: req.query.stateId}}).then(data => {            
            res.status(200).send(data.rows);
        }).catch(err => { console.log('err : ', err) });
    }

}

module.exports = SeedDataService;