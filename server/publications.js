Meteor.publish("online_users", function() {
  return Meteor.users.find({ "status.online": true });
});
Meteor.publish("outbound_games", function() {
  return Games.find ({ user1: this.userId });
});
Meteor.publish("inbound_games", function() {
  return Games.find ({ user2: this.userId });
});
