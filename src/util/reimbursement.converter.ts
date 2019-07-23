// import User from '../models/user';
// import Role  from '../models/role';
// import ReimbursementStatus from '../models/reimbursementStatus';
// import ReimbursementType from '../models/reimbursementType';
import Reimbursement  from '../models/reimbursement';

export function convertSqlReimbursement(row: any) {

    // const reimbStatus = new ReimbursementStatus(row.statusId, row.status);
    // const reimbType = new ReimbursementType(row.typeId, row.type);
    // const rle = new Role(row.roleId, row.role);
    // const usr = new User(row.user_id, row.username, '', row.email, row.first_name, row.last_name, rle.role);
    return new Reimbursement(
        row.reimbursementId,
        // usr.id,
        row.amount,
        row.date_submitted,
        row.date_resolved,
        row.description,
        // usr.id,
        // reimbStatus.statusId,
        // reimbType.typeId
        );
}