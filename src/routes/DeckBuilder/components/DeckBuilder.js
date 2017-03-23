import React from 'react'
import DeckRow from './DeckRow'
import DeckBuilderInfoBar from './DeckBuilderInfoBar'
import './DeckBuilder.scss'
import CircularProgress from 'material-ui/CircularProgress';

document.title='Pixos';

export default class DeckBuilder extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      completedAPICall: false
    };
  }

    componentDidMount() {
      fetch(`${window.location.origin}/user/deck`, { credentials: "same-origin"})
        .then(res => {
          return res.json() })
            .then(json => {
              if (json.deck) {
                this.props.setInitialDeck(json.deck)
              }
              this.setState({ completedAPICall: true })
            });
    }

    loadContent() {
      if (this.state.completedAPICall) {
        return (
          <div className="row no-gutters max-page-height">
            <div className="max-page-height grey-bkgrnd deck-builder-info-bar col-1">
              { <DeckBuilderInfoBar playerDeck={this.props.playerDeck}/> }
            </div>
            <div className="deck-builder col-11 board-bkgrnd pt-3">
              { <DeckRow removeFromDeck={this.props.removeFromDeck} placeInDeck={this.props.placeInDeck} type={'land'} playerDeck={this.props.playerDeck} cards={this.props.playerDeck.land}/>}
              { <DeckRow removeFromDeck={this.props.removeFromDeck} placeInDeck={this.props.placeInDeck} type={'air'} playerDeck={this.props.playerDeck} cards={this.props.playerDeck.air}/>}
              { <DeckRow removeFromDeck={this.props.removeFromDeck} placeInDeck={this.props.placeInDeck} type={'water'} playerDeck={this.props.playerDeck} cards={this.props.playerDeck.water}/>}
            </div>
          </div>
        )
      } else {
        return (
          <div className="max-page-height board-bkgrnd d-flex align-items-center justify-content-center">
            <CircularProgress size={60} thickness={7} />
          </div>

         )
      }
    }

  render () {
    let content = this.loadContent()
    return (
      <div className="max-page-height">
        { content }
      </div>

    )
  }

  propTypes: {
    removeFromDeck : React.PropTypes.func.isRequired,
    placeInDeck : React.PropTypes.func.isRequired,
    setInitialDeck : React.PropTypes.func.isRequired,
    playerDeck : React.PropTypes.object.isRequired
  }
}
