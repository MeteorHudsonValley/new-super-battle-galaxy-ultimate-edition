Meteor.publish("online_users", function() {
  return Meteor.users.find({ "status.online": true });
});
