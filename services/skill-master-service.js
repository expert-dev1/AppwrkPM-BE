// const { where } = require('sequelize/types');
const SkillMaster = require('../models/skill-master/SkillMaster');
// const sequelize = require('../config/sequelize-db');
const ConstantUtils = require("../common-utils/ConstantUtils");
const { Op } = require("sequelize");

class SkillMasterService {

    static async getSkillMasterListByOrgIdWithPage(req) {
        var limit = req.body.limit;
        var offset = req.body.offset;
        var orgId = req.employee.organizationId;
        var sortField = req.body.sortField;
        var sortDirection = req.body.sortDirection;
        var searchString = req.body.searchString && req.body.searchString != undefined && req.body.searchString != null ? req.body.searchString : null;
        var skillMasterList = {};
        if (searchString && searchString != null) {
            await SkillMaster.findAndCountAll({
                limit: limit,
                offset: offset,
                where: {
                    organizationId: orgId,
                    [Op.or]: [{
                        name: {
                            [Op.like]: '%' + searchString + '%'
                        }
                    }]
                },
                order: [
                    [sortField, sortDirection],
                ],
            }).then(data => {
                const totalPages = Math.ceil(data.count / limit);
                skillMasterList = {
                    "content": data.rows,
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "currentPageNumber": offset,
                    "currentPageSize": data.length,
                }
            });
            return skillMasterList;
        } else {
            await SkillMaster.findAndCountAll({
                limit: limit,
                offset: offset,
                where: { organizationId: orgId },
                order: [
                    [sortField, sortDirection],
                ],
            }).then(data => {
                const totalPages = Math.ceil(data.count / limit);
                skillMasterList = {
                    "content": data.rows,
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "currentPageNumber": offset,
                    "currentPageSize": data.length,
                }
            });
            return skillMasterList;
        }        
    }

    static async saveSkillMaster(req) {
        var newSkillMaster = null;
        var skillMaster = {
            name: req.body.name,
            organizationId: req.employee.organizationId
        };
        var duplicateRowsCount = await SkillMaster.findAndCountAll({ where: { name: skillMaster.name, organizationId: skillMaster.organizationId } }).then(data => duplicateRowsCount = data.count).catch(error => console.log('error in checking duplicate records : ', error));
        if (duplicateRowsCount != null && duplicateRowsCount == 0) {
            return SkillMaster.create(skillMaster).then(newSkillMaster).catch(err => { console.log('err : ', err) });
        } else {
            throw new Error(ConstantUtils.RECORD_ALREADY_EXISTS);
        }
    }

    static async updateSkillMaster(req) {
        var skillMasterId = req.body.id;
        var duplicateRowsCount = await SkillMaster.findAndCountAll({ where: { name: req.body.name, organizationId: req.body.organizationId, id: {[Op.ne]: skillMasterId} } }).then(data => duplicateRowsCount = data.count).catch(error => console.log('error in checking duplicate records : ', error));
        if (duplicateRowsCount != null && duplicateRowsCount == 0) {
            var updateSkillMaster = await SkillMaster.update({ name: req.body.name, updatedAt: new Date() }, { where: { id: skillMasterId } })
            .then(numberOfRowsAffected => updateSkillMaster = numberOfRowsAffected).catch(err => { console.log('err : ', err) });
        return updateSkillMaster;
        } else {
            throw new Error(ConstantUtils.RECORD_ALREADY_EXISTS);
        }
        
    }

    static async getSkillMasterDeatilsById(req) {
        var skillMaster = await SkillMaster.findByPk(req.query.skillMasterId).then(data => skillMaster = data);
        return skillMaster;
    }

    static async deleteSkillMasterById(req) {
        var skillMaster = await SkillMaster.destroy({
            where: {
                id: req.query.skillMasterId
            }
        }).then(data => skillMaster = data).catch(err => { throw new Error(err) });
        return skillMaster;
    }

    static async getSkillMasterListByOrgId(req) {
        var skillMasterList = await SkillMaster.findAndCountAll({
            where: { organizationId: req.employee.organizationId },
        }).then(data => skillMasterList = data.rows);
        return skillMasterList;
    }
}

module.exports = SkillMasterService;