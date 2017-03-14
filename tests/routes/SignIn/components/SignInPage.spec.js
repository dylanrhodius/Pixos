import React from 'react'
import { SignInPage } from 'routes/SignIn/components/SignInPage.jsx'
import { render } from 'enzyme'

describe('(View) SignInPage', () => {
  let _component

  beforeEach(() => {
    _component = render(<SignInPage />)
  })

  it('Renders sign in message', () => {
    const signIn = _component.find('h1')
    expect(signIn).to.exist
    expect(signIn.text()).to.match(/Sign In!/)
  })

})
