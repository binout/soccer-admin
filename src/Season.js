import React, {Component} from 'react';
import BASE_URL from './Constants.js';
import {Col} from 'react-bootstrap';

import Matches from './Matches.js';

class Season extends Component {

    constructor(props) {
        super(props);
        this.state = {season: ''};
    }

    componentDidMount() {
        fetch(BASE_URL + '/rest/seasons/current')
            .then(response => response.json())
            .then(s => this.setState({season : s.name}));
    }

    render() {
        return (
            <div>
                <h2>Season {this.state.season}</h2>
                <Col xs={6} md={4} >
                    <h3>Friendly</h3>
                    <Matches type="friendly"/>
                </Col>
                <Col xs={6} md={4} >
                    <h3>League</h3>
                    <Matches type="league"/>
                </Col>
                <Col xs={6} md={4} >
                    <h3>Player</h3>
                    TBD
                </Col>
            </div>
        );
    }
}

export default Season;
