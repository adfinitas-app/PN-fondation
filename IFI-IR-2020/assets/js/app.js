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


    var os = new OnScreen({
        debounce: 0
    });
    function toggleClassOnScreen(elSelector, className, onLeave) {
        os.on('enter', elSelector, function(el) {
            $(el).addClass(className)
        })
        os.on('leave', elSelector, function(el) {
            $(el).removeClass(className)
            if (onLeave) onLeave()
        })
    }

    toggleClassOnScreen('.banner', 'animated pulse')
    toggleClassOnScreen('.reveal-animation', 'show')
    toggleClassOnScreen('.text-don-1', 'animated fadeInLeft', function() {
        $('.text-don-1').removeClass('visible')
    })
    toggleClassOnScreen('.text-don-2', 'animated fadeInRight', function() {
        $('.text-don-2').removeClass('visible')
    })
    $('.text-don').on(animationEnd, function() {
        $('.text-don').addClass('visible');
        $('.text-don').removeClass('animated')
        $('.text-don').removeClass('fadeInLeft')
        $('.text-don').removeClass('fadeInRight')
    })
    toggleClassOnScreen('.don-info', 'animated flipInX')
    toggleClassOnScreen('.arrow.down', 'animated rubberBand')

    var height = $('.banner').outerHeight()
    $(window).scroll(function() {
        var relativeY =  $(".slide-deux").offset().top - $(".banner").offset().top;
        var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var elBottom = $('.banner')[0].getBoundingClientRect().bottom;
        var fixTop = $('#link-1')[0].getBoundingClientRect().top;
        if (elBottom > vh) {
            $('.banner').addClass('line-sticky')
        } else if (fixTop + height < vh) {
                $('.banner').removeClass('line-sticky')
        }
    })
});

var animationEnd = (function(el) {
  var animations = {
    animation: 'animationend',
    OAnimation: 'oAnimationEnd',
    MozAnimation: 'mozAnimationEnd',
    WebkitAnimation: 'webkitAnimationEnd',
  };

  for (var t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
})(document.createElement('div'));

function scrollToDown(next){
	if ($(next).length != 0)
	{
		$('html, body').stop().animate({
			scrollTop: $(next).offset().top + 121
		}, 700, 'swing');
		return false;
	}
};

function scrollTo(next){
	if ($(next).length != 0)
	{
		$('html, body').stop().animate({
			scrollTop: $(next).offset().top - 90
		}, 700, 'swing');
		return false;
	}
};
