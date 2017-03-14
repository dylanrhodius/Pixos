import React from 'react'
import { bindActionCreators } from 'redux'
import { Board } from 'routes/Battle/components/Board'
import { Hand1 } from 'routes/Battle/components/Hand1'
import { Hand2 } from 'routes/Battle/components/Hand2'
import { PlayingArea1 } from 'routes/Battle/components/PlayingArea1'
import { PlayingArea2 } from 'routes/Battle/components/PlayingArea2'
import { shallow } from 'enzyme'

describe('(Component) Board', () => {
  let _props, _wrapper

  beforeEach(() => {
    _wrapper = shallow(<Board {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should render Hand1.', () => {
    const hand = _wrapper.find(Hand1);
    expect(hand).to.exist;
  })

  it('Should render Hand2.', () => {
    const hand = _wrapper.find(Hand2);
    expect(hand).to.exist;
  })

  it('Should render PlayingArea1.', () => {
    const playingArea = _wrapper.find(PlayingArea1);
    expect(playingArea).to.exist;
  })

  it('Should render PlayingArea2.', () => {
    const playingArea = _wrapper.find(PlayingArea2);
    expect(playingArea).to.exist;
  })

});
