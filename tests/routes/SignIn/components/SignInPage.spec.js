import React from 'react'
import SignInPage from 'routes/SignIn/components/SignInPage.js'
import { shallow } from 'enzyme'
import CircularProgress from 'material-ui/CircularProgress';

describe('(View) SignInPage', () => {
  let _component

  beforeEach(() => {
    _component = shallow(<SignInPage />)
  })

  it('Should render a circular progress indicator', () => {
    expect(_component.contains(<CircularProgress size={60} thickness={7} />)).to.equal(true);
  })

})
