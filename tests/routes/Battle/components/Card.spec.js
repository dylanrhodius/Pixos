import React from 'react'
import { bindActionCreators } from 'redux'
import Card from 'routes/Battle/components/Card'
import { shallow } from 'enzyme'

describe('(Component) Card', () => {
  let _props, _wrapper
  _props = { _id: 1, name: 'hummingbird', imgUrl: '/img/hummingbird.svg', type: 'air', power: 1, cost: 10, special: 'meteor', description: 'Meteor: Sets the power of all Air type cards to 1 for both players.' , doubled: false, meteored: false  },


  beforeEach(() => {
    _wrapper = shallow(<Card {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

});
