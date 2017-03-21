import React from 'react'
import SignInForm from './SignInForm.jsx'
import { Link } from 'react-router'
import Header from '../../../components/Header'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress';

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
              signedIn = json.user
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

  loadContent() {
    let topMessage, topButton, middleMessage, middleButton, bottomMessage, bottomButton

    if (this.state.completedAPICall) {

      let topMessage, topButton, middleMessage, middleButton, bottomMessage, bottomButton

      bottomButton = ( <Link to={`/deckbuilder`}  className='mb-5' key={'bottomButton'} ><RaisedButton label="Deck Builder" primary={true}/></Link> )

      if (!this.state.hasDeck) {
        topMessage = ( <p className="my-4" key={'topMessage'}>Welcome! Build your deck to get started&hellip;</p> )
      }

      if (this.state.hasDeck && !this.state.signedIn) {
        topMessage = ( <p className="my-4" key={'topMessage'}>Your deck is ready to go, great!</p> )
        topButton = (<SignInForm key={'topButton'}/> )
        middleMessage = ( <p className="my-4" key={'middleMessage'}>Or&hellip;</p> )
        middleButton = ( <Link to={`/battle`} key={'middleButton'} ><RaisedButton label="Start Matchmaking as Guest" primary={true}/></Link>)
        bottomMessage =  ( <p className="my-4" key={'bottomMessage'}>Want to change your deck?</p> )
      }

      if (this.state.hasDeck && this.state.signedIn) {
        let userName = this.state.signedIn.name.split(" ")[0]
        topMessage = ( <p className="my-4" key={'topMessage'}>{`Welcome ${userName}! Your deck is ready to go.`}</p> )
        topButton = ( <Link to={`/battle`} key={'topButton'} ><RaisedButton label="Start Matchmaking" primary={true}/></Link>)
        bottomMessage =  ( <p className="my-4" key={'bottomMessage'}>Want to change your deck?</p> )
      }

      return (
          [
            topMessage,
            topButton,
            middleMessage,
            middleButton,
            bottomMessage,
            bottomButton
          ]
      )
    } else {
      return ( <CircularProgress size={60} thickness={7} /> )
    }
  }

  render() {
    let content = this.loadContent()
    console.log('state is ', this.state)
    return (
      <div className="sign-in-background max-page-height d-flex flex-column justify-content-center align-items-center">
        <Header />
        { content }
      </div>
    );
  }
}
