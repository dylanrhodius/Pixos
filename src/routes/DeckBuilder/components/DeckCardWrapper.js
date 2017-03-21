import React from 'react'
import DeckCard from './DeckCard'
import RaisedButton from 'material-ui/RaisedButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router'

export default class DeckCardWrapper extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      open: false
    }

    this.addCardToDeck = this.addCardToDeck.bind(this)
    this.removeCardFromDeck = this.removeCardFromDeck.bind(this)
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault()
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  sufficientDollars = () => {
    return (this.props.playerDeck.dinoDollars >= this.props.cost)
  }

  lessThanCardLimit = () => {
    let array = this.props.playerDeck[`${this.props.type}`].inDeck
    let counter = 0
    array.forEach((card) => {
      if (card._id == this.props._id) { counter += 1 }
    })
    return counter < this.props.playerDeck.duplicateCardLimit
  }

  addCardToDeck = () => {
    let cardData = {
      type : this.props.type,
      cardId: parseInt(this.props.id.split("_")[2])
    }
    if ((this.sufficientDollars()) && (this.lessThanCardLimit())) { this.props.placeInDeck(cardData) }
  }

  removeCardFromDeck = () => {
    console.log("removeCardFromDeck");
    console.log(this.props.id.split("_")[1]);
    let cardData = {
      type : this.props.type,
      cardId: parseInt(this.props.id.split("_")[2])
    }
    this.props.removeFromDeck(cardData)
  }

  loadContent () {
    if(this.props.id.split("_")[1] == 'pool'){
      return (
        <MenuItem primaryText="Place In Deck" onClick={this.addCardToDeck} />
      )
    } else {
      return(
        <MenuItem primaryText="Remove From Deck" onClick={this.removeCardFromDeck} />
      )
    }
  }


render () {
  let content = this.loadContent()
   return (
    <div className="mb-2">
       <div onTouchTap={this.handleTouchTap}>
         <DeckCard
            name={this.props.name}
            power={this.props.power}
            type={this.props.type}
            cost={this.props.cost}
            imgUrl={this.props.imgUrl}
            placeInDeck={this.props.placeInDeck}
            removeFromDeck={this.props.removeFromDeck}
            special={this.props.special}
          />
        </div>
      <Popover
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this.handleRequestClose}
      >
        <Menu>
          { content }
        </Menu>

      </Popover>
    </div>
   )
 }

 propTypes: {
   removeFromDeck : React.PropTypes.func.isRequired,
   playerDeck : React.PropTypes.object.isRequired,
   name: React.propTypes.string.isRequired,
   power: React.propTypes.string.isRequired,
   type: React.propTypes.string.isRequired,
   cost: React.propTypes.string.isRequired,
   imgUrl: React.propTypes.string.isRequired,
   placeInDeck: React.propTypes.func.isRequired,
   id: React.propTypes.string.isRequired,
   _id: React.propTypes.string.isRequired
 }
}
