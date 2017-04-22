

$(document).ready( function() {
  if (  ($('#section-form').height() + $('header').height()) <  $(window).height() )
    $('#section-form').height($(window).height() - $('header').height());
});
$(window).resize( function() {
  if (  ($('#section-form').height() + $('header').height()) <  $(window).height() )
    $('#section-form').height($(window).height() - $('header').height());
});
function validateForm(mode) {
  var check = 0;
  var emailID = $("input[name='email']").val();
  atpos = emailID.indexOf("@");
  dotpos = emailID.lastIndexOf(".");


  $("input").each( function() {
    if ($(this).hasClass('mandatory') && $(this).val().length == 0) {
      check++;
      $(this).css('border','1px solid red');
    }
    else {
      $(this).css('border','1px solid #cacaca');
    }
  });

  if($("input[name='civility']").length && (!$("input[name='civility']:checked").val())) {
    check ++;
    $('.radio p').css('color', 'red');
  }
  else {
    $('.radio p').css('color', 'black');
  }
  $('.error').hide();

  if (check != 0) {
    $('.g_error').show();
    return false;
  }
  else 
    $('.g_error').hide();
    
  if (atpos < 1 || ( dotpos - atpos < 2 ) && index.html) 
  {
    $('.error_mail').show();
    $("input[name='email']").css('border','1px solid red');
    $("input[name='email']").focus() ;
    return false;
  }
  else
    $('.error_mail').hide();



  submitForm();
  showNotif();
}



function showNotif() {
  $('.notification').slideDown( "slow", function() {
    setTimeout(function(){
      $('.notification').slideUp("slow");
    }, 5000);
  });
}


function extractUrlParams(){
  var t = document.location.search.substring(1).split('&'); var f = [];
  for (var i=0; i<t.length; i++){
   var x = t[ i ].split('=');
   f[x[0]]=decodeURIComponent(x[1]);
 }
 return f;
};

var p = extractUrlParams();

if (p['email'] && p['email'] != "undefined") {
  $("input[name=email]").val(p['email']);
}

if (p['firstname'] && p['firstname'] != "undefined") {
  $("input[name=firstname]").val(p['firstname']);
}

if (p['lastname'] && p['lastname'] != "undefined") {
  $("input[name=lastname]").val(p['lastname']);
}

if (p['phone'] && p['phone'] != "undefined") {
  $("input[name=phone]").val(p['phone']);
}


/*
 * Debut de la lib
 */

 function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
  }
  return "";
}
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}
function makeCorsRequest(data) {
  var url = 'https://adfinitas-io.herokuapp.com/api/v1/organization/43546db9-67fb-42b8-bffa-dd5ef59ad2b6/webhook/2a906835-3a50-445f-9405-ca70d1a856ba';
  var body = JSON.stringify(data);
  var xhr = createCORSRequest('POST', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(body);
}

/*
 * Fin de la lib
 */

 function pureField(string) {
  return (string.replace(/'/g, "%27").replace(/"/g, "&quot;"));
}


function getSexe() {
  if (pureField($("input[name='civility']:checked").val()) == 'Madame') {
    return 'Femme';
  } else {
    return 'Homme';
  }
}

function getCivilityDear() {
  if (pureField($("input[name='civility']:checked").val()) == 'Madame') {
    return 'Chère';
  } else {
    return 'Cher';
  }
}

function getCivilityLong() {
  if (pureField($("input[name='civility']:checked").val()) == 'Madame') {
    return 'MADAME';
  } else {
    return 'MONSIEUR';
  }
}

function submitForm(mode) {

  var data = {
    "db": {
      "schema": "TODO",
      "db": {
        "email": pureField($("input[name='email']").val()),
        "sexe": getSexe(),
        "civility": pureField($("input[name='civility']:checked").val()),
        "civility_dear": getCivilityDear(),
        "civility_long": getCivilityLong(),
        "personnalisation": getCivilityDear() + ' ' + pureField($("input[name='civility']:checked").val()).toUpperCase() + ' ' + pureField($("input[name='lastname']").val()).toUpperCase(),
        "personnalisation_courte": pureField($("input[name='civility']:checked").val()).toUpperCase() + ' ' + pureField($("input[name='lastname']").val()).toUpperCase(),
        "firstname": pureField($("input[name='firstname']").val()),
        "lastname": pureField($("input[name='lastname']").val()),
        "name": pureField($("input[name='firstname']").val()) + ' ' + pureField($("input[name='lastname']").val()),
      "ce_language": pureField($("input[name='language']").val())
      }
    },
    "woopra" : {
      "host": "perce-neige.org",
      "cookie": getCookie("wooTracker"),
      "event": "inscription",
      "cv_email": pureField($("input[name='email']").val()),
      "cv_sexe": getSexe(),
      "cv_civility": pureField($("input[name='civility']:checked").val()),
      "cv_firstname": pureField($("input[name='firstname']").val()),
      "cv_lastname": pureField($("input[name='lastname']").val()),
      "cv_name": pureField($("input[name='firstname']").val()) + ' ' + pureField($("input[name='lastname']").val()),
      "ce_email": pureField($("input[name='email']").val()),
      "ce_sexe": getSexe(),
      "ce_civility": pureField($("input[name='civility']:checked").val()),
      "ce_firstname": pureField($("input[name='firstname']").val()),
      "ce_lastname": pureField($("input[name='lastname']").val()),
      "ce_name": pureField($("input[name='firstname']").val()) + ' ' + pureField($("input[name='lastname']").val()),
      "ce_language": pureField($("input[name='language']").val())
    },
    "mailjet": {
      "Email": pureField($("input[name='email']").val()),
      "Properties": {
        "sexe": getSexe(),
        "civility": pureField($("input[name='civility']:checked").val()),
        "civility_dear": getCivilityDear(),
        "civility_long": getCivilityLong(),
        "personnalisation": getCivilityDear() + ' ' + pureField($("input[name='civility']:checked").val()).toUpperCase() + ' ' + pureField($("input[name='lastname']").val()).toUpperCase(),
        "personnalisation_courte": pureField($("input[name='civility']:checked").val()).toUpperCase() + ' ' + pureField($("input[name='lastname']").val()).toUpperCase(),
        "firstname": pureField($("input[name='firstname']").val()),
        "lastname": pureField($("input[name='lastname']").val()),
        "name": pureField($("input[name='firstname']").val()) + ' ' + pureField($("input[name='lastname']").val()),
      "language": pureField($("input[name='language']").val())
      },
      "addLists": [],
      "delLists": []
    },
    //"grecaptcha_response": grecaptcha.getResponse()
  }
makeCorsRequest(data);
}






function    scrollTo(next){
  if ($(next).length != 0)
  {
    $('html, body').stop().animate({
      scrollTop: $(next).offset().top + 1
    }, 700, 'swing');
    return false;
  }
};