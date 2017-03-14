import React from 'react'
import { bindActionCreators } from 'redux'
import { Hand2 } from 'routes/Battle/components/Hand2'
import { shallow } from 'enzyme'

describe('(Component) Hand2', () => {
  let _props, _wrapper

  beforeEach(() => {
    _wrapper = shallow(<Hand2 {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

});
