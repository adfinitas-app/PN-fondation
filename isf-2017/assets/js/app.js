$(document).foundation();


$(document).ready( function() {
    var inst = $('[data-remodal-id=fondation]').remodal();

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
	$('#link-header-1').click( function() {
		scrollTo($('#link-1'));
	});
	$('#link-header-2').click( function() {
		scrollTo($('#link-2'));
	});
	$('#link-header-3').click( function() {
		scrollToDown($('#link-2'));
	});

	$('#close').click( function() {
	    inst.close();
		
	});
});
$(window).resize( function() {


});


function    scrollToDown(next){
	if ($(next).length != 0)
	{
		$('html, body').stop().animate({
			scrollTop: $(next).offset().top + 121
		}, 700, 'swing');
		return false;
	}
};


function    scrollTo(next){
	if ($(next).length != 0)
	{
		$('html, body').stop().animate({
			scrollTop: $(next).offset().top - 90
		}, 700, 'swing');
		return false;
	}
};