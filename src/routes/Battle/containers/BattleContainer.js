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
          updateHasRoundFinished,
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
          setGameEnded
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
  updateHasRoundFinished,
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
  setGameEnded
}

const mapStateToProps = (state) => ({
  battle : state.battle
})

export default connect(mapStateToProps, mapDispatchToProps)(Battle)
