import React from 'react'
import Hand from 'routes/Battle/components/Hand'
import { PlayingArea } from 'routes/Battle/components/PlayingArea'

export default class Board extends React.Component {

render() {
  return (
  <div className="board" style={{ margin: '0 100px 0 100px',
                                  border: '1px solid red',
                                  float: 'left',
                                  height: '80%',
                                  width: '700px'}} >
      { <Hand hand={this.props.battle.enemy.hand}
              removeCard={this.props.removeCard}
              addCard={this.props.addCard}  /> }
      { <PlayingArea/> }
      { <PlayingArea/> }
      { <Hand hand={this.props.battle.self.hand}
              removeCard={this.props.removeCard}
              addCard={this.props.addCard}/> }
  </div>
  )
}
}

Board.propTypes = {
  battle : React.PropTypes.object.isRequired,
  removeCard : React.PropTypes.func.isRequired,
  addCard : React.PropTypes.func.isRequired
}
