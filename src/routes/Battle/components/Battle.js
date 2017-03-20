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
                updatePower={this.props.updatePower} />
        </div>
      )
    }
  }

  roundIsOver() {
    let battle = this.props.battle
    if (battle.self.hasPassed && ( battle.enemy.hasPassed
    || battle.enemy.hasRoundFinished) ) {
      return true;
    }
  }

  updateScores() {
    let battle = this.props.battle
    if (battle.self.power > battle.enemy.power) {
      this.props.incrementSelfScore()
    } else if (battle.self.power < battle.enemy.power) {
      this.props.incrementEnemyScore()
    }
  }

  // adjudicateGameStateBeta() {
  //     this.props.incrementRoundCounter() - DONE
  //     this.props.updateScores() - DONE
  //     let result = this.props.getResult()
  //     this.props.displayResult(result)
  //     this.props.passTurn(false)
  //     this.props.updateHasRoundFinished(true)
  //     this.props.setTurnFinished(true)
  //     this.props.setMyTurn(false)
  //   }

    adjudicateGameState() {
    let battle = this.props.battle
    // if round is over
    // if (battle.self.hasPassed && ( battle.enemy.hasPassed
    // || battle.enemy.hasRoundFinished) )  {
      let selfHasWon = battle.self.power > battle.enemy.power
      this.props.updateScore(selfHasWon)
      this.props.incrementRoundCounter()
      this.props.setRoundNotification(selfHasWon)
      this.props.passTurn(false)
      this.props.updateHasRoundFinished(true)
      this.props.setTurnFinished(true)
      this.props.setMyTurn(false)
    // }
  }

  componentDidMount() {
    var that = this
    if(this.props.battle.self.hand.length == 0) {
      socket.emit('request:matchmaking');
    }
    socket.on("init:battle", function(data) {
      that.props.setupPlayers(data)
    })
    socket.on("receive:data", function(data) {
      console.log("Received data from Opponent!:", data);
      that.props.setMyTurn(true)
      that.props.updateHasRoundFinished(false)
      that.props.updateEnemyState(data)
      if (that.roundIsOver()) {
        that.adjudicateGameState()
      }
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
  incrementRoundCounter : React.PropTypes.func.isRequired,
  setRoundNotification : React.PropTypes.func.isRequired,
  incrementEnemyScore : React.PropTypes.func.isRequired,
  incrementSelfScore : React.PropTypes.func.isRequired
}
