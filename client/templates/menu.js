Template.Menu.events({
	'click .c-menu__players-link': function(ev) {
		var target = $(ev.currentTarget).siblings('.js-challenge');
		$('.js-challenge').not(target).removeClass('is-visible');
		target.toggleClass('is-visible');
	},

  'click .js-challenge-yes': function(evt) {
    evt.preventDefault();
    Meteor.users.update( { _id: Meteor.userId() },
      { $set: { "profile.isBusy": true }} );
  },

	'click .js-challenge-no': function(ev) {
		ev.preventDefault();
		var target = $(ev.currentTarget).parents('.js-challenge');
		target.removeClass('is-visible');
    Meteor.users.update( { _id: Meteor.userId() },
      { $set: { "profile.isBusy": false }} );
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

});
