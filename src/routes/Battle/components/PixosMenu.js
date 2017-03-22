import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { IndexLink } from 'react-router'

export default class PixosMenu extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
     open: false
   };

   this.handleTouchTap = this.handleTouchTap.bind(this)
   this.handleRequestClose = this.handleRequestClose.bind(this)
  }

  handleTouchTap (event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    })
  }

  handleRequestClose () {
    this.setState({
      open: false,
    })
  }

  render () {
    return (
      <div className="mb-2 full-width">
      <RaisedButton
        onTouchTap={this.handleTouchTap}
        label="Pixos"
        labelPosition="before"
        primary={true}
        fullWidth={true}
        labelStyle={{ margin: 'auto', padding: '0 3px 0 0' }}
        icon={<NavigationMenu style={{ margin: 'auto' }}/>}
      />
      <Popover
         open={this.state.open}
         anchorEl={this.state.anchorEl}
         anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
         targetOrigin={{horizontal: 'left', vertical: 'top'}}
         onRequestClose={this.handleRequestClose}
       >
         <Menu>
           <IndexLink to='/' activeClassName='route--active'>
             <MenuItem primaryText="Home" />
           </IndexLink>
         </Menu>
       </Popover>
      </div>
    )
  }
}
