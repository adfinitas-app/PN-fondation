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
	['WEBDOCU_LP_unroleajouer17', 'WEBDOCU'],
	['TEASERBRUNO_LP_unroleajouer17', 'TEASERBRUNO'],
	['TEASERPARENTS_LP_unroleajouer17', 'TEASERPARENTS'],
	['TEASERACTEURS_LP_unroleajouer17', 'TEASERACTEURS'],
	['TEASERACTEURS_LP_unroleajouer17', 'headlines1-yt-player']
	['DECORFB_LP_unroleajouer17', 'DECORFB'],
	['PARTAGEFB_LP_unroleajouer17', 'PARTAGEFB'],
	['PARTAGETW_LP_unroleajouer17', 'PARTAGETW'],
	['SUIVIFB_LP_unroleajouer17', 'SUIVIFB'],
	['SUIVITW_LP_unroleajouer17', 'SUIVITW'],
	['SUIVIINSTA_LP_unroleajouer17', 'SUIVIINSTA'],
	['SUIVITW_YT_unroleajouer17', 'SUIVITW_YT'],
	['BTNDON_LP_unroleajouer17', 'BTNDON']
];
function Track(id, category) {
  var element = document.getElementById(id);
  if (!element)
    return ;
    console.log('add click event on: ' + id);
  function click(e) {
      e.preventDefault();
    console.log('Tracked click on this category: ' + category);
  }
  element.addEventListener('click', click, false);
}

$(document).ready(function() {
    for (var i = 0; i < categoryToTrack.length; i++){
        var id = categoryToTrack[i][1];
        var category = categoryToTrack[i][0];
        new Track(id, category);
    };
});
