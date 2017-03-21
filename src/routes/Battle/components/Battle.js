import React from 'react'
import InfoBar from 'routes/Battle/components/InfoBar'
import Board from 'routes/Battle/components/Board'
import CircularProgress from 'material-ui/CircularProgress';

import io from 'socket.io-client';
const socket = io.connect(`${window.location.origin}`);

export default class Battle extends React.Component {

  loadContent () {
    if(this.props.battle.self.hand.length == 0) {
      return (
        <div className="row pt-5">
          <div className="col-12 text-center pt-5">
            <h2 className="mb-4">Matchmaking</h2>
            <CircularProgress size={60} thickness={7} />
          </div>
        </div>
      )
    } else {
      return (
        <div className="row no-gutters">
          <InfoBar  battle={this.props.battle}
                    setTurnFinished={this.props.setTurnFinished}
                    setMyTurn={this.props.setMyTurn}
                    passTurn={this.props.passTurn}
                    />
          <Board battle={this.props.battle}
                setTurnFinished={this.props.setTurnFinished}
                setMyTurn={this.props.setMyTurn}
                removeCard={this.props.removeCard}
                addCard={this.props.addCard}
                updatePower={this.props.updatePower}
                resurrectCards={this.props.resurrectCards}
                applyMeteorEffect={this.props.applyMeteorEffect}
                applyParagonEffect={this.props.applyParagonEffect}
                 />
        </div>
      )
    }
  }

  checkMeteorStatus() {
    if (this.props.battle.enemy.meteor.land) {
      console.log('APPLYING METEOR EFFECT');
      this.props.applyMeteorEffect('land')
    }
    if (this.props.battle.enemy.meteor.water) {
      console.log('APPLYING METEOR EFFECT');
      this.props.applyMeteorEffect('water')
    }
    if (this.props.battle.enemy.meteor.air) {
      console.log('APPLYING METEOR EFFECT');
      this.props.applyMeteorEffect('air')
    }
  }

  adjudicateGameState() {
    // todo: add round counter; when 3 it's a draw
    // if enemy has won
    //   adjudicate end of game:
    //   set game end notifcation message as loser
    // else if enemy has passed & self has passed:
        // decide round winner
        // clear playing area
        // if self won
        //   update self score
        //   if self score == 2
        //     set game end notification as winner
        // set notification message
    // endif
    let battle = this.props.battle
    if (battle.self.hasPassed && ( battle.enemy.hasPassed
    || battle.enemy.hasRoundFinished) )  {
      let selfHasWon = battle.self.power > battle.enemy.power
      this.props.updateScore(selfHasWon)
      this.props.updateHasRoundFinished(true)
      this.props.updateRoundCounter()
      this.props.passTurn(false)
      this.props.setRoundNotification(selfHasWon)
      this.props.setTurnFinished(true)
      this.props.setMyTurn(false)
    }
  }

  componentDidMount() {
    var that = this
    if(this.props.battle.self.hand.length == 0) {
      socket.emit('request:matchmaking');
    }
    socket.on("init:battle", function(data) {
      console.log('init battle data: ', data)
      that.props.setupPlayers(data)
    })
    socket.on("receive:data", function(data) {
      console.log("Received data from Opponent!:", data);
      that.props.setMyTurn(true)
      that.props.updateHasRoundFinished(false)
      that.props.updateEnemyState(data)
      that.checkMeteorStatus()

      that.adjudicateGameState()
      if(data.hasRoundFinished) {
        that.props.clearPlayingArea()
        that.props.updatePower()
       }
      if (that.props.battle.self.hasPassed) {
        that.props.setMyTurn(false)
        that.props.setTurnFinished(true)
      }
    })
    console.log('Battle state is:', that.props.battle)
  }

  componentDidUpdate() {
    if (this.props.battle.self.hand.length == 0) {
      this.props.passTurn(true)
    }
    console.log('Battle state is:', this.props.battle)
    if (this.props.battle.turnFinished) {
      socket.emit('pass:ToRoom', this.props.battle.self)
      this.props.setTurnFinished(false)
    }

  }

  render () {
    let content = this.loadContent();
    return (
      <div>
      { content }

      </div>
    )
  }
}

Battle.propTypes = {
  setupPlayers  : React.PropTypes.func.isRequired,
  setTurnFinished  : React.PropTypes.func.isRequired,
  doubleAsync : React.PropTypes.func.isRequired,
  increment   : React.PropTypes.func.isRequired,
  battle : React.PropTypes.object.isRequired,
  setMyTurn : React.PropTypes.func.isRequired,
  updateEnemyState : React.PropTypes.func.isRequired,
  passTurn : React.PropTypes.func.isRequired,
  removeCard : React.PropTypes.func.isRequired,
  addCard : React.PropTypes.func.isRequired,
  updatePower : React.PropTypes.func.isRequired,
  updateScore : React.PropTypes.func.isRequired,
  clearPlayingArea : React.PropTypes.func.isRequired,
  setRoundNotification : React.PropTypes.func.isRequired,
  updateHasRoundFinished : React.PropTypes.func.isRequired,
  updateRoundCounter : React.PropTypes.func.isRequired,
  setRoundNotification : React.PropTypes.func.isRequired,
  resurrectCards : React.PropTypes.func.isRequired,
  applyMeteorEffect : React.PropTypes.func.isRequired,
  applyParagonEffect : React.PropTypes.func.isRequired

}
