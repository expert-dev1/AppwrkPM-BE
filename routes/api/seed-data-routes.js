const router = require('express').Router();
const SeedDataController = require('../../rest-controllers/seed-data-controller');

router.get('/getAllCountryList', SeedDataController.getAllCountryList);

router.get('/getAllStateListByCountryId', SeedDataController.getAllStateListByCountryId);

router.get('/getAllCityListByStateId', SeedDataController.getAllCityListByStateId);

module.exports = router;