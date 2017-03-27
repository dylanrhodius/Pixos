import React from 'react'
import { bindActionCreators } from 'redux'
import BattleRow from 'routes/Battle/components/BattleRow'
import { shallow } from 'enzyme'

describe('(Component) BattleRow', () => {
  let _props, _wrapper

  _props = { cards: ['card'], type: 'land', passed: false }

  beforeEach(() => {
    _wrapper = shallow(<BattleRow {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

});
