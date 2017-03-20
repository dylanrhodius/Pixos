import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import SignInForm from './SignInForm.jsx'
import { Link } from 'react-router'
import Header from '../../../components/Header'
import './SignInPage.scss'

export default class SignInPage extends React.Component {

  render() {
    return (
      <div className="sign-in-background">
        <Header />
        {<SignInForm />}
        <br/>
        <Link to={`/battle`} ><RaisedButton label="Start Matchmaking" primary={true}/></Link>
        <br/>
        <br/>
        <Link to={`/deckbuilder`} ><RaisedButton label="Deck Builder" primary={true}/></Link>

      </div>
    );
  }
}
