import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Card from './Card'


export default class DiscardPile extends React.Component {
  state = {
    open: false,
  };

  loadCards() {
    return this.props.cards.map(
      (card, i) => {
        return (
          <Card key={i} showPointer={false} {...card }
                id={i} />
        )
      }
    )

  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];
    let cards = this.loadCards()
    return (
      <div className='full-width p-1 my-auto'>
        <RaisedButton fullWidth={true} label="Discards" labelStyle={{ margin: 'auto', padding: '0' }} onTouchTap={this.handleOpen} />
        <Dialog
          title="Discards"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div className={`d-flex flex-wrap justify-content-center px-2 py-2`}>
            { cards }
          </div>
        </Dialog>
      </div>
    );
  }
}
