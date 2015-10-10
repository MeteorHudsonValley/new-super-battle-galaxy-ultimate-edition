Template.Menu.events({
	'click .c-menu__players-item': function(ev) {
		var target = $(ev.currentTarget).find('.js-challenge');
		$('.js-challenge').not(target).removeClass('is-visible');
		target.toggleClass('is-visible');
	},

	'click .js-challenge-cancel': function(ev) {
		ev.preventDefault();
		alert();
		var target = $(ev.currentTarget).parents('.js-challenge');
		target.removeClass('is-visible');
	}
});