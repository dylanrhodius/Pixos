import React from 'react'
import SignInForm from './SignInForm.jsx'
import { Link } from 'react-router'

export default class SignInPage extends React.Component {

  render() {
    return (
      <div>
        <h2>Sign In!</h2>
        {<SignInForm />}
        <Link to={`/battle`} >Start Matchmaking</Link>
      </div>
    );
  }
}
