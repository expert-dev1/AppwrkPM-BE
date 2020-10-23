// const { where } = require('sequelize/types');
var Designation = require('../models/designation/Designation');
const Organization = require('../models/organization/Organization');
// const Sequelize = require('../config/sequelize-db');
// const { Op } = require("sequelize");
class DesignationService {

    static async getDesignationListByOrgIdWithPage(req, res) {
        var limit = req.body.limit;
        var offset = req.body.offset;
        var orgId = req.body.orgId;
        var sortField = req.body.sortField;
        var sortDirection = req.body.sortDirection;
        var desinationList = {};
        await Designation.findAndCountAll({
            limit: limit,
            offset: offset,
            where: { organizationId: orgId },
            order: [
                [sortField, sortDirection],
            ], // conditions
            include: [{
                model: Organization,
            }]
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

    static async saveDesignation(req) {
        var newDesignation = null;
        var designation = {
            name: req.body.name,
            description: req.body.description,
            organizationId: req.body.organizationId,
        };
        var duplicateRowsCount = await Designation.findAndCountAll({ where: { name: designation.name, organizationId: designation.organizationId } }).then(data => duplicateRowsCount = data.count);
        // var duplicateRowsCount = await Designation.findAndCountAll({where: { name : Sequelize.fn('lower', Sequelize.col('name'), Sequelize.fn('lower', designation.name)), organizationId: req.body.organizationId}}).then(data => console.log('data : ', data.count));
        if (duplicateRowsCount != null && duplicateRowsCount == 0) {
            return Designation.create(designation).then(newDesignation);
        } else {
            throw new Error("RECORD_ALREADY_EXISTS");
        }
    }

    static async updateDesignation(req) {
        console.log('Inside update');
        var designationId = req.body.id;
        var designation = {
            name: req.body.name,
            description: req.body.description,
            organizationId: req.body.organizationId,
            updatedAt: new Date()
        };
        console.log('designation : ', designation);
        // var duplicateRowsCount = await Designation.findAndCountAll({ where: { name: Sequelize.fn('lower', Sequelize.col(designation.name)), organizationId: req.body.organizationId } }).then(data => duplicateRowsCount = data.count);
        var duplicateRowsCount = await Designation.findAndCountAll({ where: { name: designation.name, organizationId: designation.organizationId } }).then(data => duplicateRowsCount = data.count);
        if (duplicateRowsCount != null && duplicateRowsCount == 0) {
            var updatedDesignation = await Designation.update(designation, { where: { id: designationId } }).then(numberOfRowsAffected => updatedDesignation = numberOfRowsAffected).catch(err => { console.log('err : ', err) });
            return updatedDesignation;
        } else {
            throw new Error("RECORD_ALREADY_EXISTS");
        }

    }

    static async getDesignationDetailsById(req, res) {
        var designation = await Designation.findByPk(req.query.designationId).then(data => designation = data);
        return designation;
    }

    static async deleteDesignationById(req, res) {
        var deletedDesignation = await Designation.destroy({
            where: {
                id: req.query.designationId
            }
        }).then(data => deletedDesignation = data).catch(err => { throw new Error(err) });
        return deletedDesignation;
    }

    static async getDesignationListByOrgId(req, res) {
        var desinationList = {};
        await Designation.findAndCountAll({where: { organizationId: req.query.orgId },
        }).then(data => {
            desinationList =  data.rows
        });
        return desinationList;
    }
}

module.exports = DesignationService;