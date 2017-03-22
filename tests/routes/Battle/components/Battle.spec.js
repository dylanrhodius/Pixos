import React from 'react'
import { bindActionCreators } from 'redux'
import Battle from 'routes/Battle/components/Battle'
import { InfoBar } from 'routes/Battle/components/InfoBar'
import { Board } from 'routes/Battle/components/Board'
import { shallow, mount, render } from 'enzyme'
import { TEST_STATE } from './BattleStateHelper'

describe('(Component) Battle', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      battle: TEST_STATE
      ...bindActionCreators({
        doubleAsync : (_spies.doubleAsync = sinon.spy()),
        increment   : (_spies.increment = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<Battle {..._props} />)
  })
  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })
  it('Should render an InfoBar.', () => {
    const infobar = _wrapper.find(InfoBar);
    expect(infobar).to.exist;
  })
  it('Should render a Board.', () => {
    const board = _wrapper.find(Board);
    expect(board).to.exist;
  })
})
