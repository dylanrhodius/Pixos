import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import SignInForm from './SignInForm.jsx'
import { Link } from 'react-router'
import { IndexLink } from 'react-router'
import Header from '../../../components/Header'

export default class SignInPage extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <h2>Sign In!</h2>
        {<SignInForm />}

        <Link to={`/battle`} ><RaisedButton label="Start Matchmaking" primary={true} linkButton={true}/></Link>
        <br />
        <br/>

      </div>
    );
  }
}
