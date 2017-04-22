$(document).foundation();


$(document).ready( function() {

	$('.arrow.down').click( function() {
		$(this).css('visibility','hidden');
		$(this).next('.hidden').slideDown( "slow", function() {
		});
	});
	$('.down.un').click( function() {
		$('.hidden.un').slideDown( "slow", function() {
		}).prev('.arrow.down').css('visibility','hidden');
	});
	$('.down.deux').click( function() {
		$('.hidden.deux').slideDown( "slow", function() {
		}).prev('.arrow.down').css('visibility','hidden');
	});
	$('.down.trois').click( function() {
		$('.hidden.trois').slideDown( "slow", function() {
		}).prev('.arrow.down').css('visibility','hidden');
	});
	$('.arrow.up').click( function() {
		$(this).parent().slideUp( "slow", function() {
			$(this).prev().css('visibility','visible');
		});
	});
	$('#bt-scroll-header').click( function() {
		scrollTo($('.row.video'));
	});
});
$(window).resize( function() {


});





function    scrollTo(next){
	if ($(next).length != 0)
	{
		$('html, body').stop().animate({
			scrollTop: $(next).offset().top + 1
		}, 700, 'swing');
		return false;
	}
};