import React from 'react'

export const SignInForm = () => (
  <div>
    <a href='/auth/facebook' method='post'>Facebook Sign In</a>
    <a>Hi {window.user}</a>
  </div>
)

export default SignInForm
