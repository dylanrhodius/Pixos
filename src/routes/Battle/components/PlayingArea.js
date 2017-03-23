import React from 'react'
import BattleRow from 'routes/Battle/components/BattleRow'

export const PlayingArea = (props) => (
  <div className="playing-area">

  { <BattleRow type={props.type == 'enemy' ? 'air' : 'land'}
               cards={props.type == 'enemy' ? props.cardArrays.air : props.cardArrays.land }
               passed={props.passed}
  />}
  <hr className="m-0"/>
  { <BattleRow type={'water'} cards={ props.cardArrays.water }
                              passed={props.passed}/>}
  <hr className="m-0"/>
  { <BattleRow type={props.type == 'enemy' ? 'land' : 'air'}
               cards={props.type == 'enemy' ? props.cardArrays.land : props.cardArrays.air }
               passed={props.passed}
  />}

  </div>
)

PlayingArea.propTypes = {
  type  : React.PropTypes.string.isRequired,
  cardArrays  : React.PropTypes.object.isRequired,
  passed : React.PropTypes.bool.isRequired
}

export default PlayingArea
