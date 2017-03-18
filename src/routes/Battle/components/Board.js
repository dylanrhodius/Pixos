import React from 'react'
import Hand from 'routes/Battle/components/Hand'
import { PlayingArea } from 'routes/Battle/components/PlayingArea'

export const Board = (props) => (
  <div className="board col-11" >
      { <Hand hand={props.battle.enemy.hand} isEnemyHand={true} /> }
      { <PlayingArea type={'enemy'} cardArrays={props.battle.enemy.playingArea}/> }
      <hr className="m-0"/>
      { <PlayingArea type={'self'} cardArrays={props.battle.self.playingArea}/> }
      { <Hand hand={props.battle.self.hand} isEnemyHand={false} /> }
  </div>
)

Board.propTypes = {
  battle : React.PropTypes.object.isRequired
}

export default Board
