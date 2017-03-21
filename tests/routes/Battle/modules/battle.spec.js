import {
  BATTLE_INCREMENT,
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
  INCREMENT_ENEMY_SCORE,
  INCREMENT_ROUND_COUNTER,
  INCREMENT_SELF_SCORE,
  incrementSelfScore,
  incrementEnemyScore,
  incrementRoundCounter,
  setRoundNotification,
  addCard,
  passTurn,
  updateEnemyState,
  setMyTurn,
  setTurnFinished,
  setupPlayers,
  increment,
  doubleAsync,
  removeCard,
  updatePower,
  updateScore,
  clearPlayingArea,
  setRoundNotification,
  setReadyForNewRound,
  incrementRoundCounter
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
    expect(SET_READY_FOR_NEW_ROUND).to.equal('SET_READY_FOR_NEW_ROUND')
    expect(INCREMENT_ROUND_COUNTER).to.equal('INCREMENT_ROUND_COUNTER')
    expect(SET_ROUND_NOTIFICATION).to.equal('SET_ROUND_NOTIFICATION')
    expect(INCREMENT_ENEMY_SCORE).to.equal('INCREMENT_ENEMY_SCORE')
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

  describe('(Action Creator) setRoundNotification', () => {
    it('Should be exported as a function.', () => {
      expect(setRoundNotification).to.be.a('function')
    })

    it('Should return an action with type "SET_ROUND_NOTIFICATION".', () => {
      expect(setRoundNotification()).to.have.property('type', SET_ROUND_NOTIFICATION)
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

  describe('(Action Creator) setRoundNotification', () => {
    it('Should be exported as a function.', () => {
      expect(setRoundNotification).to.be.a('function')
    })

    it('Should return an action with type "SET_ROUND_NOTIFICATION".', () => {
      expect(setRoundNotification()).to.have.property('type', SET_ROUND_NOTIFICATION)
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
  describe('(Action Creator) incrementEnemyScore', () => {
    it('Should be exported as a function.', () => {
      expect(incrementEnemyScore).to.be.a('function')
    })

    it('Should return an action with type "INCREMENT_ENEMY_SCORE".', () => {
      expect(incrementEnemyScore()).to.have.property('type', INCREMENT_ENEMY_SCORE)
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

  xdescribe('(Action Creator) increment', () => {
    it('Should be exported as a function.', () => {
      expect(increment).to.be.a('function')
    })

    it('Should return an action with type "BATTLE_INCREMENT".', () => {
      expect(increment()).to.have.property('type', BATTLE_INCREMENT)
    })

    it('Should assign the first argument to the "payload" property.', () => {
      expect(increment(5)).to.have.property('payload', 5)
    })

    it('Should default the "payload" property to 1 if not provided.', () => {
      expect(increment()).to.have.property('payload', 1)
    })
  })

  xdescribe('(Action Creator) doubleAsync', () => {
    let _globalState
    let _dispatchSpy
    let _getStateSpy

    beforeEach(() => {
      _globalState = {
        battle : battleReducer(undefined, {})
      }
      _dispatchSpy = sinon.spy((action) => {
        _globalState = {
          ..._globalState,
          battle : battleReducer(_globalState.battle, action)
        }
      })
      _getStateSpy = sinon.spy(() => {
        return _globalState
      })
    })

    it('Should be exported as a function.', () => {
      expect(doubleAsync).to.be.a('function')
    })

    it('Should return a function (is a thunk).', () => {
      expect(doubleAsync()).to.be.a('function')
    })

    it('Should return a promise from that thunk that gets fulfilled.', () => {
      return doubleAsync()(_dispatchSpy, _getStateSpy).should.eventually.be.fulfilled
    })

    it('Should call dispatch and getState exactly once.', () => {
      return doubleAsync()(_dispatchSpy, _getStateSpy)
        .then(() => {
          _dispatchSpy.should.have.been.calledOnce
          _getStateSpy.should.have.been.calledOnce
        })
    })

    it('Should produce a state that is double the previous state.', () => {
      _globalState = { battle: 2 }

      return doubleAsync()(_dispatchSpy, _getStateSpy)
        .then(() => {
          _dispatchSpy.should.have.been.calledOnce
          _getStateSpy.should.have.been.calledOnce
          expect(_globalState.battle).to.equal(4)
          return doubleAsync()(_dispatchSpy, _getStateSpy)
        })
        .then(() => {
          _dispatchSpy.should.have.been.calledTwice
          _getStateSpy.should.have.been.calledTwice
          expect(_globalState.battle).to.equal(8)
        })
    })
  })

  // NOTE: if you have a more complex state, you will probably want to verify
  // that you did not mutate the state. In this case our state is just a number
  // (which cannot be mutated).
  xdescribe('(Action Handler) BATTLE_INCREMENT', () => {
