import React from 'react'
import InfoBar from 'routes/Battle/components/InfoBar'
import Board from 'routes/Battle/components/Board'
import CircularProgress from 'material-ui/CircularProgress'
import shortId from 'shortid'
import Notification from 'routes/Battle/components/Notification'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router'
import './Battle.scss'

import io from 'socket.io-client';
const socket = io.connect(`${window.location.origin}`);

export default class Battle extends React.Component {

  loadNotifcation () {
    if (this.props.battle.self.gameEnded) {
      console.log('GAME ENDED!!!')
      return (
        <Notification open={true}
           key={shortId.generate()}
           text={this.props.battle.self.PlayerNotification} />
      )
    }
  }

  loadContent () {
    if(this.props.battle.self.hand.length == 0
       && this.props.battle.self.discardPile.length == 0
        && this.props.battle.self.power == 0 ) {
      return (
        <div className="row max-page-height sign-in-background">
          <div className="col-12 text-center max-page-height
            d-flex flex-column align-items-center justify-content-center">
            <h2 className="mb-4">Matchmaking&hellip;</h2>
            <CircularProgress className='mb-4' size={60} thickness={7} />
            <Link to={`/`} ><RaisedButton label="Cancel" primary={true}/></Link>
          </div>
        </div>
      )
    } else {
      return (
        <div className="row no-gutters max-page-height">
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
    let meteor = false
    if (this.props.battle.enemy.meteor.land) {
      console.log('APPLYING METEOR EFFECT');
      this.props.applyMeteorEffect('land')
      meteor = true
    }
    if (this.props.battle.enemy.meteor.water) {
      console.log('APPLYING METEOR EFFECT');
      this.props.applyMeteorEffect('water')
      meteor = true
    }
    if (this.props.battle.enemy.meteor.air) {
      console.log('APPLYING METEOR EFFECT');
      this.props.applyMeteorEffect('air')
      meteor = true
    }
    if (meteor) {
      this.props.updatePower()
    }

  }


  roundIsOver() {
    let battle = this.props.battle
    console.log('EVALUATING ROUND IS OVER', {
      selfHasPassed: this.props.battle.self.hasPassed,
      selfreadyForNewRound: this.props.battle.self.hasPassed,
      enemyHasPassed: this.props.battle.enemy.hasPassed,
      enemyreadyForNewRound: this.props.battle.enemy.readyForNewRound })

    if (battle.self.hasPassed &&
      ( battle.enemy.hasPassed || battle.enemy.readyForNewRound) ) {
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
    this.props.setPlayerNotification("Round over, you " + roundResult)
    this.props.passTurn(false)
    this.props.setReadyForNewRound(true)
    this.props.setMyTurn(false)
    this.props.setTurnFinished(true)
  }

  startNewRound() {
    this.props.clearPlayingArea()
    this.props.updatePower()
    this.props.clearPlayerNotification()
    this.props.incrementRoundCounter()
  }

  endGame() {
    let battle = this.props.battle
    let gameResult = ""
    if (battle.self.score > battle.enemy.score) { gameResult = "You win!" }
    else if (battle.self.score < battle.enemy.score) { gameResult = "You lose!"}
    else { gameResult = "It's a draw!" }
    this.props.setPlayerNotification(gameResult)
    this.props.setGameEnded()
    this.props.setMyTurn(false)
    this.props.setTurnFinished(true)
  }

  componentDidMount() {
    var that = this
    if(this.props.battle.self.hand.length == 0) {
      socket.emit('request:matchmaking');
    }
    socket.on("init:battle", function(data) {
      that.props.setupPlayers(data)
    })

    socket.on("receive:data", function(enemyData) {
      console.log("Received data from Opponent!:", enemyData);
      if (!that.props.battle.self.gameEnded) {
        that.props.setMyTurn(true)
        that.props.setReadyForNewRound(false)
        that.props.updateEnemyState(enemyData)
        that.checkMeteorStatus()

        if (that.roundIsOver()) { that.endRound() }

        if(enemyData.readyForNewRound) {
          that.startNewRound()
          if (that.gameIsOver()) { that.endGame() }
        }

        if (that.props.battle.self.hasPassed) {
          that.props.setMyTurn(false)
          that.props.setTurnFinished(true)
        }
      }
    })
  }

  componentDidUpdate() {
    console.log('Battle updated with: ', this.props.battle)

    if (this.props.battle.turnFinished) {
      if (this.props.battle.self.hand.length == 0
        && (!this.props.battle.self.readyForNewRound)) {
        this.props.passTurn(true)
      }
      console.log('Passing to Opponent!:', this.props.battle)
      socket.emit('pass:ToRoom', this.props.battle.self)
      this.props.setTurnFinished(false)
    }

  }

  render () {
    let notification = this.loadNotifcation();
    let content = this.loadContent();
    return (
      <div className='max-page-height'>
      { content }
      { notification }
      </div>
    )
  }
}

Battle.propTypes = {
  setupPlayers  : React.PropTypes.func.isRequired,
  setTurnFinished  : React.PropTypes.func.isRequired,
  battle : React.PropTypes.object.isRequired,
  setMyTurn : React.PropTypes.func.isRequired,
  updateEnemyState : React.PropTypes.func.isRequired,
  passTurn : React.PropTypes.func.isRequired,
  removeCard : React.PropTypes.func.isRequired,
  addCard : React.PropTypes.func.isRequired,
  updatePower : React.PropTypes.func.isRequired,
  clearPlayingArea : React.PropTypes.func.isRequired,
  resurrectCards : React.PropTypes.func.isRequired,
  applyMeteorEffect : React.PropTypes.func.isRequired,
  applyParagonEffect : React.PropTypes.func.isRequired,
  setPlayerNotification : React.PropTypes.func.isRequired,
  setReadyForNewRound : React.PropTypes.func.isRequired,
  incrementRoundCounter : React.PropTypes.func.isRequired,
  setPlayerNotification : React.PropTypes.func.isRequired,
  incrementSelfScore : React.PropTypes.func.isRequired,
  clearPlayerNotification : React.PropTypes.func.isRequired,
  setGameEnded : React.PropTypes.func.isRequired
}
