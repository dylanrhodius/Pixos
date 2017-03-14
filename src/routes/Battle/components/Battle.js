import React from 'react'
import { InfoBar } from 'routes/Battle/components/InfoBar'
import { Board } from 'routes/Battle/components/Board'

export const Battle = (props) => (
  <div style={{ margin: '0 auto' }} >

  { <InfoBar/> }
  { <Board/> }

  </div>
)

export default Battle
