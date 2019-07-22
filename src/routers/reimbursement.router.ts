import express from 'express';
import * as reimbursementDao from '../daos/sql-reimbursement.dao';

// the reimbursement router represents a subset of the application
// for all enpoints starting with /reimbursement
export const reimbursementRouter = express.Router();

/**
 * /reimbursements
 * find all reimbursements
 */
reimbursementRouter.get('', [
    // authMiddleware('admin', 'manager'),
    async (req, res) => {
        const reimbursement = await reimbursementDao.findAll();
        res.json(reimbursement);
    }]);

/**
 * /reimbursements/status/:statusId
 * find reimbursements by status
 */
reimbursementRouter.get('/status/:statusId', async (req, res) => {
    const reimbursement = await reimbursementDao.findByStatusId(+req.params.statusId);
    res.json(reimbursement);
});

/**
 * /reimbursements/author/userId/:userId
 * find reimbursements by status
 */
reimbursementRouter.get('/author/userId/:userId', async (req, res) => {
    const reimbursement = await reimbursementDao.findByUserId(+req.params.userId);
    res.json(reimbursement);
});