// const { where } = require('sequelize/types');
const Organization = require('../models/organization/Organization');


class OrganizationService {

    static async getOrganizationListByOrgIdWithPage(req, res) {
        var limit = req.body.limit;
        var offset = req.body.offset;
        var sortField = req.body.sortField;
        var sortDirection = req.body.sortDirection;
        var organizationList = {};
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

module.exports = OrganizationService;