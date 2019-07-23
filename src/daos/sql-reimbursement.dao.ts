import { connectionPool } from '../util/connection.util';
import { PoolClient } from 'pg';
import Reimbursement from '../models/reimbursement';
// import { convertSqlReimb} from '../util/reimbursement.converter';
// import Reimbursement from '../models/reimbursement';

export async function findAll() {
    console.log('finding all reimbursements');
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query(
            `SELECT *
            FROM reimbursement`);
        // convert result from sql object to js object
        return result; // .rows.map(convertSqlReimb);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}

export async function findByStatusId(id: number) {
    console.log('finding reimbursement by statusid: ' + id);
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM reimbursement  WHERE status = $1', [id]);
        // const sqlRmb = result.rows[0];
        return result /*&& convertSqlUser(sqlUser)*/;
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findByAuthorId(id: number) {
    console.log('finding reimbursement by userid: ' + id);
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM reimbursement  WHERE author = $1', [id]);
        // const sqlRmb = result.rows[0];
        return result /*&& convertSqlUser(sqlUser)*/;
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function saveReimbursement(rmbrsmnt: Reimbursement) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
        INSERT INTO reimbursement (author, amount, date_submitted, date_resolved, description, resolver, status, type)
        VALUES ($1, $2, CURRENT_TIMESTAMP, null, $3, $4, $5, $6)
        RETURNING reimbursement_id;
        `;
        const params = [rmbrsmnt.author, rmbrsmnt.amount, rmbrsmnt.description, rmbrsmnt.resolver, rmbrsmnt.status, rmbrsmnt.type];
        const result = await client.query(queryString, params);
        return result.rows[0].reimbursement_id;
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}

export async function findByReimbursementId(id: number) {
    console.log('finding reimbursement by Reimbursementid: ' + id);
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM reimbursement WHERE reimbursement_id = $1', [id]);
        // const sqlRmb = result.rows[0];
        return result /*&& convertSqlUser(sqlUser)*/;
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function updateReimbursement(rebrsmnt: Reimbursement) {
    const oldReimbursement = await findByReimbursementId(rebrsmnt.reimbursementId);
    if (!oldReimbursement) {
        return undefined;
    }
    rebrsmnt = {
        ...oldReimbursement,
        ...rebrsmnt
        };
    console.log('dao update Reimbursement = ', rebrsmnt);
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
            UPDATE reimbursement SET author =$1, amount = $2, date_resolved = CURRENT_TIMESTAMP,
            description = $3, resolver = $4, status = $5, type = $6
            WHERE reimbursement_id= $7
            RETURNING *;
        `;
        const params = [rebrsmnt.author, rebrsmnt.amount, rebrsmnt.description, rebrsmnt.resolver, rebrsmnt.status, rebrsmnt.type, rebrsmnt.reimbursementId];
        const result = await client.query(queryString, params);
        const sqlUser = result.rows[0];
        return(sqlUser);
       // return convertSqlUser(sqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}