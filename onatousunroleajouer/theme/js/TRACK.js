var trackCategory = function(category) {
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
	['TEASERACTEURS_LP_unroleajouer17', 'TEASERFACTEURS'],
	['DECORFB_LP_unroleajouer17', 'DECORFB'],
	['PARTAGEFB_LP_unroleajouer17', 'PARTAGEFB'],
	['PARTAGETW_LP_unroleajouer17', 'PARTAGETW'],
	['SUIVIFB_LP_unroleajouer17', 'SUIVIFB'],
	['SUIVITW_LP_unroleajouer17', 'SUIVITW'],
	['SUIVIINSTA_LP_unroleajouer17', 'SUIVIINSTA'],
	['SUIVITW_YT_unroleajouer17', 'SUIVITW_YT'],
	['BTNDON_LP_unroleajouer17', 'BTNDON']
];

for (var i = 0; i < categoryToTrack.length; i++) {
	$('#' + categoryToTrack[i][1]).click(function() {
		trackCategory(categoryToTrack[i][0]);
	});
};