import React from 'react'
import PixosMenu from 'routes/Battle/components/PixosMenu'
import './DeckBuilderInfoBar.scss'
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class DeckBuilderInfoBar extends React.Component {

  constructor (props) {
    super (props);

    this.saveDeck = this.saveDeck.bind(this)
  }

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleCloseAndSave = () => {
    this.setState({open: false});
    this.saveDeck()
  }

  saveDeck () {
    let deck = this.props.playerDeck.land.inDeck
                .concat(this.props.playerDeck.air.inDeck
                  .concat(this.props.playerDeck.water.inDeck))
    console.log('Deck is', deck)
    fetch(`${window.location.origin}/user/deck`, {
      credentials: "same-origin",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(deck)
    })
  }

  loadContent() {
      const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.handleClose}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          onClick={this.handleCloseAndSave}
        />,
        <FlatButton
          label="Ok"
          primary={true}
          onClick={this.handleClose}
        />
      ];
    if (this.props.playerDeck.cardsInDeck == this.props.playerDeck.deckSize)
    {
      return (
        <div>
          <RaisedButton onTouchTap={this.handleOpen} label="Save Deck" primary={true}/>
           <Dialog
            title="Are you sure you want save your deck?"
            actions={actions.splice(0,2)}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          />
        </div>
      )
    } else {
      return (
        <div>
          <RaisedButton onTouchTap={this.handleOpen} label="Save Deck" primary={true}/>
            <Dialog
             title="You must choose 25 cards!"
             actions={actions[2]}
             modal={false}
             open={this.state.open}
             onRequestClose={this.handleClose}
           />
        </div>
      )
    }
  }

  render () {
    let content = this.loadContent()
    return (
      <div className="inside">
        <PixosMenu/>
        <p className="info-card-cost px-1 circle align-middle justify-content-center mx-4">${ this.props.playerDeck.dinoDollars }</p>
        { content }
        <p className="card-in-deck justify-content-center align-middle mx-2">Cards in Deck - {this.props.playerDeck.cardsInDeck}</p>
      </div>
      )
  }

}

DeckBuilderInfoBar.propTypes = {
  playerDeck : React.PropTypes.object.isRequired
}
