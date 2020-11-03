// const { where } = require('sequelize/types');
const Organization = require('../models/organization/Organization');
const ConstantUtils = require("../common-utils/ConstantUtils");
const { Op } = require("sequelize");

class OrganizationService {

    static async getOrganizationListByOrgIdWithPage(req) {
        var limit = req.body.limit;
        var offset = req.body.offset;
        var sortField = req.body.sortField;
        var sortDirection = req.body.sortDirection;
        var searchString = req.body.searchString && req.body.searchString != undefined && req.body.searchString != null ? req.body.searchString : null;
        var organizationList = {};
        if (searchString && searchString != null) {
            await Organization.findAndCountAll({
                limit: limit,
                offset: offset,
                where: {
                    [Op.or]: [{
                        orgName: {
                            [Op.like]: '%' + searchString + '%'
                        }
                    }, {
                        orgCode: {
                            [Op.like]: '%' + searchString + '%'
                        }
                    }, {
                        status: {
                            [Op.like]: '%' + searchString + '%'
                        }
                    }]
                },
                order: [
                    [sortField, sortDirection],
                ], // conditions
            }).then(data => {
                const totalPages = Math.ceil(data.count / limit);
                organizationList = {
                    "content": data.rows,
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "currentPageNumber": offset,
                    "currentPageSize": data.length,
                }
            });
            return organizationList;
        } else {
            await Organization.findAndCountAll({
                limit: limit,
                offset: offset,
                order: [
                    [sortField, sortDirection],
                ], // conditions
            }).then(data => {
                const totalPages = Math.ceil(data.count / limit);
                organizationList = {
                    "content": data.rows,
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "currentPageNumber": offset,
                    "currentPageSize": data.length,
                }
            });
            return organizationList;
        }        
    }

    static async saveOrganization(req) {
        var organization = req.body;
        var duplicateRowsCount = await Organization.findAndCountAll({ where: { orgCode: organization.orgCode } }).then(data => duplicateRowsCount = data.count).catch(error => console.log('error in checking duplicate records : ', error));
        if (duplicateRowsCount != null && duplicateRowsCount == 0) {
            var newOrganization = await Organization.create(organization).then(data => newOrganization = data).catch(error => console.log('Error in saving Organization Data : ', error));
            return newOrganization;
        } else {
            throw new Error(ConstantUtils.RECORD_ALREADY_EXISTS);
        }        
    }

    static async updateOrganization(req) {
        var organizationFromUI = req.body;
        var duplicateRowsCount = await Organization.findAndCountAll({ where: { orgCode: organizationFromUI.orgCode, id: {[Op.ne]: organizationFromUI.id} } }).then(data => duplicateRowsCount = data.count).catch(error => console.log('error in checking duplicate records : ', error));
        if (duplicateRowsCount != null && duplicateRowsCount == 0) {
            var updatedOrganization = await Organization.update(organizationFromUI, { where: { id: organizationFromUI.id } }).then(numberOfRowsAffected => updatedOrganization = numberOfRowsAffected).catch(err => { console.log('err : ', err) });
            return updatedOrganization;
        } else {
            throw new Error(ConstantUtils.RECORD_ALREADY_EXISTS);
        }
    }

    static async getOrganizationDetailsById(req) {
        var organization = await Organization.findByPk(req.query.orgId).then(data => organization = data);
        return organization;
    }

    static async checkOrganizationCode(req) {
        var duplicateRowsCount = await Organization.findAndCountAll({ where: { orgCode: req.query.orgCode, id: {[Op.ne]: req.query.orgId} } }).then(data => duplicateRowsCount = data.count);
        if (duplicateRowsCount != null && duplicateRowsCount > 0) {
            return false;
        } else {
            return true; 
        }
    }
}

module.exports = OrganizationService;