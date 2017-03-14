import React from 'react'
import { bindActionCreators } from 'redux'
import { PlayingArea1 } from 'routes/Battle/components/PlayingArea1'
import { shallow } from 'enzyme'

describe('(Component) PlayingArea1', () => {
  let _props, _wrapper

  beforeEach(() => {
    _wrapper = shallow(<PlayingArea1 {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

});
