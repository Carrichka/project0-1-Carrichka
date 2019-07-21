import express from 'express';
import * as reimbursementDao from '../daos/sql-reimbursement.dao';

// the reimbursement router represents a subset of the application
// for all enpoints starting with /reimbursement
export const reimbursementRouter = express.Router();

/**
 * /reimbursement
 * find all reimbursements
 */
reimbursementRouter.get('', [
    // authMiddleware('admin', 'manager'),
    async (req, res) => {
        const reimbursement = await reimbursementDao.findAll();
        res.json(reimbursement);
    }]);