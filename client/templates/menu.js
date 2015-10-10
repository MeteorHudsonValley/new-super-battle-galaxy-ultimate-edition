Template.Menu.events({
	'click .c-menu__players-item': function(ev) {
		$('.js-challenge').removeClass('is-visible');
		$(ev.currentTarget).find('.js-challenge').addClass('is-visible');
	}
});