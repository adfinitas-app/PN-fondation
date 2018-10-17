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
    ['WEBDOCU_LP_unroleajouer18', 'WEBDOCU', 'id'],
    ['TEASERBRUNO_LP_unroleajouer18', 'TEASERBRUNO', 'id'],
    ['TEASERPARENTS_LP_unroleajouer18', 'TEASERPARENTS', 'id'],
    ['TEASERACTEURS_LP_unroleajouer18', 'TEASERACTEURS', 'id'],
    ['DECORFB_LP_unroleajouer18', 'jeLeFais', 'id'],
    ['PARTAGEFB_LP_unroleajouer18', 'partageFb', 'class'],
    ['PARTAGETW_LP_unroleajouer18', 'partageTw', 'class'],
    ['SUIVIFB_LP_unroleajouer18', 'suiviFb', 'id'],
    ['SUIVITW_LP_unroleajouer18', 'suiviTw', 'id'],
    ['SUIVIINSTA_LP_unroleajouer18', 'suiviInsta', 'id'],
    ['SUIVIYT_LP_unroleajouer18', 'suiviYt', 'id'],
    ['BTNDON_LP_unroleajouer18', 'btnDon', 'class']
];

function Track(id, category, type) {
    var element;
  
    if (type === 'id')
        element = document.getElementById(id);
    else if (type === 'class')
        element = document.getElementsByClassName(id);
    if (!element)
        return ;
    function click() {
        trackCategory(category);
    }
    if (type === 'id')
        element.addEventListener('click', click, false);
    else if (type === 'class') {
        for (var i = 0; i < element.length; i++) {
            element[i].addEventListener('click', click, false);
        }
    }
}

var dynamicVideoEvent = function(id) {
    var elem = document.getElementById(id);
    function click(e) {
        e.preventDefault();
        var activeVideo = elem.getAttribute('data-current-video-id');
        var category = '';
        if (activeVideo === 'teaserActeurs') {
            category = 'TEASERACTEURS_LP_unroleajouer18';
        } else if (activeVideo === 'teaserBS') {
            category = 'TEASERBRUNO_LP_unroleajouer18';
        } else if (activeVideo === 'teaserParents') {
            category = 'TEASERPARENTS_LP_unroleajouer18'
        } else if (activeVideo === 'webdoc') {
            category = 'WEBDOCU_LP_unroleajouer18'
        }
        trackCategory(category);
    }
    elem.addEventListener('click', click, false)
};

$(document).ready(function() {
    for (var i = 0; i < categoryToTrack.length; i++) {
        var id = categoryToTrack[i][1];
        var category = categoryToTrack[i][0];
        var type = categoryToTrack[i][2];
        new Track(id, category, type);
    };
    dynamicVideoEvent('headlines1-yt-player');
    dynamicVideoEvent('campaign-yt-player');
});
