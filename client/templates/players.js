Template.Players.helpers({
  players () {
    Meteor.subscribe("online_users");
    var players = Meteor.users.find({ "status.online": true });
    console.log(players.fetch());
    return players;
  },

  // context - individual users
  isBusy () {
    Meteor.user()
  }
});

Template.Players.events({
});
