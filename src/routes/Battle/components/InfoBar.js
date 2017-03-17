import React from 'react'

export default class InfoBar extends React.Component {

  constructor (props) {
    super(props)

    this.setTurnFinishedToTrue = this.setTurnFinishedToTrue.bind(this)
  }

  setTurnFinishedToTrue () {
    console.log('trying to set turn finished to true')
    console.log('this is ', this)
    this.props.setMyTurn(false)
    this.props.setTurnFinished(true)
  }

  render () {
    return (
      <div className="info-bar" style={{ margin: '0 auto',
                                        border: '1px solid blue',
                                        width: '150px',
                                        height: '100%',
                                        float: 'left'
                                        }} >
        <button onClick={this.setTurnFinishedToTrue}>End Turn</button>
      </div>
    )
  }
}

InfoBar.propTypes = {
  setTurnFinished  : React.PropTypes.func.isRequired,
  setMyTurn : React.PropTypes.func.isRequired
}
