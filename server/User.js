var User = (function(){
  var User = function(socket, userObj, deck){
    if(!(this instanceof User)){
      return (new User(socket, userObj, deck));
    }
    /**
     * constructor here
     */

    this._userObj = userObj || null
    this.socket = socket;
    this._rooms = [];
    this._id = socket.id;
    this._deck = deck
    this.setupName();

    this._events();
  };
  var r = User.prototype;
  /**
   * methods && properties here
   * r.property = null;
   * r.getProperty = function() {...}
   */

  r._id = null;
  r._name = null;
  r._rooms = null;
  r._inQueue = false;
  r.socket = null;
  r._userObj = null
  r._deck = null
  r.disconnected = false;

  r.getID = function(){
    return this._id;
  }

  r.send = function(event, data, room){
    room = room || null;
    data = data || null;
    if(!room){
      this.socket.emit(event, data);
    }
    else {
      this.socket.to(room).emit(event, data);
    }
  }

  r.setupName = function(){
    var name;
    if (this._userObj) {
      name = this._userObj.name
    } else {
      name = this.generateName()
    }
    this._name = name;
    // return name;
  }

  r.generateName = function(){
    var name = "Guest" + (((Math.random() * 8999) + 1000) | 0);
    return name;
  }

  // r.setName = function(name) {
  //   name = name.slice(0, 20);
  //   console.log("user name changed from %s to %s", this._name, name);
  //   this._name = name;
  // }

  r.getName = function() {
    return this._name;
  }

  r.getRoom = function() {
    return this._rooms[0];
  }

  r.getUserObj = function() {
    return this._userObj;
  }

  r.getUserImg = function() {
    var userObj = this.getUserObj();
    if (userObj) {
      return userObj.image
    }
    return null;
  }

  r.getDeck = function() {
    return this._deck;
  }


  // r.setDeck = function(deck) {
  //   //console.log("set deck: ", deck);
  //   this._deck = deck;
  // }
  //
  // r.getDeck = function() {
  //   return this._deck;
  // }

  r.addRoom = function(room) {
    this._rooms.push(room);
  }

  r.cleanUp = function() {
    for(var i=0; i<this._rooms.length; i++) {
      var room = this._rooms[i];
      if(room[i] === null) {
        this._rooms.splice(i, 1);

        return this.cleanUp();
      }
    }
  }

  r.disconnect = function() {
    var self = this;
    this.disconnected = true;

    matchmaking.removeFromQueue(this);

    this._rooms.forEach(function(room) {
      room.leave(self);
      if(!room.hasUser()) {
        //console.log("Remove room: ", room.getID());
        room = null;
      }
    })

    this.cleanUp();
  }

  r._events = function() {
    var socket = this.socket;
    var self = this;

    // socket.on("request:name", function(data){
    //   if(data && data.name){
    //     self.setName(data.name);
    //   }
    //   socket.emit("response:name", {name: self.getName()});
    // })

    socket.on("request:matchmaking", function() {
      console.log('Matchmaking requested by'+ self.getName())
      console.log('User obj in User is', self._userObj)
      console.log('user deck is ', self._deck)
      if(self._inQueue) return;
      matchmaking.findOpponent(self);
    });

    socket.on("pass:ToRoom", function(data){
      console.log(self.getID()+ ' is passing data to the Room')
      self.getRoom().passData(self, data)
    })

    // socket.on("set:deck", function(data) {
    //   //console.log(data);
    //   if(data && data.deck){
    //     self.setDeck(data.deck);
    //   }
    // })

  }

  return User;
})();

module.exports = User;
