import React from 'react'
import { SignInForm } from 'routes/SignIn/components/SignInForm.jsx'
import FacebookLogin from 'react-facebook-login'
import { shallow } from 'enzyme'

describe('(View) SignInForm', () => {
  let _component

  beforeEach(() => {
    _component = shallow(<SignInForm />)
  })

  it('Renders button', () => {
    const button = _component.find(FacebookLogin)
    expect(button).to.exist
  })
})
