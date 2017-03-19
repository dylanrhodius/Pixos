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

    this.handleCardSelection = this.handleCardSelection.bind(this)
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

  handleCardSelection = () => {
    let cardData = {
      type : this.props.type,
      cardId: parseInt(this.props.id.split("_")[2])
    }
    if (this.sufficientDollars()) { this.props.placeInDeck(cardData) }
  }

render () {
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
        <MenuItem primaryText="Place In Deck" onClick={this.handleCardSelection} />
        </Menu>

      </Popover>
    </div>
   )
 }

 propTypes: {
   playerDeck : React.PropTypes.object.isRequired,
   name: React.propTypes.string.isRequired,
   power: React.propTypes.string.isRequired,
   type: React.propTypes.string.isRequired,
   cost: React.propTypes.string.isRequired,
   imgUrl: React.propTypes.string.isRequired,
   placeInDeck: React.propTypes.func.isRequired,
   id: React.propTypes.string.isRequired
 }
}
