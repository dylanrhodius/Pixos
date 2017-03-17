import React from 'react'
import { bindActionCreators } from 'redux'
import InfoBar from 'routes/Battle/components/InfoBar'
import { shallow } from 'enzyme'
import { TEST_STATE } from './BattleStateHelper'


describe('(Component) InfoBar', () => {
  let _props, _wrapper

  beforeEach(() => {
    _props = {
      battle: TEST_STATE
    }
    _wrapper = shallow(<InfoBar {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

});
