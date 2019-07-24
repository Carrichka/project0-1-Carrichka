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
    const reimbursement = await reimbursementDao.findByStatusId(+req.params.statusId);
    res.json(reimbursement);
});

/**
 * /reimbursements/author/userId/:userId
 * find reimbursements by author
 */
reimbursementRouter.get('/author/userId/:userId', async (req, res) => {
    const reimbursement = await reimbursementDao.findByAuthorId(+req.params.userId);
    console.log('find reimbursements by author req.params.userId = ', req.params.userId);
    res.json(reimbursement);
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
 * partially update user resource
 */
reimbursementRouter.patch('', async (req, res) => {
    // const userId = req.body.id;
    // console.log( 'usersRouter body id = ', req.body.id);
    // const currentLoggedInUser = req.session.user;
    // console.log( 'usersRouter session.user = ', req.session.user);
    // console.log( 'usersRouter currentLoggedInUser = ', currentLoggedInUser);
    // console.log( 'usersRouter currentLoggedInUser id = ', currentLoggedInUser.id);
    // if (currentLoggedInUser && currentLoggedInUser.id === userId) {
        if (authMiddleware('admin')) {
        const updatedUser = await reimbursementDao.updateReimbursement(req.body);
        res.json(updatedUser);
    } else {
        res.sendStatus(403);
    }
});