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
    console.log(game);
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

  isChallenger (_id) {
    Meteor.subscribe("challenged_games");
    var games = Games.find ({ user1: _id, user2: Meteor.userId() });
console.log('isChallenger', games.fetch());
    var isChallenger = true;

    games.forEach (function (game) {
      if (game.status == 'challenged') {
        // mark current user as busy
        Meteor.users.update( { _id: Meteor.userId() },
          { $set: { "profile.isBusy": true }} );

        if (confirm("you've been challenged! Do you accept?")) {
          // Challenge accepted!
          Games.update ({_id: game._id}, { $set: {status: "accept"} });
          return true;
        } else {
          // Chellenge denied, sadface.
          Games.update ({_id: game._id}, { $set: {status: "declined"} });
          // unlock the user - they are no longer busy!
          Meteor.users.update( { _id: Meteor.userId() },
            { $set: { "profile.isBusy": false }} );
          return false;
        }
      }
    });

    return isChallenger;
  },

  isChallenging (_id) {
    Meteor.subscribe("user_games");
    var games = Games.find ({ user1: Meteor.userId(), user2: _id });
    var isChallenging = false;
console.log('isChallenging', games.fetch());
    games.forEach (function (game) {
      if (game.status == 'challenged') {
        Meteor.users.update ({ _id: Meteor.userId() },
          { $set: { "profile.isBusy": true}} );
        isChallenging = true;
      }
      else if (game.status == 'declined') {
        //match was declined, unlock user
        Meteor.users.update ({ _id: Meteor.userId() },
          { $set: { 'profile.isBusy': false}} );
        isChallenging = false;
      }
    });

    return isChallenging;
  },

});
