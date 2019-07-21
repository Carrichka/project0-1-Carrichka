import User from '../models/user';
import ReimbursementStatus from './reimbursementStatus';
import ReimbursementType from './reimbursementType';

export default class Reimbursement {
    constructor(
        public reimbursementId = 0,
        public author = User,
        public amount = 0,
        public dateSubmitted = 0,
        public dateResolved = 0,
        public description = '',
        public resolver = User,
        public status = ReimbursementStatus,
        public type = ReimbursementType
    ) {}
}