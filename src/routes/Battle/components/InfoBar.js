import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';

export default class InfoBar extends React.Component {

  constructor (props) {
    super(props)

    this.setTurnFinishedToTrue = this.setTurnFinishedToTrue.bind(this)
  }

  setTurnFinishedToTrue () {
    console.log('trying to set turn finished to true')
    console.log('this is ', this)
    this.props.passTurn()
    this.props.setMyTurn(false)
    this.props.setTurnFinished(true)
  }

  loadContent () {
    if(this.props.battle.self.myTurn){
      return (
        <div>
          <p>Your turn</p>
          <RaisedButton label="Pass" primary={true} onTouchTap={this.setTurnFinishedToTrue} />
        </div>
      )
    } else {
      return(
        <p>Enemy turn</p>
      )
    }
  }

  render () {
    let content = this.loadContent()
    return (
      <div className="info-bar col-1">
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
  passTurn : React.PropTypes.func.isRequired,
  battle : React.PropTypes.object.isRequired
}
