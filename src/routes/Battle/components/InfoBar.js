import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import PixosMenu from 'routes/Battle/components/PixosMenu'
import './InfoBar.scss'

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
        <div className="full-width">
          <RaisedButton label="Pass"
                        primary={true}
                        fullWidth={true}
                        onTouchTap={this.setTurnFinishedToTrue} />
        </div>
      )
    } else {
      return (
        <div style={{ height: '35.99px' }}></div>
      )
    }
  }

  render () {
    let passButton = this.loadContent()
    return (
      <div className="info-bar col-1 d-flex flex-column justify-content-center align-items-center grey-bkgrnd">
        <PixosMenu />
        <img className="game-avatar circle circle-highlight" src={`${this.props.battle.enemy.img}`}/>
        <span className="info-bar-text mx-2">{ this.props.battle.enemy.name }</span>
        <span className="my-2 info-bar-text land-main-bkgrnd circle circle-highlight info-bar-indicator">{this.props.battle.enemy.score}</span>
        <span className="info-bar-text small-text mb-auto">Score</span>
        <span className="mb-1 info-bar-text small-text">Power</span>
        <span className="mb-2 air-main-bkgrnd circle circle-highlight info-bar-indicator">{this.props.battle.enemy.power}</span>
        <span className="my-2 circle circle-highlight round-indicator material-bkgrnd">{ this.props.battle.self.roundCounter > 3 ? 3 : this.props.battle.self.roundCounter }/3</span>


        <span className="mt-2 air-main-bkgrnd circle circle-highlight info-bar-indicator">{this.props.battle.self.power}</span>
        <span className="mt-1 info-bar-text small-text">Power</span>
        <span className="mt-auto mb-1 info-bar-text small-text">Score</span>
        <span className="mb-2 info-bar-text land-main-bkgrnd circle circle-highlight info-bar-indicator">{this.props.battle.self.score}</span>
        <span className="info-bar-text mx-2">{ this.props.battle.self.name }</span>
        <img className="game-avatar circle circle-highlight mb-2" src={`${this.props.battle.self.img}`}/>
        {passButton}
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
