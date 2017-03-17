import React from 'react'
import { BattleRow } from 'routes/Battle/components/BattleRow'

export const PlayingArea = (props) => (
  <div className="playing-area">

  { <BattleRow />}
  <hr className="m-0"/>
  { <BattleRow />}
  <hr className="m-0"/>
  { <BattleRow />}

  </div>
)

export default PlayingArea
