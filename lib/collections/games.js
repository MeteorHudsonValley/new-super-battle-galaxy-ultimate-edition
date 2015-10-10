Games = new Mongo.Collection("games");

// set permissions
if (Meteor.isServer) {
  // these permission can only be set on the server,
  // but they only restrict activity on the client.
  Games
    .permit(['insert', 'update', 'remove'])
    //.ifLoggedIn() :TODO: Enable account system
    // :TODO: Add restriction so user can only manage their own player
    .apply();
}

GamesSchema = new SimpleSchema ({
  user1: {
    type: String,
  },
  user2: {
    type: String,
  },
  status: {
    type: String,
    allowedValues: [
      "create",
      "challenged",
      "declined",
      "accepted",
      "inProgress",
      "complete",
    ]
  },
  outcome: {
    type: String,
    optional: true,
  },
});

if (Meteor.isClient) {
  Template.registerHelper ("GamesSchema", GamesSchema);
}

Games.attachSchema (GamesSchema);
