import React from 'react'

export const InfoBar = (props) => (
  <div className="info-bar" style={{ margin: '0 auto',
                                    border: '1px solid blue',
                                    width: '150px',
                                    height: '100%',
                                    float: 'left'
                                    }} >
    <button className='btn btn-default' onClick={ props.buildPlayerHands }>
      Start Round
    </button>
  </div>
)

InfoBar.propTypes = {
  buildPlayerHands  : React.PropTypes.func.isRequired
}
