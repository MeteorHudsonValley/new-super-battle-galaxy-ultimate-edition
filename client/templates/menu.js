Template.Menu.events({
	'click .c-menu__players-item': function(ev) {
		var target = $(ev.currentTarget).find('.js-challenge');
		$('.js-challenge').not(target).removeClass('is-visible');
		target.toggleClass('is-visible');
	},
  'click .js-challenge-yes': function(evt) {
    evt.preventDefault();
    Meteor.users.update( { _id: Meteor.userId() },
      { $set: { "profile.isBusy": true }} );
  },
});

Template.Menu.helpers({
  players () {
    Meteor.subscribe("online_users");
    var players = Meteor.users.find({ "status.online": true, _id: { $ne: Meteor.userId() } });
    return players;
  },

  // context - individual users
  isBusy () {
    return this.profile && this.profile.isBusy;
  },

});
