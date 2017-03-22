import { connect } from 'react-redux'
import {  setupPlayers,
          setTurnFinished,
          setMyTurn,
          updateEnemyState,
          passTurn,
          removeCard,
          addCard,
          updatePower,
          clearPlayingArea,
          updateRoundCounter,
          setRoundNotification,
          resurrectCards,
          applyMeteorEffect,
          applyParagonEffect,
          setReadyForNewRound,
          incrementRoundCounter,
          setPlayerNotification,
          incrementSelfScore,
          clearPlayerNotification,
          setGameEnded,
          setOpponentDisconnected
} from '../modules/battle'

import Battle from '../components/Battle'

const mapDispatchToProps = {
  setupPlayers,
  setTurnFinished,
  setMyTurn,
  updateEnemyState,
  passTurn,
  removeCard,
  addCard,
  updatePower,
  clearPlayingArea,
  updateRoundCounter,
  setRoundNotification,
  resurrectCards,
  applyMeteorEffect,
  applyParagonEffect,
  setReadyForNewRound,
  incrementRoundCounter,
  setPlayerNotification,
  incrementSelfScore,
  clearPlayerNotification,
  setGameEnded,
  setOpponentDisconnected
}

const mapStateToProps = (state) => ({
  battle : state.battle
})

export default connect(mapStateToProps, mapDispatchToProps)(Battle)
