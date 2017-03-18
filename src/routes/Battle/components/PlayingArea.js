import React from 'react'
import { BattleRow } from 'routes/Battle/components/BattleRow'

export const PlayingArea = (props) => (
  <div className="playing-area">

  { <BattleRow type={props.type == 'enemy' ? 'air' : 'land'} />}
  <hr className="m-0"/>
  { <BattleRow type={'water'}/>}
  <hr className="m-0"/>
  { <BattleRow type={props.type == 'enemy' ? 'land' : 'air'} />}

  </div>
)

PlayingArea.propTypes = {
  type  : React.PropTypes.string.isRequired
}

export default PlayingArea
