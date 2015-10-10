Meteor.publish("online_users", function() {
  return Meteor.users.find({ "status.online": true });
});
Meteor.publish("user_games", function() {
  return Games.find ({ user1: this.userId });
});
Meteor.publish("challenged_games", function() {
  return Games.find ({ user2: this.userId });
});
