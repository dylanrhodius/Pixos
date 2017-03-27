import React from 'react'
import { SignInForm } from 'routes/SignIn/components/SignInForm.js'
import { shallow } from 'enzyme'

describe('(View) SignInForm', () => {
  let _component

  beforeEach(() => {
    _component = shallow(<SignInForm />)
  })

  it('Renders button', () => {
    const link = _component.find('a')
    expect(link).to.exist
  })
})
