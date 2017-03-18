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
        <MenuItem primaryText="Place In Deck" />
        <Link href={`https://en.wikipedia.org/wiki/Tyrannosaurus`} > <MenuItem primaryText="Card Info"  /> </Link>
        <MenuItem primaryText="Remove" />

        </Menu>

      </Popover>
    </div>
   )
 }

 propTypes: {
   name: React.propTypes.string.isRequired,
   power: React.propTypes.string.isRequired,
   type: React.propTypes.string.isRequired,
   cost: React.propTypes.string.isRequired,
   imgUrl: React.propTypes.string.isRequired,
   placeInDeck: React.propTypes.func.isRequired
 }
}
