import React from 'react'
import { bindActionCreators } from 'redux'
import { Hand } from 'routes/Battle/components/Hand'
import { shallow } from 'enzyme'

describe('(Component) Hand', () => {
  let _props, _wrapper

  beforeEach(() => {
    _wrapper = shallow(<Hand {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

});
