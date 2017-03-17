import DeckBuilderRoute from 'routes/DeckBuilder'

describe('(Route) DeckBuilder', () => {
  let _route

  beforeEach(() => {
    _route = DeckBuilderRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `deckbuilder`', () => {
    expect(_route.path).to.equal('deckbuilder')
  })
})
