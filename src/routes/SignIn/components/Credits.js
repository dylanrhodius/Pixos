import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


export default class Credits extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton className="button-shadow" style={{ position: 'absolute', bottom: '25px', left: '50px' }} label="Credits" onTouchTap={this.handleOpen} />
        <Dialog
          title="Credits"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <div className='my-3'>Icons made by <a href="http://www.freepik.com" target="_blank" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" target="_blank" title="Flaticon">www.flaticon.com</a>, licensed by <a href="http://creativecommons.org/licenses/by/3.0/" target="_blank" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
          <p><strong className='mb-1'>Commander in Chief: </strong><a href="https://github.com/rkclark" target="_blank" >Rick Clark</a></p>
          <p><strong className='mb-1'>Chief Deployment Officer: </strong><a href="https://github.com/Holden4" target="_blank">Rob Holden</a></p>
          <p><strong className='mb-1'>Chief Good Vibes Officer: </strong><a href="https://github.com/dylanrhodius" target="_blank">Dylan Rhodius</a></p>
          <p><strong className='mb-1'>Chief Fruit and Logic Officer: </strong><a href="https://github.com/rossbenzie" target="_blank">Ross Benzie</a></p>
          <p><strong className='mb-1'>Chief Gwent and Chocolate Officer: </strong><a href="https://github.com/mikefieldmay" target="_blank">Mike Field-May</a></p>
          <p><strong className='mb-1'>Chief Deckbuilding Officer: </strong><a href="https://github.com/bvjones" target="_blank">Ben Vaughan-Jones</a></p>
        </Dialog>
      </div>
    );
  }
}
