var trackCategory = function(category) {
    console.log('track : ' + category);
	woopra.track('interaction',
            {
                category: category,
                action: 'clic',
                url: document.location.href,
                title: document.title,
                value: ''
            });
};

var categoryToTrack = [
	['WEBDOCU_LP_unroleajouer17', 'WEBDOCU', 'id'],
	['TEASERBRUNO_LP_unroleajouer17', 'TEASERBRUNO', 'id'],
	['TEASERPARENTS_LP_unroleajouer17', 'TEASERPARENTS', 'id'],
	['TEASERACTEURS_LP_unroleajouer17', 'TEASERACTEURS', 'id'],
	['DECORFB_LP_unroleajouer17', 'jeLeFais', 'id'],
	['PARTAGEFB_LP_unroleajouer17', 'partageFb', 'class'],
	['PARTAGETW_LP_unroleajouer17', 'PARTAGETW', ''],
	['SUIVIFB_LP_unroleajouer17', 'SUIVIFB', ''],
	['SUIVITW_LP_unroleajouer17', 'SUIVITW', ''],
	['SUIVIINSTA_LP_unroleajouer17', 'SUIVIINSTA', ''],
	['SUIVITW_YT_unroleajouer17', 'SUIVITW_YT', ''],
	['BTNDON_LP_unroleajouer17', 'BTNDON', '']
];

function Track(id, category, type) {
  var element;
  
  if (type === 'id')
    element = document.getElementById(id);
  else
  return ;
  //  element = document.getElementsByClassName(id);
  if (!element)
    return ;
    console.log('add click event on: ' + id);
  function click(e) {
      e.preventDefault();
    console.log('Tracked click on this category: ' + category);
  }
  element.addEventListener('click', click, false);
}

var dynamicVideoEvent = function(id) {
    var elem = document.getElementById(id);
    function click(e) {
        e.preventDefault();
        var activeVideo = elem.getAttribute('data-current-video-id');
        console.log('activeVideo : ' + activeVideo);
        var category = '';
        if (activeVideo === 'teaserActeurs') {
            category = 'TEASERACTEURS_LP_unroleajouer17';
        } else if (activeVideo === 'teaserBS') {
            category = 'TEASERBRUNO_LP_unroleajouer17';
        } else if (activeVideo === 'teaserParents') {
            category = 'TEASERPARENTS_LP_unroleajouer17'
        } else if (activeVideo === 'webdoc') {
            category = 'WEBDOCU_LP_unroleajouer17'
        }
        console.log('Tracked click on this category: ' + category);
    }
    console.log('add click event on: ' + id);
    elem.addEventListener('click', click, false)
};

var classEvent = function(classe) {
    var elem = document.getElementsByClass(classe);
    function click() {
        
    }
    
    elem.addEventListener('click', click, false);
}

$(document).ready(function() {
    for (var i = 0; i < categoryToTrack.length; i++){
        var id = categoryToTrack[i][1];
        var category = categoryToTrack[i][0];
        var type = categoryToTrack[i][2];
        new Track(id, category, type);
    };
    dynamicVideoEvent('headlines1-yt-player');
    dynamicVideoEvent('campaign-yt-player');
    classEvent('partageFb');
});
