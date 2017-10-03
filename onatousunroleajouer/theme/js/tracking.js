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
	['WEBDOCU_LP_unroleajouer17', 'webdoc'],
	['TEASERBRUNO_LP_unroleajouer17', 'TEASERBRUNO'],
	['TEASERPARENTS_LP_unroleajouer17', 'TEASERPARENTS'],
	['TEASERACTEURS_LP_unroleajouer17', 'TEASERACTEURS'],
	['DECORFB_LP_unroleajouer17', 'DECORFB'],
	['PARTAGEFB_LP_unroleajouer17', 'PARTAGEFB'],
	['PARTAGETW_LP_unroleajouer17', 'PARTAGETW'],
	['SUIVIFB_LP_unroleajouer17', 'SUIVIFB'],
	['SUIVITW_LP_unroleajouer17', 'SUIVITW'],
	['SUIVIINSTA_LP_unroleajouer17', 'SUIVIINSTA'],
	['SUIVITW_YT_unroleajouer17', 'SUIVITW_YT'],
	['BTNDON_LP_unroleajouer17', 'BTNDON']
];

$(document).ready(function() {
    for (var i = 0; i < categoryToTrack.length; i++){
        console.log('id: ' + categoryToTrack[i][1]);
        $(document).on('click', '#' + categoryToTrack[i][1], function() {
            trackCategory(categoryToTrack[i][0]);
        });
    };
});
