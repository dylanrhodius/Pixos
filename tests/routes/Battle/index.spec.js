import BattleRoute from 'routes/Battle'

describe('(Route) Battle', () => {
  let _route

  beforeEach(() => {
    _route = BattleRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `battle`', () => {
    expect(_route.path).to.equal('battle')
  })
})
