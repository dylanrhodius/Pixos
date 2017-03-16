import React from 'react'
import MatchMaking from 'routes/MatchMaking/components/MatchMaking'
import { shallow } from 'enzyme'


describe('(View) MatchMaking', () => {
  let _component

  beforeEach(() => {
    _component = shallow(<MatchMaking />)
  })

  it('Renders matchmaking message', () => {
    const matchmaking = _component.find('h2')
    expect(matchmaking).to.exist
    expect(matchmaking.text()).to.match(/Matchmaking/)
  })

  it('Renders loading icon', () => {
    const icon = _component.find('img')
    expect(icon).to.exist
  })

})
