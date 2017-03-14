import React from 'react'
import { BattleRow } from 'routes/Battle/components/BattleRow'

export const PlayingArea = (props) => (
  <div className="playing-area" style={{ margin: '0 auto',
                                        height: '200px',
                                        width: '80%',
                                        margin: '10px',
                                        border: '1px solid green'
                                        }} >

  { <BattleRow />}
  { <BattleRow />}
  { <BattleRow />}

  </div>
)
