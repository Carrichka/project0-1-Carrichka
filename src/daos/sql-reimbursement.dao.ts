import { connectionPool } from '../util/connection.util';
import { PoolClient } from 'pg';
// import { convertSqlReimb} from '../util/reimbursement.converter';
// import Reimbursement from '../models/reimbursement';

export async function findAll() {
    console.log('finding all reimbursements');
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query(
            `SELECT r.reimbursement_id, u.first_name, u.last_name, r.amount,
            r.date_submitted, r.date_resolved, e.first_name, e.last_name, s.status, t.type
            FROM reimbursement r
            INNER JOIN ers_user u ON (r.author = u.user_id)
            JOIN ers_user e ON (r.resolver = e.user_id)
            JOIN reimbursement_status s ON (r.status = s.status_id)
            JOIN reimbursement_type t ON (r.type = t.type_id)`);
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

export async function findByUserId(id: number) {
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