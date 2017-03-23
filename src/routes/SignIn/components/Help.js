import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


export default class Help extends React.Component {
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
        <RaisedButton className="button-shadow" label="Learn The Rules!" onTouchTap={this.handleOpen} style={{ position: 'absolute', bottom: '25px', left: '150px' }} />
        <Dialog
          title="The Rules"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <p className="mt-2"><em>Pixos</em> is a 2-player card game that pits two teams of creatures against each other in the field of battle.</p>
          <p>Each player takes turns placing one card on the field at a time. At the end of each round, the player with the highest total power wins and his score increases by 1.
            The winner is the person with the highest score after 3 rounds.</p>
          <h4 className="help-header">Setup</h4>
          <p>To play, each player must pick a deck consisting of 20 creatures. Each creature has a Pixo Dollar cost and your deck cost must be below $225. You can have up to 3 of each creature in your deck.</p>
          <p>The creature's power is shown in the bottom left of the card and it’s cost is shown at the top right.</p>
          <p>Each creature has a field position represented by the creature’s type. Green cards are land, purple cards are air, and blue cards are water.</p>
          <p>Some cards have powerful special abilities:</p>
          <ul>
            <li>Meteor: Sets the power of all cards of the same type to 1 for both players, i.e. a land creature with meteor ability will affect all other land creatures on the board</li>
            <li>Resurrector: Add two random cards from your discard pile back into your hand</li>
            <li>Paragon: Doubles the strength of all cards of the same type for the player, i.e. a land creature with paragon ability will affect all other land creatures on the board, but only for the player who owns it</li>
          </ul>
          <p>Special abilities are represented by an icon in the bottom right of the card.
            Hover over a card to read it’s description or special ability.</p>
          <p>Once a deck is selected you have the option to login with facebook or proceed directly to matchmaking.</p>
          <h4 className="help-header">Start</h4>
          <p>When matchmaking has completed a player will be selected to take a turn.
          On the left of the field information about the current state of the game is displayed.
          Your hand is shown at the bottom of the screen and your enemy’s is shown at the top. </p>
          <p>A player’s hand consists of 10 randomly chosen cards from their deck. These 10 cards will be the player’s hand for the rest of the game. </p>
          <h4 className="help-header">Rounds</h4>
          <p>Players take turns playing one card at a time. Players may pass if they wish to. Passing means sitting out an entire round, and the other player is free to keep playing cards from their hand, one at a time, until they choose to pass.</p>
          <h4 className="help-header">Resolution</h4>
          <p>When both players have passed. The player with the highest total power increases his score by 1 and then the field is reset. If the result is a draw neither player’s score increases.</p>
          <p>The game ends after 3 rounds and the player with the highest score is declared the winner!</p>
</Dialog>
      </div>
    );
  }
}
