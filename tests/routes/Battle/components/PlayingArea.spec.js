import React from 'react'
import { bindActionCreators } from 'redux'
import { PlayingArea } from 'routes/Battle/components/PlayingArea'
import { shallow } from 'enzyme'

describe('(Component) PlayingArea', () => {
  let _props, _wrapper

  beforeEach(() => {
    _wrapper = shallow(<PlayingArea {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

});
