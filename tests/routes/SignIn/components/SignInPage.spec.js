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

  it('Renders matchmaking button', () => {
    const matchMake = _component.find('Link')
    expect(matchMake).to.exist
  })

  // describe('Matchmaking Button', ()=> {
  //   it('Redirects to /matchmaking', () => {
  //     const matchMake = _component.find('a')
  //     expect(matchMake.simulate('click', { button: 0 })).to.exist
  //   })
  // })

})
