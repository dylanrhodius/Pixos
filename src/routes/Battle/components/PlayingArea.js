import React from 'react'
import { BattleRow } from 'routes/Battle/components/BattleRow'

export const PlayingArea = (props) => (
  <div className="playing-area" style={{ margin: '0 auto' }} >

  { <BattleRow />}
  { <BattleRow />}
  { <BattleRow />}

  </div>
)
