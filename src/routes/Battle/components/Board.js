import React from 'react'
import { Hand } from 'routes/Battle/components/Hand'
import { PlayingArea } from 'routes/Battle/components/PlayingArea'

export const Board = (props) => (
  <div className="board" style={{ margin: '0 auto' }} >
      { <Hand/> }
      { <PlayingArea/> }
      { <PlayingArea/> }
      { <Hand/> }
  </div>
)
