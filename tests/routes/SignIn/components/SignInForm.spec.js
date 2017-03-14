import React from 'react'
import { SignInForm } from 'routes/SignIn/components/SignInForm.jsx'
import { render } from 'enzyme'

describe('(View) SignInForm', () => {
  let _component

  beforeEach(() => {
    _component = render(<SignInForm />)
  })

  it('Renders button', () => {
    const button = _component.find('btn')
    expect(button).to.exist
    expect(button.text()).to.match(/Sign in with facebook!/)
  })

})
