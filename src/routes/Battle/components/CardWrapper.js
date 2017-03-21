import React from 'react'
import Card from './Card'
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import RaisedButton from 'material-ui/RaisedButton';

export default class CardWrapper extends React.Component {

 constructor (props) {
   super(props)

   this.state = {
    open: false,
  };

  this.handleTouchTap = this.handleTouchTap.bind(this)
  this.handleRequestClose = this.handleRequestClose.bind(this)
  this.playCard = this.playCard.bind(this)
  this.setTurnFinishedToTrue = this.setTurnFinishedToTrue.bind(this)
 }

 setTurnFinishedToTrue () {
   this.props.setMyTurn(false)
   this.props.setTurnFinished(true)
 }

 isMeteorConditions() {
   if (this.props.special == 'meteor' || this.props.subjectToMeteor) {
     return true
   }
 }

   isParagonConditionsSelf(){
     if (this.props.special == 'paragon' || this.props.subjectToParagonSelf) {
       return true
     }
   }

 playCard() {
   if (this.props.special == 'resurrector') {
     this.props.resurrectCards()
   }
   this.props.addCard(this.props.id)
   this.props.removeCard(this.props.id)

   if(this.isMeteorConditions()) {
     this.props.applyMeteorEffect(this.props.type)
     if (this.isParagonConditionsSelf()){
       this.props.applyParagonEffect(this.props.type)
     }
   } else if (this.isParagonConditionsSelf()){
     this.props.applyParagonEffect(this.props.type)
   }
   this.props.updatePower()
   this.setTurnFinishedToTrue()
 }

 handleTouchTap (event) {
   // This prevents ghost click.
   event.preventDefault();

   this.setState({
     open: true,
     anchorEl: event.currentTarget,
   })
 }

 handleRequestClose () {
   this.setState({
     open: false,
   })
 }

 render () {
   return (
     <div className="mb-2">
       <div onTouchTap={this.handleTouchTap}>
         <Card
          power={this.props.power}
          type={this.props.type}
          imgUrl={this.props.imgUrl}
          name={this.props.name}
          special={this.props.special}
          showPointer={true}
        />
       </div>
     <Popover
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this.handleRequestClose}
      >
        <Menu>
          <MenuItem primaryText="Play" onClick={this.playCard}/>
        </Menu>
      </Popover>
     </div>
   )
 }

 propTypes: {
   type : React.PropTypes.string.isRequired,
   imgUrl : React.PropTypes.string.isRequired,
   name : React.PropTypes.string.isRequired,
   power : React.PropTypes.string.isRequired,
   special : React.PropTypes.string.isRequired,
   removeCard : React.PropTypes.func.isRequired,
   addCard : React.PropTypes.func.isRequired,
   setTurnFinished  : React.PropTypes.func.isRequired,
   setMyTurn : React.PropTypes.func.isRequired,
   updatePower : React.PropTypes.func.isRequired,
   resurrectCards : React.PropTypes.func.isRequired,
   applyMeteorEffect : React.PropTypes.func.isRequired,
   subjectToMeteor : React.PropTypes.bool.isRequired,
   applyParagonEffect : React.PropTypes.func.isRequired,
   subjectToParagonSelf : React.PropTypes.bool.isRequired

 }
}
