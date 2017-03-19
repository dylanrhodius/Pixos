import React from 'react'
import ChosenCards from './ChosenCards'
import DeckRow from './DeckRow'

export default class DeckBuilder extends React.Component {

  render () {
    return (
      <div>
        <h2>DeckBuilder</h2>
        { <DeckRow type={'land'} cards={this.props.land}/>}
        { <DeckRow type={'air'} cards={this.props.air}/>}
        { <DeckRow type={'water'} cards={this.props.water}/>}
        <div className="chosen-cards container d-flex justify-content-center flex-wrap py-5">
          < ChosenCards />
        </div>
      </div>
    )
  }

  propTypes: {
    type  : React.PropTypes.string.isRequired,
    cardArrays  : React.PropTypes.object.isRequired
  }
}
