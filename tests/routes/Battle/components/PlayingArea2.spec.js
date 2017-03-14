import React from 'react'
import { bindActionCreators } from 'redux'
import { PlayingArea2 } from 'routes/Battle/components/PlayingArea2'
import { shallow } from 'enzyme'

describe('(Component) PlayingArea2', () => {
  let _props, _wrapper

  beforeEach(() => {
    _wrapper = shallow(<PlayingArea2 {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

});
