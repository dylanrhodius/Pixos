module.exports = {
  addTo: function(user, collection){
    collection.findOne({facebookId: user.identifier}).then((doc) => {
      if (doc === null){
        collection.insert({facebookId: user.identifier, name: user.name, image: user.image, deck: {} })
      }
    })
  }
}
