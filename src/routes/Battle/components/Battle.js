import React from 'react'
import { InfoBar } from 'routes/Battle/components/InfoBar'
import { Board } from 'routes/Battle/components/Board'

export const Battle = (props) => (
  <div style={{ margin: '0 auto',
                border: '1px solid black',
                height: '600px',
                width: '980px'
 }} >

  { <InfoBar buildPlayerHands = { props.buildPlayerHands }/> }
  { <Board/> }
  </div>
)

Battle.propTypes = {
  buildPlayerHands  : React.PropTypes.func.isRequired,
  doubleAsync : React.PropTypes.func.isRequired,
  increment   : React.PropTypes.func.isRequired
}

export default Battle
