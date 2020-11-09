// const { where } = require('sequelize/types');
var RoleMaster = require('../models/role-master/RoleMaster');
// const sequelize = require('../config/sequelize-db');
const ConstantUtils = require("../common-utils/ConstantUtils");
const { Op } = require("sequelize");

class RoleMasterService {

    static async getRoleMasterListByOrgIdWithPage(req) {
        var limit = req.body.limit;
        var offset = req.body.offset;
        var orgId = req.employee.organizationId;
        var sortField = req.body.sortField;
        var sortDirection = req.body.sortDirection;
        var searchString = req.body.searchString && req.body.searchString != undefined && req.body.searchString != null ? req.body.searchString : null;
        var roleMasterList = {};
        if (searchString && searchString != null) {
            await RoleMaster.findAndCountAll({
                limit: limit,
                offset: offset,
                where: {
                    organizationId: orgId,
                    [Op.or]: [{
                        name: {
                            [Op.like]: '%' + searchString + '%'
                        }
                    }, {
                        description: {
                            [Op.like]: '%' + searchString + '%'
                        }
                    }]
                },
                order: [
                    [sortField, sortDirection],
                ],
            }).then(data => {
                const totalPages = Math.ceil(data.count / limit);
                roleMasterList = {
                    "content": data.rows,
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "currentPageNumber": offset,
                    "currentPageSize": data.length,
                }
            });
            return roleMasterList;
        } else {
            await RoleMaster.findAndCountAll({
                limit: limit,
                offset: offset,
                where: { organizationId: orgId },
                order: [
                    [sortField, sortDirection],
                ],
            }).then(data => {
                const totalPages = Math.ceil(data.count / limit);
                roleMasterList = {
                    "content": data.rows,
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "currentPageNumber": offset,
                    "currentPageSize": data.length,
                }
            });
            return roleMasterList;
        }        
    }

    static async saveRoleMaster(req) {
        var newRoleMaster = null;
        var roleMaster = {
            name: req.body.name,
            description: req.body.description,
            organizationId: req.employee.organizationId
        };
        var duplicateRowsCount = await RoleMaster.findAndCountAll({ where: { name: roleMaster.name, organizationId: roleMaster.organizationId } }).then(data => duplicateRowsCount = data.count).catch(error => console.log('error in checking duplicate records : ', error));
        if (duplicateRowsCount != null && duplicateRowsCount == 0) {
            return RoleMaster.create(roleMaster).then(newRoleMaster).catch(err => { console.log('err : ', err) });
        } else {
            throw new Error(ConstantUtils.RECORD_ALREADY_EXISTS);
        }
    }

    static async updateRoleMaster(req) {
        var roleMasterId = req.query.roleMasterId;
        var duplicateRowsCount = await RoleMaster.findAndCountAll({ where: { name: req.body.name, organizationId: req.body.organizationId, id: {[Op.ne]: roleMasterId} } }).then(data => duplicateRowsCount = data.count).catch(error => console.log('error in checking duplicate records : ', error));
        if (duplicateRowsCount != null && duplicateRowsCount == 0) {
            var updatedRoleMaster = await RoleMaster.update({ name: req.body.name, description: req.body.description, updatedAt: new Date() }, { where: { id: roleMasterId } })
            .then(numberOfRowsAffected => updatedRoleMaster = numberOfRowsAffected).catch(err => { console.log('err : ', err) });
        return updatedRoleMaster;
        } else {
            throw new Error(ConstantUtils.RECORD_ALREADY_EXISTS);
        }
        
    }

    static async getRoleMasterDeatilsById(req) {
        var roleMaster = await RoleMaster.findByPk(req.query.roleMasterId).then(data => roleMaster = data);
        return roleMaster;
    }

    static async deleteRoleMasterById(req) {
        var roleMaster = await RoleMaster.destroy({
            where: {
                id: req.query.roleMasterId
            }
        }).then(data => roleMaster = data).catch(err => { throw new Error(err) });
        return roleMaster;
    }

    static async getRoleMasterListByOrgId(req) {
        var roleMasterList = await RoleMaster.findAndCountAll({
            where: { organizationId: req.employee.organizationId },
        }).then(data => roleMasterList = data.rows);
        return roleMasterList;
    }
}

module.exports = RoleMasterService;