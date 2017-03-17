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

  loadContent () {
    if(this.props.battle.self.myTurn){
      return (
        <button onClick={this.setTurnFinishedToTrue}>Pass Turn</button>
      )
    } else {
      return
    }
  }

  render () {
    let content = this.loadContent()
    return (
      <div className="info-bar" style={{ margin: '0 auto',
                                        border: '1px solid blue',
                                        width: '150px',
                                        height: '100%',
                                        float: 'left'
                                      }} >
      <p>{ this.props.battle.enemy.name }</p>
      <p> VS. </p>
      <p>{ this.props.battle.self.name }</p>
      {content}
    </div>
    )
  }
}

InfoBar.propTypes = {
  setTurnFinished  : React.PropTypes.func.isRequired,
  setMyTurn : React.PropTypes.func.isRequired,
  battle : React.PropTypes.object.isRequired
}
