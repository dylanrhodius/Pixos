import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'matchmaking',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const MatchMaking = require('./containers/MatchMakingContainer').default
      const reducer = require('./modules/matchmaking').default

      /*  Add the reducer to the store on key 'battle'  */
      injectReducer(store, { key: 'matchmaking', reducer })

      /*  Return getComponent   */
      cb(null, MatchMaking)

    /* Webpack named bundle   */
  }, 'matchmaking')
  }
})
