import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'battle',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Battle = require('./containers/BattleContainer').default
      const reducer = require('./modules/battle').default

      /*  Add the reducer to the store on key 'battle'  */
      injectReducer(store, { key: 'battle', reducer })

      /*  Return getComponent   */
      cb(null, Battle)

    /* Webpack named bundle   */
    }, 'battle')
  }
})
