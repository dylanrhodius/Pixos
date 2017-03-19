import React from 'react'
import Hand from 'routes/Battle/components/Hand'
import { PlayingArea } from 'routes/Battle/components/PlayingArea'

export default class Board extends React.Component {

  render() {
    return (
      <div className="board col-11" >
          { <Hand hand={this.props.battle.enemy.hand}
                  removeCard={this.props.removeCard}
                  addCard={this.props.addCard}
                  isEnemyHand={true}  /> }
          { <PlayingArea type={'enemy'} cardArrays={this.props.battle.enemy.playingArea}/> }
          <hr className="m-0"/>
          { <PlayingArea type={'self'} cardArrays={this.props.battle.self.playingArea}/> }
          { <Hand hand={this.props.battle.self.hand}
                  removeCard={this.props.removeCard}
                  setTurnFinished={this.props.setTurnFinished}
                  setMyTurn={this.props.setMyTurn}
                  addCard={this.props.addCard}
                  isEnemyHand={false}
                  isSelfTurn={this.props.battle.self.myTurn}
                  updatePower={ this.props.updatePower }/> }
      </div>
    )
  }
}

Board.propTypes = {
  battle : React.PropTypes.object.isRequired,
  removeCard : React.PropTypes.func.isRequired,
  setTurnFinished  : React.PropTypes.func.isRequired,
  setMyTurn : React.PropTypes.func.isRequired,
  addCard : React.PropTypes.func.isRequired,
  updatePower : React.PropTypes.func.isRequired
}
