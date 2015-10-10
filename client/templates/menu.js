Template.Menu.events({
	'click .c-menu__players-link': function(ev) {
		var target = $(ev.currentTarget).siblings('.js-challenge');
		$('.js-challenge').not(target).removeClass('is-visible');
		target.toggleClass('is-visible');
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
    console.log(players.fetch());
    return players;
  },

  // context - individual users
  isBusy () {
    return Meteor.user().profile.isBusy;
  },

});
