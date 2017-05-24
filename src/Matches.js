import React, {Component} from 'react';
import BASE_URL from './Constants.js';
import {Button,ListGroupItem,ListGroup} from 'react-bootstrap';

class Matches extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            nextMatches: [],
            matchesToPlan : []
        }
    }

    componentDidMount() {
        fetch(BASE_URL + '/rest/seasons/current/matches/' + this.props.type + '/to-plan')
            .then(response => response.json())
            .then(s => this.setState({matchesToPlan: s}));

        fetch(BASE_URL + '/rest/seasons/current/matches/' + this.props.type + '/next')
            .then(response => response.json())
            .then(s => this.setState({nextMatches: s}));
    }

    renderMatch(matchDate, cancelHandler) {
        return (
            <ListGroupItem key={matchDate.date}>
                {matchDate.date}
                &nbsp;<Button bsStyle="danger" bsSize="xsmall" onClick={cancelHandler}>CANCEL</Button>
            </ListGroupItem>
        );
    }

    renderMatchToPlan(matchDate, planHanlder) {
        return (
            <ListGroupItem key={matchDate.date}>
                {matchDate.date}
                &nbsp;<Button bsStyle="primary" bsSize="xsmall" onClick={planHanlder}>PLAN</Button>
            </ListGroupItem>
        );
    }

    handlePlan(date) {
        fetch(BASE_URL + '/rest/seasons/current/matches/' + this.props.type + "/" + date, {
            method: 'put',
            body: {}
        }).then(response => this.componentDidMount())
    }

    handleCancel(date) {
        fetch(BASE_URL + '/rest/seasons/current/matches/' + this.props.type + "/" + date, {
            method: 'delete',
            body: {}
        }).then(response => this.componentDidMount())
    }

    render() {
        return (
            <div>
                <h4>{this.state.matchesToPlan.length} matches to plan</h4>
                    <ListGroup>
                    {this.state.matchesToPlan.map(m => this.renderMatchToPlan(m, this.handlePlan.bind(this, m.date)))}
                    </ListGroup>
                <h4>Next matches</h4>
                    <ListGroup>
                    {this.state.nextMatches.map(m => this.renderMatch(m, this.handleCancel.bind(this, m.date)))}
                    </ListGroup>
            </div>
        );
    }
}

export default Matches;
