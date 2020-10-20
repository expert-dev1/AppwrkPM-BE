// const { where } = require('sequelize/types');
var RoleMaster = require('../models/role-master/RoleMaster');
// const sequelize = require('../config/sequelize-db');
class RoleMasterService {

    static async getRoleMasterListByOrgIdWithPage(req, res) {
        var limit = req.body.limit;
        var offset = req.body.offset;
        var orgId = req.body.orgId;
        var sortField = req.body.sortField;
        var sortDirection = req.body.sortDirection;
        var roleMasterList = {};
        await RoleMaster.findAndCountAll({
            limit: limit,
            offset: offset,
            where: { organizationId: orgId },
            order: [
                [sortField, sortDirection],
            ], // conditions
        }).then(data => {
            console.log('data inside pagination function : ', data);
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

    static async saveRoleMaster(req, res) {
        var newRoleMaster = null;
        var roleMaster = {
            name: req.body.name,
            description: req.body.description,
            organizationId: req.body.organizationId
        };
        return RoleMaster.create(roleMaster).then(newRoleMaster).catch(err => { console.log('err : ', err) });
    }

    static async updateRoleMaster(req, res) {
        var roleMasterId = req.query.roleMasterId;
        var updatedRoleMaster = await RoleMaster.update({ name: req.body.name, description: req.body.description, updatedAt: new Date() }, { where: { id: roleMasterId } })
            .then(numberOfRowsAffected => updatedRoleMaster = numberOfRowsAffected).catch(err => { console.log('err : ', err) });
        return updatedRoleMaster;
    }

    static async getRoleMasterDeatilsById(req, res) {
        return RoleMaster.findByPk(req.query.roleMasterId).then(roleMaster => res.send(roleMaster));
    }

    static async deleteRoleMasterById(req, res) {
        return RoleMaster.destroy({
            where: {
                id: req.query.roleMasterId
            }
        }).then(data => res.status(200).send((data).toString())).catch(err => { throw new Error(err) });
    }

    static async getRoleMasterListByOrgId(req, res) {
        return RoleMaster.findAndCountAll({
            where: { organizationId: req.query.orgId },
        }).then(data => {
            const response = {
                content: {
                    "roles": data.rows
                }
            }
            res.status(200).send(response);
        });
    }
}

module.exports = RoleMasterService;