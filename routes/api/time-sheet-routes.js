const router = require('express').Router();
const TimeSheetController = require('../../rest-controllers/time-sheet-controller');

router.post('/getTimeSheetListIfDefinedAnyWithPagination', TimeSheetController.getTimeSheetListIfDefinedAnyWithPagination);

router.post('/', TimeSheetController.saveTimeSheets);

router.post('/getEmployeeTimeSheetForStatusChangeWithPagination', TimeSheetController.getEmployeeTimeSheetForStatusChange);

router.put('/bulkUpdateTimeSheetStatus', TimeSheetController.bulkUpdateTimeSheetStatus);

router.put('/changeStatusOfSingleTaskInTimeSheet', TimeSheetController.changeStatusOfSingleTaskInTimeSheet);

router.delete('/deleteTimeSheetFromDb', TimeSheetController.deleteTimeSheetFromDb);

module.exports = router;