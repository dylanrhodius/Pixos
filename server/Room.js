var shortid = require("shortid");
var cardData = require('./cardData').CARD_DATA
// var Battle = require("./Battle");

var Room = (function(){
  var Room = function(){
    if(!(this instanceof Room)){
      return (new Room());
    }
    /**
     * constructor here
     */

    var self = this;
    this._id = shortid.generate();
    this._users = [];
    // this._ready = {};
    //this.socket = scServer.global;


    //console.log("room created: " + this.getID());
  };
  var r = Room.prototype;
  /**
   * methods && properties here
   * r.property = null;
   * r.getProperty = function() {...}
   */
  r.MAX_USER = 2;
  r._users = null;
  r._id = null;
  // r._battle = null;
  // r._ready = null;
  r._channel = null;

  r.getID = function(){
    return this._id;
  }

  r.join = function(user){
    if(this._users.length >= 2) return;
    this._users.push(user);
    user.addRoom(this);
    user.socket.join(this.getID());
    user.send("response:joinRoom", this.getID());

    if(!this.isOpen()){
      this.initBattle();
    }
  }

  r.isOpen = function(){
    return !(this._users.length >= 2);
  }

  r.getPlayers = function(){
    return this._users;
  }

  r.initBattle = function(){
    console.log('Room initiating battle!');
    var p1Deck = this._users[0].getDeck();
    var p2Deck = this._users[1].getDeck();
    var p1Hand = this.generateRandomHand(p1Deck);
    var p2Hand = this.generateRandomHand(p2Deck);
    var p1Name = this._users[0].getName();
    var p2Name = this._users[1].getName();
    var p1Img = this._users[0].getUserImg() || '/icons/anon-player.svg';
    var p2Img = this._users[1].getUserImg() || '/icons/anon-player.svg';
    this._users[0].send("init:battle", {selfTurn: true,
                                        selfHand: p1Hand,
                                        enemyHand: p2Hand,
                                        selfName: p1Name,
                                        enemyName: p2Name,
                                        selfImg: p1Img,
                                        enemyImg: p2Img});
    this._users[1].send("init:battle", {selfTurn: false,
                                        selfHand: p2Hand,
                                        enemyHand: p1Hand,
                                        selfName: p2Name,
                                        enemyName: p1Name,
                                        selfImg: p2Img,
                                        enemyImg: p1Img });
  }

  r.generateRandomHand = function(deck){
    var result = []
    var choice
    for (var i = 0; i < 10; i++) {
      choice = Math.floor(Math.random() * cardData.deckLimit)
      result.push(deck[choice])
    }
    return result
  }

  r.passData = function(from, data){
    console.log(from.getID(), data)
    var to;
    if (this._users[0] == from) {
      to = this._users[1];
    } else {
      to = this._users[0]
    }
    to.send("receive:data", data);
  }


  // r.setReady = function(user, b){
  //   b = typeof b == "undefined" ? true : b;
  //   this._ready[user.getID()] = b;
  //   if(this.bothReady()){
  //     this._battle.init();
  //   }
  //
  // }

  // r.bothReady = function(){
  //   return !!this._ready[this._users[0].getID()] && !!this._ready[this._users[1].getID()];
  // }

  r.leave = function(user){
    var p = "p2";
    var i = 1;
    if(user.getID() === this._users[0].getID()){
      p = "p1";
      i = 0;
    }

    this._users.splice(i, 1);

    // if(this._battle){
    //   this._battle.userLeft(p);
    // }

    if(!this.hasUser()) {
      connections.roomCollection[this.getID()] = null;
    }
  }

  r.hasUser = function() {
    return this._users.length;
  }


  return Room;
})();

module.exports = Room;
