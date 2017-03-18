import React from 'react'
var cardData = require('../../../../server/cardData').CARD_DATA
import Card from '../../Battle/components/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

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
  console.log(this.props);
   return (
     <div>
       <div className="deck-container d-flex justify-content-center flex-wrap">
         <div>
          <Card
            name={this.props.name}
            power={this.props.power}
            type={this.props.type}
            imgUrl={this.props.imgUrl}
            onTouchTap={this.handleTouchTap}
            label="Click me"
          />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
          >
            <Menu>
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Help &amp; feedback" />
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Sign out" />
            </Menu>
          </Popover>
        </div>
       </div>
     </div>
   )
 }

 propTypes: {
   name: React.propTypes.string.isRequired,
   power: React.propTypes.string.isRequired,
   type: React.propTypes.string.isRequired,
   imgUrl: React.propTypes.string.isRequired
 }
}
