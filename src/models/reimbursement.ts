

export default class User {
    constructor(
        public reimbursementId = 0,
        public author = 0,
        public amount = 0,
        public dateSubmitted = 0,
        public dateResolved = 0,
        public description = '',
        public resolver = 0,
        public status = 0,
        public type = 0,
    ) {}
}