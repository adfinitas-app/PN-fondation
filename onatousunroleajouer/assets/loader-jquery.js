// -->  Chargement jQuery :: si on a deja une version on la teste, sinon
//      on en charge une et on attend avant de lancer le programme
//      je n'utilise pas "setTimeout(alert, 1000, hello);" dans ce cas pour les navigateurs anciens
//      Dans tous les cas, on passe jQuery en Non conflict

// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

function getDataFromModule(module) {
  if (module == "form") {
    return _DATA_FORM;
  } else if (module == "cta") {
    return _DATA_CTA;
  } else if (module == "image") {
    return _DATA_IMGS;
  }
}

function getObjectFromModule(module) {
  if (module == "form") {
    return formGrid;
  } else if (module == "cta") {
    return ctaGrid;
  } else if (module == "image") {
    return imgsGrid;
  }
}

// Vérification des valeurs
function checkParams(myModule, myDebug, myAmount, mySegment) {
  if (typeof myModule == "undefined" || myModule.length == 0 || (myModule != "form" && myModule != "image" && myModule != "cta"))
  {
    if (typeof myModule != "undefined") {
      console.log("Module invalide : " + myModule);
    } else {
      console.log("Module invalide (undefined)");
    }
    return false;
  }
  if (typeof myDebug == "undefined" || (myDebug != true && myDebug != false)) {
    if (typeof myDebug != "undefined") {
      console.log("Debug invalide : " + myDebug);
    } else {
      console.log("Debug invalide (undefined)");
    }
    return false;
  }
  if (typeof myAmount == "undefined" || isNaN(myAmount) == true) {
    if (typeof myAmount != "undefined") {
      console.log("Amount invalide : " + myAmount);
    } else {
      console.log("Amount invalide (undefined)");
    }
    return false;
  }
  data = getDataFromModule(myModule);
  if (typeof mySegment == "undefined" || typeof data.segments[mySegment] == "undefined") {
    if (typeof mySegment != "undefined") {
      console.log("Segment invalide : " + mySegment);
    } else {
      console.log("Segment invalide (undefined)");
    }
    return false;
  }
  return true;
}

// Si aucune version n'est chargé
function appendjQuery()
{
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'http://code.jquery.com/jquery-2.1.4.min.js';
  document.getElementsByTagName('head')[0].appendChild(script);
}


function loadJQuery(myModule, myDebug, myAmount, mySegment) {
  // Boucle qui attend le chargement de jQ avant de lancer le module
  var waitForLoad = function (myModule, myDebug, myAmount, mySegment) {
    if (typeof jQuery != "undefined") {
      jQ = jQuery.noConflict();
      if (checkParams(myModule, myDebug, myAmount, mySegment) != true) {
	console.log("Usage : loadJQuery(module_string, debug_bool, amount_nbr, segment_string)")
	  return false;
      }
      console.log("Version jQuery chargée : " + jQ.fn.jquery + " // Minimum requis : " + minimumVersion);
      getObjectFromModule(myModule).buildAll(myDebug, myAmount, mySegment, jQ);
    } else {
      console.log("jquery not loaded..");
      window.setTimeout(function(){ waitForLoad(myModule, myDebug, myAmount, mySegment) }, 500);
    }
  };
  // Tests de présence et version de jQ
  var minimumVersion  = 1.09;
  if (typeof jQuery === "undefined")
  {
    console.log("jQuery non présent");
    appendjQuery();
  }
  else
  {
    var jQueryVersion   = jQuery.fn.jquery.split(".");
    jQueryVersion = parseFloat(jQueryVersion[0]+"."+jQueryVersion[1]);
    if (minimumVersion <= jQueryVersion)
    {
      appendjQuery();
    }
  }
  // Premier lancement de la fonction d'attente
  window.setTimeout(function(){ waitForLoad(myModule, myDebug, myAmount, mySegment) }, 500);
}
