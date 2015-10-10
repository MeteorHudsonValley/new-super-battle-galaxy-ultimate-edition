Template.Menu.events({
	'click .c-menu__players-item': function() {
		$(this).children('.js-challenge').toggleClass('is-visible');
	}
});