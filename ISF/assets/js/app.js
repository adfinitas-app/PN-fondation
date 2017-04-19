

$(document).ready( function() {


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