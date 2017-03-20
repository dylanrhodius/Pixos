socket.on("receive:data", function(data) {
  that.props.setMyTurn(true)
    // self.myTurn = true
  that.props.updateHasRoundFinished(false)
    // reset self.hasRoundFinished ; this is a flag only for the enemy's info
  that.props.updateEnemyState(data)
    // get state of enemy at end of their last turn

  that.adjudicateGameState()
    // see other function
    // if round ends based on enemy action, self turn ends after this function
    // so better if put an if statement here rather than in the other function

  // i.e. if enemy has decided the round has ended do this
  if(data.hasRoundFinished) {

    that.props.clearPlayingArea()
    // clears own playing area state that is passed to enemy
    // makes enemy's are look clear but doesn't update their state
    that.props.updatePower()
    // reset power
   }

  // if have already passed or have run out of cards end round
  if (that.props.battle.self.hasPassed) {
    that.props.setMyTurn(false)
    that.props.setTurnFinished(true)
  }
}

adjudicateGameState() {

  // if have passed  + enemy has passed or ended round
  if (battle.self.hasPassed && ( battle.enemy.hasPassed
  || battle.enemy.hasRoundFinished) )  {
    // set haveWon if self power > enemy power
    let selfHasWon = battle.self.power > battle.enemy.power

    // increment self score if haveWon
    this.props.updateScore(selfHasWon)

    // set hasFinished for enemy information
    this.props.updateHasRoundFinished(true)

    // increment own copy of round counter
    this.props.incrementRoundCounter()

    // unset passTurn
    this.props.passTurn(false)

    // display end of round message to self
    this.props.setRoundNotification(selfHasWon)

    // end of turn
    this.props.setTurnFinished(true)
    this.props.setMyTurn(false)
  }
