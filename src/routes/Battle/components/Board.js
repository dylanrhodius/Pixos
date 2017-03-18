import React from 'react'
import Hand from 'routes/Battle/components/Hand'
import { PlayingArea } from 'routes/Battle/components/PlayingArea'

export const Board = (props) => (
  <div className="board col-11" >
      { <Hand hand={props.battle.enemy.hand} isEnemyHand={true} /> }
      { <PlayingArea type={'enemy'}/> }
      <hr className="m-0"/>
      { <PlayingArea type={'self'}/> }
      { <Hand hand={props.battle.self.hand} isEnemyHand={false} /> }
  </div>
)

Board.propTypes = {
  battle : React.PropTypes.object.isRequired
}

export default Board
