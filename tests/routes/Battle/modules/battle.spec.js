import {
  SETUP_PLAYERS,
  SET_NEXT_PLAYER,
  SET_PLAYER_PASS,
  PLAY_CARD,
  SET_TURN_FINISHED,
  SET_MY_TURN,
  UPDATE_ENEMY_STATE,
  PASS_TURN,
  REMOVE_CARD,
  UPDATE_POWER,
  ADD_CARD,
  SET_ROUND_NOTIFICATION,
  RESURRECT_CARDS,
  APPLY_METEOR_EFFECT,
  APPLY_PARAGON_EFFECT,
  SET_PLAYER_NOTIFICATION,
  INCREMENT_ROUND_COUNTER,
  INCREMENT_SELF_SCORE,
  applyParagonEffect,
  setRoundNotification,
  incrementSelfScore,
  incrementRoundCounter,
  setPlayerNotification,
  addCard,
  passTurn,
  updateEnemyState,
  setMyTurn,
  setTurnFinished,
  setupPlayers,
  removeCard,
  updatePower,
  updateScore,
  clearPlayingArea,
  updateRoundCounter,
  resurrectCards,
  applyMeteorEffect,
  setReadyForNewRound,
  default as battleReducer
} from 'routes/Battle/modules/battle'

import {
  INITIAL_STATE
} from 'routes/Battle/modules/initialBattleState'

describe('(Redux Module) Battle', () => {
  it('Should export a full set of constants.', () => {
    expect(SETUP_PLAYERS).to.equal('SETUP_PLAYERS')
    expect(SET_NEXT_PLAYER).to.equal('SET_NEXT_PLAYER')
    expect(SET_PLAYER_PASS).to.equal('SET_PLAYER_PASS')
    expect(PLAY_CARD).to.equal('PLAY_CARD')
    expect(SET_TURN_FINISHED).to.equal('SET_TURN_FINISHED')
    expect(SET_MY_TURN).to.equal('SET_MY_TURN')
    expect(UPDATE_ENEMY_STATE).to.equal('UPDATE_ENEMY_STATE')
    expect(PASS_TURN).to.equal('PASS_TURN')
    expect(REMOVE_CARD).to.equal('REMOVE_CARD')
    expect(ADD_CARD).to.equal('ADD_CARD')
    expect(UPDATE_POWER).to.equal('UPDATE_POWER'),
    expect(UPDATE_SCORE).to.equal('UPDATE_SCORE'),
    expect(CLEAR_PLAYING_AREA).to.equal('CLEAR_PLAYING_AREA'),
    expect(SET_ROUND_NOTIFICATION).to.equal('SET_ROUND_NOTIFICATION')
    expect(UPDATE_ROUND_COUNTER).to.equal('UPDATE_ROUND_COUNTER')
    expect(SET_ROUND_NOTIFICATION).to.equal('SET_ROUND_NOTIFICATION')
    expect(RESURRECT_CARDS).to.equal('RESURRECT_CARDS')
    expect(APPLY_METEOR_EFFECT).to.equal('APPLY_METEOR_EFFECT')
    expect(APPLY_PARAGON_EFFECT).to.equal('APPLY_PARAGON_EFFECT')
    expect(SET_PLAYER_NOTIFICATION).to.equal('SET_PLAYER_NOTIFICATION')
    expect(SET_READY_FOR_NEW_ROUND).to.equal('SET_READY_FOR_NEW_ROUND')
    expect(INCREMENT_ROUND_COUNTER).to.equal('INCREMENT_ROUND_COUNTER')
    expect(SET_PLAYER_NOTIFICATION).to.equal('SET_PLAYER_NOTIFICATION')
    expect(INCREMENT_ROUND_COUNTER).to.equal('INCREMENT_ROUND_COUNTER')
    expect(INCREMENT_SELF_SCORE).to.equal('INCREMENT_SELF_SCORE')

  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(battleReducer).to.be.a('function')
    })

    it('Should initialize with a blank game state.', () => {
      expect(battleReducer(undefined, {})).to.equal(INITIAL_STATE)
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = battleReducer(undefined, {})
      expect(state).to.equal(INITIAL_STATE)
      state = battleReducer(state, { type: '@@@@@@@' })
      expect(state).to.equal(INITIAL_STATE)
    })
  })

  describe('(Action Creator) setupPlayers', () => {
    it('Should be exported as a function.', () => {
      expect(setupPlayers).to.be.a('function')
    })

    it('Should return an action with type "SETUP_PLAYERS".', () => {
      expect(setupPlayers()).to.have.property('type', SETUP_PLAYERS)
    })
  })

  describe('(Action Creator) incrementRoundCounter', () => {
    it('Should be exported as a function.', () => {
      expect(incrementRoundCounter).to.be.a('function')
    })

    it('Should return an action with type "INCREMENT_ROUND_COUNTER".', () => {
      expect(incrementRoundCounter()).to.have.property('type', SETUP_PLAYERS)
    })
  })

  describe('(Action Creator) addCard', () => {
    it('Should be exported as a function.', () => {
      expect(addCard).to.be.a('function')
    })

    it('Should return an action with type "ADD_CARD".', () => {
      expect(addCard()).to.have.property('type', ADD_CARD)
    })
  })

  describe('(Action Creator) applyParagonEffect', () => {
    it('Should be exported as a function.', () => {
      expect(applyParagonEffect).to.be.a('function')
    })

    it('Should return an action with type "APPLY_PARAGON_EFFECT".', () => {
      expect(applyParagonEffect()).to.have.property('type', APPLY_PARAGON_EFFECT)
    })
  })

  describe('(Action Creator) passTurn', () => {
    it('Should be exported as a function.', () => {
      expect(passTurn).to.be.a('function')
    })

    it('Should return an action with type "PASS_TURN".', () => {
      expect(passTurn()).to.have.property('type', PASS_TURN)
    })
  })

  describe('(Action Creator) removeCard', () => {
    it('Should be exported as a function.', () => {
      expect(removeCard).to.be.a('function')
    })

    it('Should return an action with type "REMOVE_CARD".', () => {
      expect(removeCard()).to.have.property('type', REMOVE_CARD)
    })
  })

  describe('(Action Creator) setPlayerNotification', () => {
    it('Should be exported as a function.', () => {
      expect(setPlayerNotification).to.be.a('function')
    })

    it('Should return an action with type "SET_PLAYER_NOTIFICATION".', () => {
      expect(setPlayerNotification()).to.have.property('type', SET_PLAYER_NOTIFICATION)
    })
  })

  describe('(Action Creator) updatePower', () => {
    it('Should be exported as a function.', () => {
      expect(updatePower).to.be.a('function')
    })

    it('Should return an action with type "UPDATE_POWER".', () => {
      expect(updatePower()).to.have.property('type', UPDATE_POWER)
    })
  })

  describe('(Action Creator) setTurnFinished', () => {
    it('Should be exported as a function.', () => {
      expect(setTurnFinished).to.be.a('function')
    })

    it('Should return an action with type "SET_TURN_FINISHED".', () => {
      expect(setTurnFinished()).to.have.property('type', SET_TURN_FINISHED)
    })
  })

  describe('(Action Creator) setMyTurn', () => {
    it('Should be exported as a function.', () => {
      expect(setMyTurn).to.be.a('function')
    })

    it('Should return an action with type "SET_TURN_FINISHED".', () => {
      expect(setMyTurn()).to.have.property('type', SET_MY_TURN)
    })
  })

  describe('(Action Creator) updateEnemyState', () => {
    it('Should be exported as a function.', () => {
      expect(updateEnemyState).to.be.a('function')
    })

    it('Should return an action with type "SET_TURN_FINISHED".', () => {
      expect(updateEnemyState()).to.have.property('type', UPDATE_ENEMY_STATE)
    })
  })

  describe('(Action Creator) updateScore', () => {
    it('Should be exported as a function.', () => {
      expect(updateScore).to.be.a('function')
    })

    it('Should return an action with type "UPDATE_SCORE".', () => {
      expect(updateScore()).to.have.property('type', UPDATE_SCORE)
    })
  })

  describe('(Action Creator) clearPlayingArea', () => {
    it('Should be exported as a function.', () => {
      expect(clearPlayingArea).to.be.a('function')
    })

    it('Should return an action with type "CLEAR_PLAYING_AREA".', () => {
      expect(clearPlayingArea()).to.have.property('type', CLEAR_PLAYING_AREA)
    })
  })

  describe('(Action Creator) setPlayerNotification', () => {
    it('Should be exported as a function.', () => {
      expect(setPlayerNotification).to.be.a('function')
    })

    it('Should return an action with type "SET_PLAYER_NOTIFICATION".', () => {
      expect(setPlayerNotification()).to.have.property('type', SET_PLAYER_NOTIFICATION)
    })
  })

  describe('(Action Creator) setReadyForNewRound', () => {
    it('Should be exported as a function.', () => {
      expect(setReadyForNewRound).to.be.a('function')
    })

    it('Should return an action with type "SET_READY_FOR_NEW_ROUND".', () => {
      expect(setReadyForNewRound()).to.have.property('type', SET_READY_FOR_NEW_ROUND)
    })
  })
  describe('(Action Creator) incrementSelfScore', () => {
    it('Should be exported as a function.', () => {
      expect(incrementSelfScore).to.be.a('function')
    })

    it('Should return an action with type "INCREMENT_SELF_SCORE".', () => {
      expect(incrementSelfScore()).to.have.property('type', INCREMENT_SELF_SCORE)
    })
  })
  describe('(Action Creator) incrementRoundCounter', () => {
    it('Should be exported as a function.', () => {
      expect(incrementRoundCounter).to.be.a('function')
    })

    it('Should return an action with type "INCREMENT_ROUND_COUNTER".', () => {
      expect(incrementRoundCounter()).to.have.property('type', INCREMENT_ROUND_COUNTER)
    })
  })

  describe('(Action Creator) resurrectCards', () => {
    it('Should be exported as a function.', () => {
      expect(resurrectCards).to.be.a('function')
    })

    it('Should return an action with type "RESURRECT_CARDS".', () => {
      expect(resurrectCards()).to.have.property('type', RESURRECT_CARDS)
    })
  })

  describe('(Action Creator) applyMeteorEffect', () => {
    it('Should be exported as a function.', () => {
      expect(applyMeteorEffect).to.be.a('function')
    })

    it('Should return an action with type "APPLY_METEOR_EFFECT".', () => {
      expect(applyMeteorEffect()).to.have.property('type', APPLY_METEOR_EFFECT)
    })
  })
