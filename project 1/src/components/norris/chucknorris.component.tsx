import React from 'react';
import { Button } from 'reactstrap';

interface IState {
    norrisJoke: any
}

export class ChuckNorrisComponent extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            norrisJoke: null
        }
    }

    getNewJoke = async () => {
        const resp = await fetch('http://api.icndb.com/jokes/random?limitTo=[nerdy]');
        const norrisJoke = await resp.json();
        this.setState({
            norrisJoke
        });
    }

    render() {
        return ( 
            <div>

                <Button color="success" onClick={this.getNewJoke}>Get a joke</Button>
                <br/>
                <br/>
                <h3>{this.state.norrisJoke && this.state.norrisJoke.value.joke}</h3>

            </div>
            
        );
    }
}