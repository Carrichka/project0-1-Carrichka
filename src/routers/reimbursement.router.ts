import express from 'express';
import * as reimbursementDao from '../daos/sql-reimbursement.dao';
import { authMiddleware } from '../middleware/auth.middleware';

// the reimbursement router represents a subset of the application
// for all enpoints starting with /reimbursement
export const reimbursementRouter = express.Router();

/**
 * /reimbursements
 * find all reimbursements
 */
reimbursementRouter.get('', [
     authMiddleware('Admin', 'Manager'),
    async (req, res) => {
        const reimbursement = await reimbursementDao.findAll();
        res.json(reimbursement);
    }]);

/**
 * /reimbursements/status/:statusId
 * find reimbursements by status
 */
reimbursementRouter.get('/status/:statusId', async (req, res) => {
    if (authMiddleware('Manager')) {
        const reimbursement = await reimbursementDao.findByStatusId(+req.params.statusId);
        res.json(reimbursement);
    } else {
        res.sendStatus(403);
    }
});

/**
 * /reimbursements/author/userId/:userId
 * find reimbursements by author
 */
reimbursementRouter.get('/author/userId/:userId', async (req, res) => {
    if (authMiddleware('Manager')) {
        const reimbursement = await reimbursementDao.findByAuthorId(+req.params.userId);
        res.json(reimbursement);
    } else {
        res.sendStatus(403);
    }
});

/**
 * /reimbursements
 * submit reimbursement request
 */
reimbursementRouter.post('', async (req, res) => {
    const submittedReimbursement = req.body;
    if (!submittedReimbursement) {
        res.sendStatus(400);
    } else {
        const id = await reimbursementDao.saveReimbursement(submittedReimbursement);
        if (!id) {
            res.sendStatus(400);
        } else {
            submittedReimbursement.id = id;
            res.status(201); // created status code
            res.json(submittedReimbursement);
        }
    }
});

/**
 * /Reimbursements
 * partially update reimbursement resource
 */
reimbursementRouter.patch('', async (req, res) => {
        if (authMiddleware('Manager')) {
        const updatedUser = await reimbursementDao.updateReimbursement(req.body);
        res.json(updatedUser);
    } else {
        res.sendStatus(403);
    }
});