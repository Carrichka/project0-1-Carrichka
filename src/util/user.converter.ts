import User from '../models/user';
import  Role  from '../models/role';

export function convertSqlUser(row: any) {

    const r = new Role(row.roleId, row.role);
    return new User(row.user_id, row.username, '',  row.first_name, row.last_name, row.email, r.role);
}