Players = new Mongo.Collection ("players");

// set permissions
if (Meteor.isServer) {
  // these permission can only be set on the server,
  // but they only restrict activity on the client.
  Players
    .permit(['insert', 'update', 'remove'])
    //.ifLoggedIn() :TODO: Enable account system
    // :TODO: Add restriction so user can only manage their own player
    .apply();
}

PlayersSchema = new SimpleSchema ({
  name: { type: String },
  status: { type: Object },
  "status.inMatch": { type: Boolean, label: "In Match" },
  "status.isBusy": { type: Boolean, label: "Busy" },
  "status.inScreen": { type: String },
});

if (Meteor.isClient) {
  Template.registerHelper ("PlayersSchema", PlayersSchema);
}

Players.attachSchema (PlayersSchema);
