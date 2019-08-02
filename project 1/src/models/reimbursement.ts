import User from '../models/user';

import ReimbursementStatus from './reimbursementStatus';
import ReimbursementType from './reimbursementType';



export default class Reimbursement {

    constructor(
        public reimbursementId = 0,
        public author = new User(),
        public amount = 0,
        public dateSubmitted = 0,
        public dateResolved = 0,
        public description = '',
        public resolver = new User(),
        public status = new ReimbursementStatus(),
        public type = new ReimbursementType()
    ) {}
}