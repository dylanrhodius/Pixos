import React from 'react'
import { InfoBar } from 'routes/Battle/components/InfoBar'
import Board from 'routes/Battle/components/Board'

import io from 'socket.io-client';
const socket = io.connect(`${window.location.origin}`);

export default class Battle extends React.Component {

  loadContent () {
    if(this.props.battle.self.hand.length == 0) {
      return (
        <div>
          <h2>Matchmaking</h2>
          <img src="/icons/loading.svg" alt="loading icon"></img>
        </div>
      )
    } else {
      return (
        <div>
          <InfoBar buildPlayerHands={this.props.buildPlayerHands}/>
          <Board battle={this.props.battle}/>
        </div>
      )
    }
  }

  componentDidMount() {
    if(this.props.battle.self.hand.length == 0) {
      socket.emit('request:matchmaking');
    }
    socket.on("init:battle", function(data) {
      console.log("battle initiated");
      console.log(data);
    })
  }

  render () {
    let content = this.loadContent();
    return (
      <div style={{ margin: '0 auto',
                    border: '1px solid black',
                    height: '600px',
                    width: '980px'
     }} >
      { content }

      </div>
    )
  }
}

Battle.propTypes = {
  buildPlayerHands  : React.PropTypes.func.isRequired,
  doubleAsync : React.PropTypes.func.isRequired,
  increment   : React.PropTypes.func.isRequired,
  battle : React.PropTypes.object.isRequired
}
