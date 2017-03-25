import React from 'react'
import { bindActionCreators } from 'redux'
import Battle from 'routes/Battle/components/Battle'
import InfoBar from 'routes/Battle/components/InfoBar'
import Board from 'routes/Battle/components/Board'
import CircularProgress from 'material-ui/CircularProgress'
import { shallow, mount, render } from 'enzyme'
import { TEST_STATE } from './BattleStateHelper'

describe('(Component) Battle', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      battle: TEST_STATE,
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

  it('Should render a matchmaking header', () => {
    let header = _wrapper.find('h2')
    expect(header.text()).to.match(/Matchmaking/)
  })

  it('Should render a circular progress indicator', () => {
    expect(_wrapper.contains(<CircularProgress className='mb-4' size={60} thickness={7} />)).to.equal(true);
  })

})
