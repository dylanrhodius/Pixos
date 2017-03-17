import React from 'react'
import Header from '../../components/Header'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './CoreLayout.scss'
import '../../styles/core.scss'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export const CoreLayout = ({ children }) => (
  <MuiThemeProvider>
    <div className='container-fluid text-center'>
      <Header />
      <div className='core-layout__viewport'>
        {children}
      </div>
    </div>
  </MuiThemeProvider>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
