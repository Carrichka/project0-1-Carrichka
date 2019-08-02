import React, { Component } from 'react';
import User from '../../models/user';

interface IState {
    users: User[],
}

export default class Reimbursements extends Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            users: [],
        };
    }

    async componentDidMount() {
        this.getUsers();
    }

    getUsers = async () => {
        const resp = await fetch('http://localhost:8012/users', {
            credentials: 'include'
        });
        const usersFromServer = await resp.json();
        this.setState({
            users: usersFromServer
        });
        console.log(usersFromServer);
    }

    render() {
        const users = this.state.users;
        console.log(users);
        return ( 
            <div>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(users =>
                                <tr key={'usersId-' + users.id}>
                                    <td>{users.username}</td>
                                    <td>{users.firstName}</td>
                                    <td>{users.lastName}</td>
                                    <td>{users.email}</td>
                                    <td>{users.role.role}</td>
                                </tr>)
                        }
                    </tbody>
                </table>

            </div>
        );
    }
}