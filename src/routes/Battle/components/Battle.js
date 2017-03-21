import React from 'react'
import InfoBar from 'routes/Battle/components/InfoBar'
import Board from 'routes/Battle/components/Board'
import CircularProgress from 'material-ui/CircularProgress'

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
                updatePower={this.props.updatePower} />
        </div>
      )
    }
  }

  roundIsOver() {
    let battle = this.props.battle
    if (battle.self.hasPassed && ( battle.enemy.hasPassed
    || battle.enemy.readyForNewRound) ) {
      return true;
    }
  }

  gameIsOver() {
    let battle = this.props.battle
    if (battle.self.roundCounter == 4 || battle.self.score == 2
      || battle.enemy.score == 2) {
        return true
      }
  }

  endRound() {
    let battle = this.props.battle
    let roundResult = ""
    if (battle.self.power > battle.enemy.power) { roundResult = "win" }
    else if (battle.self.power < battle.enemy.power) { roundResult = "lose" }
    else { roundResult = "both draw" }
    if (roundResult == "win") {this.props.incrementSelfScore()}
    this.props.incrementRoundCounter()
    this.props.setPlayerNotification("Round over, you " + roundResult)
    this.props.passTurn(false)
    this.props.setReadyForNewRound(true)
    this.props.setMyTurn(false)
    this.props.setTurnFinished(true)
  }

  endGame() {
    let battle = this.props.battle
    let gameResult = ""
    if (battle.self.score > battle.enemy.score) { gameResult = "win" }
    else if (battle.self.score < battle.enemy.score) { gameResult = "lose" }
    else { gameResult = "both draw" }
    this.props.setPlayerNotification("Game over, you " + gameResult)
    this.props.setGameEnded()
    this.props.setMyTurn(false)
    this.props.setTurnFinished(true)
  }

  componentDidMount() {
    var that = this
    if(this.props.battle.self.hand.length == 0) {
      socket.emit('request:matchmaking');
    }
    socket.on("init:battle", function(enemyData) {
      that.props.setupPlayers(enemyData)
    })

    socket.on("receive:data", function(enemyData) {
      // console.log("Received data from Opponent!:", enemyData);
      that.props.setMyTurn(true)
      that.props.setReadyForNewRound(false)
      that.props.updateEnemyState(enemyData)

      if (that.roundIsOver()) { that.endRound() }

      else if(enemyData.readyForNewRound) {
        that.props.clearPlayingArea()
        that.props.updatePower()
        that.props.clearPlayerNotification()
        if (that.gameIsOver()) { that.endGame() }
      }

      else if (that.props.battle.self.hasPassed) {
        that.props.setMyTurn(false)
        that.props.setTurnFinished(true)
      }
    })
  }

  componentDidUpdate() {
    if (this.props.battle.self.hand.length == 0) {
      this.props.passTurn(true)
    }
    if (this.props.battle.turnFinished) {
      console.log('End of round:', this.props.battle)
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
  setPlayerNotification : React.PropTypes.func.isRequired,
  setReadyForNewRound : React.PropTypes.func.isRequired,
  incrementRoundCounter : React.PropTypes.func.isRequired,
  setPlayerNotification : React.PropTypes.func.isRequired,
  incrementEnemyScore : React.PropTypes.func.isRequired,
  incrementSelfScore : React.PropTypes.func.isRequired,
  clearPlayerNotification : React.PropTypes.func.isRequired,
  setGameEnded : React.PropTypes.func.isRequired
}
