import React from 'react'
import { bindActionCreators } from 'redux'
import { Board } from 'routes/Battle/components/Board'
import Hand from 'routes/Battle/components/Hand'
import { PlayingArea } from 'routes/Battle/components/PlayingArea'
import { shallow } from 'enzyme'
import { TEST_STATE } from './BattleStateHelper'

describe('(Component) Board', () => {
  let _props, _wrapper

  beforeEach(() => {
    _props = {
      battle: TEST_STATE
    }
    _wrapper = shallow(<Board {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should render two Hands.', () => {
    const hand = _wrapper.find(Hand);
    expect(hand).to.have.length(2);
  })

  it('Should render two PlayingAreas.', () => {
    const playingArea = _wrapper.find(PlayingArea);
    expect(playingArea).to.have.length(2);
  })

});
