import { connectionPool } from '../util/connection.util';
import { PoolClient } from 'pg';
import { convertSqlUser } from '../util/user.converter';
import User from '../models/user';


export async function findAll() {
    console.log('finding all users');
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const result = await client.query(`
        SELECT * FROM ers_user
        INNER JOIN role USING (role_id)`);
        // convert result from sql object to js object
        return result.rows.map(convertSqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}

export async function findById(id: number) {
    console.log('finding user by id: ' + id);
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query(`
        SELECT * FROM ers_user
        INNER JOIN role USING (role_id)
        WHERE user_id = $1`, [id]);
        const sqlUser = result.rows[0];
        console.log( 'findById sqlUser = ', sqlUser);
        return sqlUser && convertSqlUser(sqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findByUsernameAndPassword(username: string, password: string) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();

        // prepared statement to secure against SQL injection
        const queryString = `
        SELECT * FROM ers_user u
        JOIN role r ON (u.role_id = r.role_id)
        WHERE username = $1 AND password = $2
        `;
        const result = await client.query(queryString, [username, password]);
        const sqlUser = result.rows[0]; // there should really only be 1 row at best
        return sqlUser && convertSqlUser(sqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function update(user: User) {
    const oldUser = await findById(user.id);
    if (!oldUser) {
        return undefined;
    }
    user = {
        ...oldUser,
        ...user
        };
    console.log('dao update user = ', user);
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
            UPDATE ers_user SET username = $1, password = $2, first_name = $3, last_name = $4, email = $5, role_id = $6
            WHERE user_id = $7
            RETURNING *
        `;
        const params = [user.username, user.password, user.firstName, user.lastName, user.email, user.role, user.id];
        const result = await client.query(queryString, params);
        const sqlUser = result.rows[0];
        return convertSqlUser(sqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}
