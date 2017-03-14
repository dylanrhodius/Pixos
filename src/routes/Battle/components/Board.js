import React from 'react'
import { Hand1 } from 'routes/Battle/components/Hand1'
import { Hand2 } from 'routes/Battle/components/Hand2'
import { PlayingArea1 } from 'routes/Battle/components/PlayingArea1'
import { PlayingArea2 } from 'routes/Battle/components/PlayingArea2'

export const Board = (props) => (
  <div className="board" style={{ margin: '0 auto' }} >
      { <Hand2/> }
      { <PlayingArea2/> }
      { <PlayingArea1/> }
      { <Hand1/> }
  </div>
)
