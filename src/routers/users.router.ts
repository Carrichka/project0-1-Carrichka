import express from 'express';
import * as userDao from '../daos/sql-user.dao';
import { authMiddleware } from '../middleware/auth.middleware';

// the user router represents a subset of the application
// for all enpoints starting with /users
export const usersRouter = express.Router();

/**
 * /users
 * find all users
 */
usersRouter.get('', [
    // authMiddleware('manager'),
    async (req, res) => {
        const users = await userDao.findAll();
        res.json(users);
    }]);


/**
 * /users/:id
 * find user by some id
 */
usersRouter.get('/:id', [
    // authMiddleware('admin', 'manager'),
    async (req, res) => {
        const user = await userDao.findById(+req.params.id);
        console.log('finding user by id: ' + req.params.id);
        res.json(user);
    }]);


/**
 * /users
 * partially update user resource
 */
usersRouter.patch('', async (req, res) => {
    // const userId = req.body.id;
    // console.log( 'usersRouter body id = ', req.body.id);
    // const currentLoggedInUser = req.session.user;
    // console.log( 'usersRouter session.user = ', req.session.user);
    // console.log( 'usersRouter currentLoggedInUser = ', currentLoggedInUser);
    // console.log( 'usersRouter currentLoggedInUser id = ', currentLoggedInUser.id);
    // if (currentLoggedInUser && currentLoggedInUser.id === userId) {
        if (authMiddleware('admin')) {
        const updatedUser = await userDao.update(req.body);
        res.json(updatedUser);
    } else {
        res.sendStatus(403);
    }
});

// /**
//  * /users
//  * delete user by id
//  */
// usersRouter.delete('/:id', (req, res) => {
//     // userDao.deleteUser(+req.params.id);
//     res.end();
// });