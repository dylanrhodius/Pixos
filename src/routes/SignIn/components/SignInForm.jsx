import React from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';

export const SignInForm = () => (
  <div>
    <a className='FacebookLogin' href='/auth/facebook' method='post'><RaisedButton label="Facebook Sign In" primary={true}/></a>
  </div>
)

export default SignInForm
