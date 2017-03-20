import React from 'react'
import SignInForm from './SignInForm.jsx'
import { Link } from 'react-router'
import Header from '../../../components/Header'
import RaisedButton from 'material-ui/RaisedButton'
import './SignInPage.scss'

export default class SignInPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hasDeck: false,
      signedIn: false,
      completedAPICall: false
    };
  }

  componentDidMount() {
    let hasDeck = this.state.hasDeck;
    let signedIn = this.state.signedIn;
    fetch(`${window.location.origin}/user/`, { credentials: "same-origin"})
      .then(res => {
        return res.json() })
          .then(json => {
            if (json.user) {
              signedIn = true
            }
            fetch(`${window.location.origin}/user/deck`, { credentials: "same-origin"})
              .then(res => {
                return res.json() })
                  .then(json => {
                    if (json.deck) {
                      hasDeck = true
                    }
                    this.setState({ hasDeck: hasDeck, signedIn: signedIn, completedAPICall: true })
                  });
          });
  }

  

  render() {
    console.log('state is ', this.state)
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
