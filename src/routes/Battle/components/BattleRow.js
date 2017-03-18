import React from 'react'
import './BattleRow.scss'

export const BattleRow = (props) => (
  <div className="battle-row d-flex flex-wrap justify-content-center px-2">
    <div className={`${props.type}-bkgrnd battle-row-type circle`}/>
  </div>
)

BattleRow.propTypes = {
  type  : React.PropTypes.string.isRequired
}
