Template.Menu.events({
	'click .c-menu__players-link': function(ev) {
		var target = $(ev.currentTarget).siblings('.js-challenge');
		$('.js-challenge').not(target).removeClass('is-visible');
		target.toggleClass('is-visible');
	},

  'click .js-challenge-yes': function(evt) {
    evt.preventDefault();

    var game = {
      user1: Meteor.userId(),
      user2: this._id,
      status: "challenged",
    };

    Games.insert (game);
  },

	'click .js-challenge-no': function(ev) {
		ev.preventDefault();
		var target = $(ev.currentTarget).parents('.js-challenge');
		target.removeClass('is-visible');
	}
});

Template.Menu.helpers({
  players () {
    Meteor.subscribe("online_users");
    var players = Meteor.users.find({
      "status.online": true,
      _id: { $ne: Meteor.userId() }
    });
    if( players.count() > 0 ) {
      return players;
    }
    return false;
  },

  // context - individual users
  isBusy () {
    return this.profile && this.profile.isBusy;
  },

  outboundGames () {
    Meteor.subscribe("outbound_games");
    var outboundGames = Games.find({ user1: Meteor.userId() });
    return outboundGames;
  },

  inboundGames () {
    Meteor.subscribe("inbound_games");
    var inboundGames = Games.find({ user2: Meteor.userId() });
    return inboundGames;
  },

  inboundGame () {
    var game = Games.findOne ({ _id: this._id });

    var isChallenger = true;

    if (game.status == 'challenged') {
      // mark current user as busy
      Meteor.users.update( { _id: Meteor.userId() },
        { $set: { "profile.isBusy": true }} );

      var confirmed = window.confirm("You've been challenged! Do you accept?");

      if (confirmed) {
        // Challenge accepted!
        game.status = "accepted";
        Games.update ({_id: this._id}, { $set: {status: game.status} });
        return game.status;
      } else {
        // Chellenge denied, sadface.
        game.status = "declined";
        Games.update ({_id: this._id}, { $set: {status: game.status} });
        // unlock the user - they are no longer busy!
        Meteor.users.update( { _id: Meteor.userId() },
          { $set: { "profile.isBusy": false }} );
        return game.status;
      }
    }

    return game.status;
  },

  outboundGame () {
    var game = Games.findOne ({ _id: this._id });
    var isChallenging = false;

    if (game.status == 'challenged') {
      Meteor.users.update ({ _id: Meteor.userId() },
        { $set: { "profile.isBusy": true}} );
    }
    else if (game.status == 'declined') {
      //match was declined, unlock user
      Meteor.users.update ({ _id: Meteor.userId() },
        { $set: { 'profile.isBusy': false}} );
    }

    return game.status;
  },

  user1username () {
    var user = Meteor.users.findOne (this.user1);
    return (user && user.username) || '';
  },
  user2username () {
    var user = Meteor.users.findOne (this.user2);
    return (user && user.username) || '';
  },

});
