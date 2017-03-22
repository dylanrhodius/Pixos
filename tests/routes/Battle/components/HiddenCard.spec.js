import React from 'react'
import { bindActionCreators } from 'redux'
import { HiddenCard } from 'routes/Battle/components/HiddenCard'
import { shallow } from 'enzyme'

xdescribe('(Component) HiddenCard', () => {
  let _props, _wrapper

  beforeEach(() => {
    _wrapper = shallow(<HiddenCard {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

});
