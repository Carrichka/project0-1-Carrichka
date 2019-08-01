import { connectionPool } from '../util/connection.util';
import { PoolClient } from 'pg';
import Reimbursement from '../models/reimbursement';
import { convertSqlReimbursement } from '../util/reimbursement.converter';

export async function findAll() {
    console.log('finding all reimbursements');
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query(
            `SELECT r.*, u.user_id, u.first_name, u.last_name, u.role_id, e.user_id as resolver_user_id,
            e.first_name as resolver_first_name, e.last_name as resolver_last_name,
            e.role_id as resolver_role_id, s.status as status_name, t.type as type_name
            FROM reimbursement r
            INNER JOIN ers_user u ON (r.author = u.user_id)
            JOIN ers_user e ON (r.resolver = e.user_id)
            JOIN reimbursement_status s ON (r.status = s.status_id)
            JOIN reimbursement_type t ON (r.type = t.type_id)
            JOIN role l ON (u.role_id = l.role_id)
            JOIN role o ON (e.role_id = o.role_id)`);
        // convert result from sql object to js object
        return result.rows.map(convertSqlReimbursement);
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
        const result = await client.query(`
        SELECT r.*, u.user_id, u.first_name, u.last_name, u.role_id, e.user_id as resolver_user_id,
        e.first_name as resolver_first_name, e.last_name as resolver_last_name,
        e.role_id as resolver_role_id, s.status as status_name, t.type as type_name
        FROM reimbursement r
        INNER JOIN ers_user u ON (r.author = u.user_id)
        JOIN ers_user e ON (r.resolver = e.user_id)
        JOIN reimbursement_status s ON (r.status = s.status_id)
        JOIN reimbursement_type t ON (r.type = t.type_id)
        JOIN role l ON (u.role_id = l.role_id)
        JOIN role o ON (e.role_id = o.role_id)
        WHERE s.status_id = $1`, [id]);
        return result && result.rows.map(convertSqlReimbursement);
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
        const result = await client.query(`
        SELECT r.*, u.user_id, u.first_name, u.last_name, u.role_id, e.user_id as resolver_user_id,
        e.first_name as resolver_first_name, e.last_name as resolver_last_name,
        e.role_id as resolver_role_id, s.status as status_name, t.type as type_name
        FROM reimbursement r
        INNER JOIN ers_user u ON (r.author = u.user_id)
        JOIN ers_user e ON (r.resolver = e.user_id)
        JOIN reimbursement_status s ON (r.status = s.status_id)
        JOIN reimbursement_type t ON (r.type = t.type_id)
        JOIN role l ON (u.role_id = l.role_id)
        JOIN role o ON (e.role_id = o.role_id)
        WHERE u.user_id = $1`, [id]);
        return result && result.rows.map(convertSqlReimbursement);
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
        const result = await client.query(`
        SELECT r.*, u.user_id, u.first_name, u.last_name, u.role_id, e.user_id as resolver_user_id,
        e.first_name as resolver_first_name, e.last_name as resolver_last_name,
        e.role_id as resolver_role_id, s.status as status_name, t.type as type_name
        FROM reimbursement r
        INNER JOIN ers_user u ON (r.author = u.user_id)
        JOIN ers_user e ON (r.resolver = e.user_id)
        JOIN reimbursement_status s ON (r.status = s.status_id)
        JOIN reimbursement_type t ON (r.type = t.type_id)
        JOIN role l ON (u.role_id = l.role_id)
        JOIN role o ON (e.role_id = o.role_id) WHERE reimbursement_id = $1`, [id]);
        const sqlRmb = result.rows[0];
        return convertSqlReimbursement(sqlRmb);
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
    console.log(oldReimbursement);
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
            WHERE reimbursement_id= $7`;
        const params = [rebrsmnt.author.id, rebrsmnt.amount, rebrsmnt.description, rebrsmnt.resolver.id,
        rebrsmnt.status.statusId, rebrsmnt.type.typeId, rebrsmnt.reimbursementId];
        await client.query(queryString, params);
        return (rebrsmnt);
        // return convertSqlUser(sqlUser);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}