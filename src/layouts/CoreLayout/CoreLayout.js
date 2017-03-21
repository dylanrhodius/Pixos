import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './CoreLayout.scss'
import '../../styles/core.scss'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export const CoreLayout = ({ children }) => (
  <MuiThemeProvider>
    <div className='core-container container-fluid text-center p-0'>
      <div className='core-layout__viewport max-page-height'>
        {children}
      </div>
    </div>
  </MuiThemeProvider>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
