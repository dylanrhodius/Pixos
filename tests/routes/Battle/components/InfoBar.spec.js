import React from 'react'
import { bindActionCreators } from 'redux'
import InfoBar from 'routes/Battle/components/InfoBar'
import { shallow } from 'enzyme'

describe('(Component) InfoBar', () => {
  let _props, _wrapper

  beforeEach(() => {
    _wrapper = shallow(<InfoBar {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

});
