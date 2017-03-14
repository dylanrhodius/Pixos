import React from 'react'
import { bindActionCreators } from 'redux'
import { Card } from 'routes/Battle/components/Card'
import { shallow } from 'enzyme'

describe('(Component) Card', () => {
  let _props, _wrapper

  beforeEach(() => {
    _wrapper = shallow(<Card {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

});
