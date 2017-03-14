import React from 'react'
import FacebookLogin from 'react-facebook-login'

const responseFacebook = (response) => {
  console.log(response);
}

export const SignInForm = () => (
  <div>
    <FacebookLogin
      appId={process.env.APP_ID}
      autoLoad={true}
      fields='name,email,picture'
      callback={responseFacebook} />,
    <button type='button'>Sign in with facebook!</button>
  </div>
)

export default SignInForm
