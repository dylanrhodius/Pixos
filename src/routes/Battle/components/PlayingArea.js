import React from 'react'
import { BattleRow } from 'routes/Battle/components/BattleRow'

export const PlayingArea = (props) => (
  <div className="playing-area">

  { <BattleRow />}
  { <BattleRow />}
  { <BattleRow />}

  </div>
)

export default PlayingArea
