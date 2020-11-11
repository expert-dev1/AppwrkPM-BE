// const { where } = require('sequelize/types');
var Designation = require('../models/designation/Designation');
const Organization = require('../models/organization/Organization');
// const Sequelize = require('../config/sequelize-db');
const ConstantUtils = require("../common-utils/ConstantUtils");
const { Op } = require("sequelize");

class DesignationService {

    static async getDesignationListByOrgIdWithPage(req) {
        var limit = req.body.limit;
        var offset = req.body.offset;
        var orgId = req.employee.organizationId;
        var sortField = req.body.sortField;
        var sortDirection = req.body.sortDirection;
        var searchString = req.body.searchString && req.body.searchString != undefined && req.body.searchString != null ? req.body.searchString : null;
        var desinationList = {};
        if (searchString && searchString != null) {
            await Designation.findAndCountAll({
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
                desinationList = {
                    "content": data.rows,
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "currentPageNumber": offset,
                    "currentPageSize": data.length,
                }
            });
            return desinationList;
        } else {
            await Designation.findAndCountAll({
                limit: limit,
                offset: offset,
                where: { organizationId: orgId },
                order: [
                    [sortField, sortDirection],
                ],
            }).then(data => {
                const totalPages = Math.ceil(data.count / limit);
                desinationList = {
                    "content": data.rows,
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "currentPageNumber": offset,
                    "currentPageSize": data.length,
                }
            });
            return desinationList;
        }

    }

    static async saveDesignation(req) {
        var newDesignation = null;
        var designation = {
            name: req.body.name,
            description: req.body.description,
            organizationId: req.employee.organizationId,
        };
        var duplicateRowsCount = await Designation.findAndCountAll({ where: { name: designation.name, organizationId: designation.organizationId } }).then(data => duplicateRowsCount = data.count).catch(error => console.log('error in checking duplicate records : ', error));
        // var duplicateRowsCount = await Designation.findAndCountAll({where: { name : Sequelize.fn('lower', Sequelize.col('name'), Sequelize.fn('lower', designation.name)), organizationId: req.body.organizationId}}).then(data => console.log('data : ', data.count));
        if (duplicateRowsCount != null && duplicateRowsCount == 0) {
            return Designation.create(designation).then(newDesignation);
        } else {
            throw new Error(ConstantUtils.RECORD_ALREADY_EXISTS);
        }
    }

    static async updateDesignation(req) {
        var designationId = req.body.id;
        var designation = {
            name: req.body.name,
            description: req.body.description,
            updatedAt: new Date()
        };
        // var duplicateRowsCount = await Designation.findAndCountAll({ where: { name: Sequelize.fn('lower', Sequelize.col(designation.name)), organizationId: req.body.organizationId } }).then(data => duplicateRowsCount = data.count);
        var duplicateRowsCount = await Designation.findAndCountAll({ where: { name: designation.name, organizationId: designation.organizationId, id: {[Op.ne]: designationId} } }).then(data => duplicateRowsCount = data.count).catch(error => console.log('error in checking duplicate records : ', error));
        if (duplicateRowsCount != null && duplicateRowsCount == 0) {
            var updatedDesignation = await Designation.update(designation, { where: { id: designationId } }).then(numberOfRowsAffected => updatedDesignation = numberOfRowsAffected).catch(err => { console.log('err : ', err) });
            return updatedDesignation;
        } else {
            throw new Error(ConstantUtils.RECORD_ALREADY_EXISTS);
        }

    }

    static async getDesignationDetailsById(req) {
        var designation = await Designation.findByPk(req.query.designationId).then(data => designation = data);
        return designation;
    }

    static async deleteDesignationById(req) {
        var deletedDesignation = await Designation.destroy({
            where: {
                id: req.query.designationId
            }
        }).then(data => deletedDesignation = data).catch(err => { throw new Error(err) });
        return deletedDesignation;
    }

    static async getDesignationListByOrgId(req) {
        var desinationList = {};
        await Designation.findAndCountAll({
            where: { organizationId: req.employee.organizationId },
        }).then(data => {
            desinationList = data.rows
        });
        return desinationList;
    }
}

module.exports = DesignationService;