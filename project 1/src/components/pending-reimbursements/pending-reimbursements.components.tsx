import React, { Component } from 'react';
import Reimbursement from '../../models/reimbursement';

interface IState {
    reimbursements: Reimbursement[],
}

export default class PendingReimbursements extends Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            reimbursements: [],
        };
    }

    async componentDidMount() {
        this.getPendingReimbursements();
    }

    getPendingReimbursements = async () => {
        const resp = await fetch('http://localhost:8012/reimbursements/status/1', {
            credentials: 'include'
        });
        const reimbursementsFromServer = await resp.json();
        this.setState({
            reimbursements: reimbursementsFromServer,
        });
        console.log(reimbursementsFromServer);
    }

    render() {
        const reimbursements = this.state.reimbursements;
        console.log(reimbursements);
        return ( 
            <div>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Author</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Date Submitted</th>
                            <th scope="col">Date Resolved</th>
                            <th scope="col">Description</th>
                            <th scope="col">Resolver</th>
                            <th scope="col">Status</th>
                            <th scope="col">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reimbursements.map(reimbursements =>
                                <tr key={'reimbursementId-' + reimbursements.reimbursementId}>
                                    <td>{reimbursements.author.firstName + ' ' + reimbursements.author.lastName}</td>
                                    <td>{reimbursements.amount}</td>
                                    <td>{reimbursements.dateSubmitted}</td>
                                    <td>{reimbursements.dateResolved && reimbursements.dateResolved}</td>
                                    <td>{reimbursements.description}</td>
                                    <td>{reimbursements.resolver.firstName + ' ' + reimbursements.resolver.lastName}</td>
                                    <td>{reimbursements.status.status}</td>
                                    <td>{reimbursements.type.type}</td>
                                </tr>)
                        }
                    </tbody>
                </table>

            </div>
        );
    }
}