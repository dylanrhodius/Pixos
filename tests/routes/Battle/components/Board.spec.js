import React from 'react'
import { bindActionCreators } from 'redux'
import { Board } from 'routes/Battle/components/Board'
import { shallow } from 'enzyme'

describe('(Component) Board', () => {
  let _props, _wrapper

  beforeEach(() => {
    _wrapper = shallow(<Board {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

});
