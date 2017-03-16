import React from 'react'
import SignInPage from 'routes/SignIn/components/SignInPage.jsx'
import { shallow } from 'enzyme'


describe('(View) SignInPage', () => {
  let _component

  beforeEach(() => {
    _component = shallow(<SignInPage />)
  })

  it('Renders sign in message', () => {
    const signIn = _component.find('h2')
    expect(signIn).to.exist
    expect(signIn.text()).to.match(/Sign In!/)
  })

  it('Renders matchmaking link', () => {
    const matchMake = _component.find('Link')
    expect(matchMake).to.exist
  })

})
