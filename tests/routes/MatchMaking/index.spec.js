import MatchMakingRoute from 'routes/MatchMaking'

describe('(Route) MatchMaking', () => {
  let _route

  beforeEach(() => {
    _route = MatchMakingRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `matchmaking`', () => {
    expect(_route.path).to.equal('matchmaking')
  })
})
