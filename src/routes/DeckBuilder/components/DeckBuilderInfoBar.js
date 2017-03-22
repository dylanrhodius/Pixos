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
        <div className='full-width p-1 my-auto' style={{ overflow: 'hidden' }}>
          <RaisedButton onTouchTap={this.handleOpen}
                        label={<span>Save<br/>Deck</span>}
                        primary={true}
                        labelStyle={{ margin: 'auto', padding: '0' }}
                        buttonStyle={{ height: '47px' }}
                        style={{ height: '47px' }}/>
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
        <div className='full-width p-1 my-auto' style={{ overflow: 'hidden' }}>
          <RaisedButton onTouchTap={this.handleOpen}
                        label={<span>Save<br/>Deck</span>}
                        primary={true}
                        labelStyle={{ margin: 'auto', padding: '0' }}
                        buttonStyle={{ height: '47px' }}
                        style={{ height: '47px' }}/>
            <Dialog
             title="You must choose 20 cards!"
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
      <div className="max-page-height d-flex flex-column justify-content-center align-items-center">
        <div className="mb-auto full-width" style={{ width: '100%' }}>
          <PixosMenu />
        </div>

        <p className="info-card-cost px-1 circle circle-highlight">${ this.props.playerDeck.dinoDollars }</p>
        { content }
        <span className="card-in-deck px-1 deck-buidler-info-bar-text mb-1">In Deck </span>
        <span className="circle circle-highlight material-bkgrnd mb-auto deck-indicator">{this.props.playerDeck.cardsInDeck}</span>

      </div>
      )
  }

}

DeckBuilderInfoBar.propTypes = {
  playerDeck : React.PropTypes.object.isRequired
}
