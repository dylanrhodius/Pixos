import React from 'react'
import { bindActionCreators } from 'redux'
import { Hand1 } from 'routes/Battle/components/Hand1'
import { shallow } from 'enzyme'

describe('(Component) Hand1', () => {
  let _props, _wrapper

  beforeEach(() => {
    _wrapper = shallow(<Hand1 {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

});
