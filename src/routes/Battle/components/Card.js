import React from 'react'
import './Card.scss'
import ReactTooltip from 'react-tooltip'


export default class Card extends React.Component {

constructor (props) {
  super(props)
}

getSpecialIcon() {
  if (this.props.special) {
    return (
      <img src={`/icons/${this.props.special}.svg`} className={`game-card-special ${this.props.special}-bkgrnd p-1 circle d-inline-block mx-auto`}/>
    )
  }
}

capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

loadPower () {
  if(this.props.meteored && this.props.doubled){
    //METEORED AND DOUBLED
    return (
      <span className={`game-card-power text-center meteor-bkgrnd circle d-inline-block mx-auto highlighted-white-text`}>
        { 2 }
      </span>
    )
  } else if (this.props.meteored){
    //JUST METEORED
    return (
      <span className={`game-card-power text-center meteor-bkgrnd circle d-inline-block mx-auto highlighted-white-text`}>
        { 1 }
      </span>
    )
  } else if (this.props.doubled) {
    //JUST DOUBLED
    return (
      <span className={`game-card-power text-center ${this.props.type}-bkgrnd circle d-inline-block mx-auto highlighted-white-text`}>
        { this.props.power * 2 }
      </span>
    )
  } else {
    // JUST NORMAL
    return (
      <span className={`game-card-power text-center ${this.props.type}-bkgrnd circle d-inline-block mx-auto highlighted-white-text`}>
        { this.props.power }
      </span>
    )
  }

}

render() {
  let specialIcon = this.getSpecialIcon()
  let showPointerClass
  let power = this.loadPower()
  if (this.props.showPointer) { showPointerClass = "show-pointer" }
  return (
      <div className={`game-card ${this.props.doubled ? 'paragon-box-shadow': 'box-shadow'} ${this.props.inCardWrapper ? '' : 'mx-1 mb-2'} ${this.props.type}-faint-bkgrnd d-flex align-items-stretch ${showPointerClass}`} data-tip data-for={`card_${this.props.name}`}>
        <div className={`game-card-name-holder pb-1 ${this.props.type}-main-bkgrnd`}>
          <h4 className="game-card-name m-0 text-left highlighted-white-text">
            { this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1) }
          </h4>
        </div>
        <div className="d-flex justify-content-center align-items-start game-card-img-holder p-1">
          <img className="game-card-img" src={this.props.imgUrl} alt="Card image cap"/>
        </div>
          { power }
        <ReactTooltip id={`card_${this.props.name}`} className={`${this.props.type}-main-bkgrnd`}>
          <p className="mb-1 highlighted-white-text">{this.capitalize(this.props.name)}</p>
          <p className="mb-0 highlighted-white-text" style={{ fontWeight: 'normal' }}>{this.props.description}</p>
        </ReactTooltip>
        { specialIcon }
      </div>

  )
}

  propTypes: {
    type : React.PropTypes.string.isRequired,
    imgUrl : React.PropTypes.string.isRequired,
    name : React.PropTypes.string.isRequired,
    power : React.PropTypes.string.isRequired,
    special : React.PropTypes.string.isRequired,
    doubled : React.PropTypes.string.isRequired,
    meteored : React.PropTypes.string.isRequired,
    description : React.PropTypes.string.isRequired,
    showPointer: React.PropTypes.bool.isRequired,
    inCardWrapper: React.PropTypes.bool.isRequired
  }
}
