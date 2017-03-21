import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


export default class Notification extends React.Component {
  state = {
    open: true,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
    window.location = '/'
  };

  render() {
    const actions = [
      <FlatButton
        label="Back to Home"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Game Over!"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          {this.props.text}
        </Dialog>
      </div>
    );
  }
}
