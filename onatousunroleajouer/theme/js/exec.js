var proto, hongi, YT;

if(!hongi)
	hongi = {};

hongi.development = true;
hongi.settings = {
	splashScreenDuration: 4500,
	splashScreenAllowSkip: false,
	splashScreenForceSkip: false,
	videosData: {
		webdoc: {
			id: 'kwd-ga6g-HY',
			preview: 'theme/mm/preview-webdoc.jpg'
		},
		teaserBS: {
			id: 'KQjHpq8HVy0',
			preview: 'theme/mm/preview-teaser-bs.jpg'
		},
		teaserActeurs: {
			id: 'veZZXl0_5cQ',
			preview: 'theme/mm/preview-teaser-acteurs.jpg'
		},
		teaserParents: {
			id: 'v3TT-DZSnZk',
			preview: 'theme/mm/preview-teaser-parents.jpg'
		}
	},
	urls: {
		facebook: {
			video: 'http://fondation.perce-neige.org/onatousunroleajouer?utm_source=PARTAGEFB_LP_unroleajouer17&utm_medium=facebook&utm_campaign=unroleajouer17',
			campaign: 'http://fondation.perce-neige.org/onatousunroleajouer/campaign.html?utm_source=%20PARTAGETW_LP_unroleajouer17&utm_medium=twitter&utm_campaign=unroleajouer17'
		},
		twitter: {
			// http://fondation.perce-neige.org/onatousunroleajouer/campaign.html?utm_source=%20PARTAGETW_LP_unroleajouer17&utm_medium=twitter&utm_campaign=unroleajouer17
			campaign: 'http://bit.ly/2xO61GN',
			// http://fondation.perce-neige.org/onatousunroleajouer?utm_source=%20PARTAGETW_LP_unroleajouer17&utm_medium=twitter&utm_campaign=unroleajouer17
			video: 'http://bit.ly/2xI6HNF'
		},
		fb_profile: 'https://www.facebook.com/profilepicframes?query=fondation%20perce-neige&selected_overlay_id=485951041782935',
		donate: 'https://donner.perce-neige.org/b?cid=40&lang=fr_FR'
	},
	twitterTexts: {
		campaign: "#ONATOUSUNROLEAJOUER Découvrez les comédiens qui jouent l'un de leurs plus beaux rôles aux côtés de Perce-Neige.",
		video: "#ONATOUSUNROLEAJOUER Découvrez les comédiens qui jouent l'un de leurs plus beaux rôles aux côtés de Perce-Neige."
	},
	isMobile: (/iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(navigator.userAgent.toLowerCase())),
	isTablet: (/ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase()))
};
hongi.get_guid = function(){
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
};

hongi.Application = function(){
	this.state = null;
	this.development = true;
	this.ytPlayers = {};
	this.currentHeadline = null;
	this.headlinesLargeStatus = null;
	this.raceIsYTReady = false;
	this.raceIsHeadlineTargetReady = false;
};
proto = hongi.Application.prototype;

// #################################################### CORE

proto.registerInteractions = function(){
	
	// initialize action buttons (track mouse position for rollover animation)
	$(document).on('mouseenter mouseout click', '.action-button', function(e) {
		var parentOffset = $(this).offset();
		$(this).find('span').css({
			top: e.pageY - parentOffset.top,
			left: e.pageX - parentOffset.left
		});
		return true;
	});
	
	// watch page breakpoint state changes
	$(window).on('changed.zf.mediaquery', function(){
		hongi.app.setHeadlineTarget(Foundation.MediaQuery.atLeast('large'));
	});
	
	// equalizer resize
	this.globalResizeTimeout_ID = null;
	$(window).resize(function() {
		if(hongi.app.globalResizeTimeout_ID != null)
			window.clearTimeout(hongi.app.globalResizeTimeout_ID);
		
		hongi.app.globalResizeTimeout_ID = window.setTimeout(function() {
			hongi.app.refreshEqualizers();
		}, 200);
	});
	
	// headlines menu navigation
	$('#headlines-menu').find('.headline-card').each(function(index){
		if( index >= 3)
			return;
		$(this).on('click', hongi.app.setHeadline.bind(hongi.app, index));
	});
	
	// headlines 1 video playback
	$(document).on('click', '[data-yt-target]', hongi.app.setHeadline1Video);
	
	
	// share campaigns
	$('.campaign-visual').each(function(){
		$(this).on('click', '.icon-link', function(){
			var self = $(this);
			hongi.app.share({
				snetwork: self.attr('data-target'),
				mode: 'campaign'
			});
		});
	});
	
	// share video
	$(document).on('click', '.track-link-video-share', function(){
		/*
		 var url = 'https://www.youtube.com/watch?v=' + hongi.settings.videosData[$('#headlines1-yt-player').attr('data-current-video-id')].id;
		*/
		hongi.app.share({
			snetwork: $(this).attr('data-target'),
			mode: 'video'
		});
	});
	
	this.setLink('.track-link-fb-profile', hongi.settings.urls.fb_profile, true);
	this.setLink('.track-link-donate', hongi.settings.urls.donate, true);
	
	
	// --- init display
	this.setHeadline();
	this.setHeadlineTarget(Foundation.MediaQuery.atLeast('large'));
};
proto.refreshEqualizers = function(){
	if(this.currentHeadline == 0){
		new Foundation.Equalizer($('#equalizer-headlines-section-1')).applyHeight();
	}
	else if(this.currentHeadline == 1){
		new Foundation.Equalizer($('#equalizer-headlines-section-2')).applyHeight();
	}
	
	if(Foundation.MediaQuery.atLeast('large')){
		new Foundation.Equalizer($('#campaign')).applyHeight();
	}
};
proto.setLink = function(selector, url, asblank){
	asblank = asblank != false;
	
	var selected = $(selector);
	
	$(document).on('click', selector, function(e){
		e.preventDefault();
		if(asblank)
			window.open(url, '_blank');
		else
			document.location.href = url;
		return false;
	});
	selected.css({
		'cursor': 'pointer'
	});
};


// #################################################### HEADLINES MENU

proto.setHeadline1Video = function(){
	var videoId = $(this).attr('data-yt-id');
	// console.log('[setHeadline1Video]', videoId);
	hongi.app.setHeadlineVideoContent($(this).attr('data-yt-id'));
};
proto.setHeadlineVideoContent = function(videoId){
	var wrapper, player;
	
	player = hongi.app.ytPlayers['headlines1-yt-player'];
	wrapper = $('#headlines1-yt-player');
	
	// console.log('[setHeadline1Video] video: "' + videoId + '" in player: "headlines1-yt-player"');
	
	wrapper
		.attr('data-current-video-id', videoId)
		.attr('data-thumbnail', hongi.settings.videosData[videoId].preview)
		.find('.thumbnail-container').css({
		'background-image': 'url("' + hongi.settings.videosData[videoId].preview + '")',
		'background-size': 'cover'
	});
	player.loadVideoById({
		videoId: hongi.settings.videosData[videoId].id
	});
	hongi.app.ytPlayVideo(true, wrapper);
	
	// set buttons states
	$('[data-yt-target]').each(function(){
		var mi = $(this);
		if(mi.attr('data-yt-target') == playerId){
			mi.toggleClass('active', mi.attr('data-yt-id') == videoId);
		}
	});
};
proto.setHeadline = function(index){
	// console.log('setHeadline', index);
	
	if(Foundation.MediaQuery.atLeast('large')){
		if(index === this.currentHeadline)
			return;
	}
	else{
		if(index === this.currentHeadline){
			index = -1;
		}
	}
	
	if(this.currentHeadline == 0){
		this.ytPlayVideo(false, $('#headlines1-yt-player'));
	}
	this.currentHeadline = index;
	
	$('#headline-content-indicator').find('.cell').each(function(cellIndex){
		$(this).toggleClass('active', !isNaN(index) && cellIndex == index);
	});
	
	$('#headlines-menu').find('.headline-card').each(function(cellIndex){
		$(this).toggleClass('active', !isNaN(index) && cellIndex == index);
		if(!isNaN(index) && cellIndex == index){
			$('html, body').animate({
				scrollTop: $(this).offset().top
			}, 400);
		}
		
		
	});
	
	$('.headline-section')
		.toggleClass('active', false)
		.hide();
	
	$('#headline-content' + (index + 1))
		.toggleClass('active', true)
		.show();
	
	
	hongi.app.refreshEqualizers();
};
proto.setHeadlineTarget = function(isLargeStatus){
	var largeContainer;
	
	if(isLargeStatus === this.headlinesLargeStatus){
		return;
	}
	this.headlinesLargeStatus = isLargeStatus;
	
	// console.log('[setHeadlineTarget] isLargeStatus: ' + isLargeStatus);
	
	
	if(isLargeStatus){
		largeContainer = $('#headlines-pages-large-container');
		$('#headline-content1').detach().appendTo(largeContainer);
		$('#headline-content2').detach().appendTo(largeContainer);
		$('#headline-content3').detach().appendTo(largeContainer);
	}
	else{
		$('#headline-content1').detach().appendTo($('#container-headlines1'));
		$('#headline-content2').detach().appendTo($('#container-headlines2'));
		$('#headline-content3').detach().appendTo($('#container-headlines3'));
	}
	
	this.raceIsHeadlineTargetReady = true;
	if(this.raceIsYTReady)
		hongi.app.ytInitPlayer('headlines1-yt-player', 'teaserActeurs');
};


// #################################################### STATES

proto.splashScreenOpen = function(){
	// console.info('[Application.splashScreenOpen]');
	
	var splashScreen = $('#page-splash-screen');
	this.splashScreenTl = new TimelineLite();
	
	if(hongi.development || hongi.settings.splashScreenAllowSkip){
		splashScreen.on('click', function(){
			console.warn('[!] user skip splash screen');
			hongi.app.splashScreenTl.stop();
			hongi.app.splashScreenClose();
		});
	}
	
	// apparition timeline
	this.splashScreenTl.add(
		TweenLite.fromTo(
			document.getElementById('splash-screen-title'),
			1.5,
			{ opacity: 0 },
			{ immediateRender: true, opacity: 1 }
		));
	this.splashScreenTl.add(
		TweenLite.fromTo(
			document.getElementById('splash-screen-logo'),
			1,
			{ opacity: 0 },
			{ immediateRender: true, opacity: 1 }
		), '-=.5');
	this.splashScreenTl.add([
		TweenLite.fromTo(
			document.getElementById('splash-screen-chair'),
			1,
			{ opacity: 0 },
			{ immediateRender: true, opacity: 1 }
		),
		TweenLite.fromTo(
			document.getElementById('splash-screen-progress-bar'),
			(hongi.settings.splashScreenDuration * .001) - 2.8,
			{ width: '0%' },
			{ ease: Power0.easeNone, immediateRender: true, width: '100%' }
		)
	], '-=.5');
	
	// text dots animation -> ., .., ..., , ., etc.
	this.splashScreen_animTextItvID = setInterval(this.splashScreenAnimTextTicker, 270);
	
	// site opening timeout
	this.splashScreen_animTextTmoutID = setTimeout(this.splashScreenClose, hongi.settings.splashScreenDuration);
	
	// block page scroll
	$('body').css({
		overflow: 'hidden'
	});
	
	if(hongi.settings.splashScreenForceSkip){
		hongi.app.splashScreenTl.stop();
		hongi.app.splashScreenClose();
	}
};
proto.splashScreenClose = function(){
	var splashScreen = $('#page-splash-screen');
	
	// console.info('[Application.splashScreenClose]');
	
	// release callbacks and listeners
	splashScreen.off('click', hongi.app.splashScreenClose);
	clearInterval(this.splashScreen_animTextItvID);
	clearTimeout(this.splashScreen_animTextTmoutID);
	
	// release page scroll
	$('body').css({ overflow: "auto" });
	
	// scroll to content
	splashScreen.animate( { 'margin-top': '-100vh' }, 750, 'swing', function(){
		splashScreen.remove();
	});
	
	// schedule menu apparition
	setTimeout(function(){
		$('header').css({
			transform: 'translateX(0)'
		}, 1000);
	});
};
proto.splashScreenAnimTextTicker = function(){
	if(isNaN(this.count)){
		this.count = 0;
		this.suffixes = ['', '.', '..', '...'];
		this.target = $('#splash-screen-animated-text');
		this.targetText = this.target.text();
	}
	
	this.target.html( this.targetText + this.suffixes[this.count] + '<span>' + this.suffixes[this.suffixes.length - 1 - this.count] + '</span>');
	
	++this.count;
	this.count %= 4;
};


// #################################################### YOUTUBE

proto.ytInit = function(apiReadyCallback){
	var scriptTag, firstScriptTag;
	
	scriptTag = document.createElement('script');
	scriptTag.src = 'https://www.youtube.com/iframe_api';
	firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
	
	if(apiReadyCallback != null)
		onYouTubeIframeAPIReady = apiReadyCallback;
};
proto.ytOnAPIReady = function(){
	this.ytInitPlayer('campaign-yt-player');
	this.raceIsYTReady = true;
	if(this.raceIsHeadlineTargetReady)
		hongi.app.ytInitPlayer('headlines1-yt-player', 'teaserActeurs');
};
proto.ytInitPlayer = function(playerId, videoId){
	var wrapper, player, html;
	
	wrapper = $('#' + playerId);
	
	// store new settings
	if(videoId == null)
		videoId = wrapper.attr('data-yt-id');
	else{
		wrapper.attr('data-yt-id', videoId);
		wrapper.attr('data-thumbnail', hongi.settings.videosData[videoId].preview);
	}
	wrapper.attr('data-current-video-id', videoId);
	
	
	// reset wrapper content
	wrapper.empty();
	html = '';
	if(!wrapper.hasClass('no-custom-embed')){
		html += '<div class="control-area"></div>'
			+ '<div class="control-button"></div>'
			+ '<div class="thumbnail-container"></div>';
	}
	html += '<div class="yt-player-container">'
		+ '<div class="yt-player-placeholder" id="real_' + playerId + '"></div>'
		+ '</div>';
	$(html).appendTo(wrapper);
	wrapper.find('.thumbnail-container').css({
		'background-image': 'url("' + wrapper.attr('data-thumbnail') + '")',
		'background-size': 'cover'
	});
	
	
	
	player = new YT.Player(wrapper.find('.yt-player-placeholder').attr('id'), {
		height: '100%',
		width: '100%',
		videoId: hongi.settings.videosData[videoId].id,
		playerVars: {
			autoplay: 0,
			rel: 0,
			showinfo: 0
		},
		events: {
			onStateChange: hongi.app._ytStateChanged
		}
	});
	hongi.app.ytPlayers[playerId] = player;
	
	$(document).on('click', '.yt-video-player .control-area', function(){
		hongi.app.ytPlayVideo(true, $(this).closest('.yt-video-player'));
	});
};
proto.ytPlayVideo = function(status, wrapper){
	var playerId = wrapper.closest('.yt-video-player').attr('id');
	var player = hongi.app.ytPlayers[playerId];
	
	// console.log('[ytPlayVideo] status: ' + status);
	
	if(player == null){
		//...
	}
	else if(status){
		wrapper.find('.control-button').fadeOut(800);
		wrapper.find('.control-area').fadeOut(800);
		wrapper.find('.thumbnail-container').fadeOut(400);
		
		wrapper.find('.yt-player-container').show();
		player.playVideo();
		player.addEventListener("onStateChange", hongi.app._ytStateChanged);
	}
	else if(wrapper.find('.thumbnail-container').length >= 1){
		wrapper.find('.control-button').fadeIn(400);
		wrapper.find('.control-area').fadeIn(400);
		wrapper.find('.thumbnail-container').fadeIn(400);
		
		wrapper.find('.yt-player-container').hide();
		player.stopVideo();
	}
};
proto._ytStateChanged = function(e){
	if (e.data == YT.PlayerState.ENDED){
		// console.log('[_ytStateChanged] YT.PlayerState.ENDED on player: ' + $(e.target.a).closest('.yt-video-player').attr('id'));
		hongi.app.ytPlayVideo(false, $(e.target.a).closest('.yt-video-player'), e.target);
	}
};


// #################################################### SHARE

proto.share = function(data){
	var snetwork, mode, url, w, h, top, left, winstatus, req;
	
	mode = data.mode || 'video';
	snetwork = data.snetwork.toLowerCase() || 'twitter';
	url = hongi.settings.urls[snetwork][mode];
	
	switch(snetwork){
		
		case 'twitter':
			// @see  https://dev.twitter.com/web/tweet-button
			// @see  https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup
			// @see  https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started
			// @see  https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/player-card
			req = "http://twitter.com/share?text=" + encodeURIComponent(hongi.settings.twitterTexts[mode]) + "&url=" + encodeURIComponent(url);
			break;
		
		case 'facebook':
		// @see  "Open Graph protocol" http://ogp.me/
			// @see  https://developers.facebook.com/docs/sharing/webmasters
			// @see  https://developers.facebook.com/tools/debug/
			// @see  https://louisem.com/3838/facebook-link-thumbnail-image-sizes
			// @see  https://developers.facebook.com/blog/post/2017/06/27/API-Change-Log-Modifying-Link-Previews/
		default:
			req = 'http://www.facebook.com/sharer/sharer.php?s=100&p[url]='+encodeURIComponent(url);
			break;
	}
	
	w = 600;
	h = 450;
	left = (window.screenX || window.screenLeft || 0) + parseInt((window.innerWidth - w) * .5);
	top = (window.screenY || window.screenTop || 0) + parseInt((window.innerHeight - h) * .5);
	winstatus = "status=1,width=" + w + ",height=" + h + ",left=" + left + ",top=" + top;
	
	window.open(req, 'share-' + snetwork, winstatus);
};


// --- reset scroll position
// avoid strange viewport settings while refreshing page
window.onbeforeunload = function(){
	window.scrollTo(0,0);
};

$(document).ready(function(){
	var app;
	
	// console.log('perce-neige 2017 - hongi.io');
	
	$(document).foundation();
	
	if(!hongi.app)
		app = hongi.app = new hongi.Application();
	app.ytInit(hongi.app.ytOnAPIReady.bind(hongi.app));
	app.registerInteractions();
	app.splashScreenOpen();
	
	
});