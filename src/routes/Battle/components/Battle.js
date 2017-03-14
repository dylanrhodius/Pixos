import React from 'react'

export const Battle = (props) => (
  <div style={{ margin: '0 auto' }} >
    <h2>Battle: {props.battle}</h2>
    <button className='btn btn-default' onClick={props.increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-default' onClick={props.doubleAsync}>
      Double (Async)
    </button>
  </div>
)

Battle.propTypes = {
  battle     : React.PropTypes.number.isRequired,
  doubleAsync : React.PropTypes.func.isRequired,
  increment   : React.PropTypes.func.isRequired
}

export default Battle
