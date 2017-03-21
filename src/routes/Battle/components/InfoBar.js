import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import PixosMenu from 'routes/Battle/components/PixosMenu'

export default class InfoBar extends React.Component {

  constructor (props) {
    super(props)

    this.setTurnFinishedToTrue = this.setTurnFinishedToTrue.bind(this)
  }

  setTurnFinishedToTrue () {
    this.props.passTurn(true)
    this.props.setMyTurn(false)
    this.props.setTurnFinished(true)
  }

  loadContent () {
    if(this.props.battle.self.myTurn){
      return (
        <div>
          <RaisedButton label="Pass" primary={true} onTouchTap={this.setTurnFinishedToTrue} />
        </div>
      )
    }
  }

  render () {
    let content = this.loadContent()
    return (
      <div className="info-bar col-1 d-flex flex-column justify-content-center align-items-center pt-2 pb-4">
        <PixosMenu/>
        <h3 className="my-2"><span>Score: </span>{this.props.battle.enemy.score}</h3>
        <p className="mb-auto">{ this.props.battle.enemy.name }</p>
        <img className="game-avatar" src={`${this.props.battle.enemy.img}`}/>
        <h4 className="my-2"><span>Power: </span>{this.props.battle.enemy.power}</h4>
        {content}
        <h4 className="my-2"><span>Power: </span>{this.props.battle.self.power}</h4>
        <p className="mt-auto">{ this.props.battle.self.PlayerNotification }</p>
        <p className="mt-auto">{ this.props.battle.self.name }</p>
        <img className="game-avatar" src={`${this.props.battle.self.img}`}/>
        <h3 className="my-2"><span>Score: </span>{this.props.battle.self.score}</h3>
        <h3 className="my-2"><span>Round: </span>{ this.props.battle.self.roundCounter > 3 ? 3 : this.props.battle.self.roundCounter }</h3>
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
