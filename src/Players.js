import React, {Component} from 'react';
import BASE_URL from './Constants.js';
import {Table,Button,Panel,Glyphicon } from 'react-bootstrap';

class Players extends Component {

    constructor(props) {
        super(props);
        this.state = {players: []};
    }

    componentDidMount() {
        fetch(BASE_URL + '/rest/players')
            .then(response => response.json())
            .then(s => this.setState({players : s}));
    }

    handleSubmit(e){
        e.preventDefault();
        var name = this.refs.inputPlayerName.value;
        var player = {
            name : name,
            email : this.refs.inputPlayerEmail.value,
            playerLeague : this.refs.inputPlayerLeague.checked,
            goalkeeper : this.refs.inputGoalkeeper.checked
        };
        fetch(BASE_URL + '/rest/players/' + name, {
            method: 'put',
            body: JSON.stringify(player)
        }).then(response => this.componentDidMount())
    }

    renderLine(player) {
        var playerLeague = player.playerLeague ? <Glyphicon glyph="star"/> : '';
        var goalkeeper = player.goalkeeper ? <Glyphicon glyph="print"/> : '';
        return (
            <tr key={player.name}>
                <td>{player.name}
                    &nbsp;{playerLeague}
                    &nbsp;{goalkeeper}
                </td>
                <td>{player.email}</td>
            </tr>
        );
    }

    render() {
        return (
            <div>
                <h2>Players</h2>
                <p>League Player : <Glyphicon glyph="star"/>
                Goalkeeper :  <Glyphicon glyph="print"/></p>

                <Table striped bordered condensed>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.players.map(p => this.renderLine(p))}
                        </tbody>
                    </Table>

                    <Panel>
                        <form ref="form" onSubmit={this.handleSubmit}>
                            Name <input type="text" ref="inputPlayerName" /> <br/><br/>
                            Email <input type="text" ref="inputPlayerEmail" /> <br/><br/>
                            Plays in league : <input type="checkbox" ref="inputPlayerLeague" /> <br/><br/>
                            Plays as goalkeeper : <input type="checkbox" ref="inputGoalkeeper" /> <br/><br/>
                            <Button bsStyle="primary" bsSize="small" onClick={this.handleSubmit}>PUT</Button>
                        </form>
                    </Panel>
            </div>
        );
    }
}

export default Players;
