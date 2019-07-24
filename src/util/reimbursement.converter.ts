import User from '../models/user';
import Role  from '../models/role';
import ReimbursementStatus from '../models/reimbursementStatus';
import ReimbursementType from '../models/reimbursementType';
import Reimbursement  from '../models/reimbursement';

export function convertSqlReimbursement(row: any) {

    return new Reimbursement(
        row.reimbursement_id,
        new User(row.user_id, '', '', row.first_name, row.last_name, '', new Role(row.role_id, row.role)),
        row.amount,
        row.date_submitted,
        row.date_resolved,
        row.description,
        new User(row.resolver_user_id, '', '', row.resolver_first_name, row.resolver_last_name, '', new Role(row.resolver_role_id, row.resolver_role)),
        new ReimbursementStatus(row.status, row.status_name),
        new ReimbursementType(row.type, row.type_name)
        );
}