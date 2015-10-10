Template.Menu.events({
	'click .c-menu__players-item': function(ev) {
		var target = $(ev.currentTarget).find('.js-challenge');
		$('.js-challenge').not(target).removeClass('is-visible');
		target.toggleClass('is-visible');
	}
});