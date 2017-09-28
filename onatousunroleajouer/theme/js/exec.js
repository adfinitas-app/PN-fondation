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
			id: 'kwd-ga6g-HY'
		},
		teaserBS: {
			id: 'e0eRSdQCs4k'
		},
		teaserActeurs: {
			id: 'GHyT1OjHjUA'
		},
		teaserParents: {
			id: 'gQTUmraGC50'
		}
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
};
proto = hongi.Application.prototype;

// #################################################### CORE

proto.registerInteractions = function(){
	
	// console.info('[Application.registerInteractions]');
	
	// --- initialize action buttons (track mouse position for rollover animation)
	$(document).on('mouseenter mouseout click', '.action-button', function(e) {
		var parentOffset = $(this).offset();
		$(this).find('span').css({
			top: e.pageY - parentOffset.top,
			left: e.pageX - parentOffset.left
		});
		return true;
	});
	
	
	// ---   share print campaigns
	$('.campaign-visual').each(function(){
		var block;
		
		// add share actions
		block = $(this);
		
		block.on('click', '.icon-link', function(){
			var self = $(this);
			
			console.log(self.attr('data-target'));
			
			// snetwork, url, title, description, image
			hongi.app.share({
				snetwork: self.attr('data-target'),
				url: 'http://www.kopfstoss.com/pn/',
				image: 'http://www.kopfstoss.com/pn/theme/mm/campagne-perce-neige-2017-bruno-solo.jpg'
				// url: 'http://www.kopfstoss.com/pn/theme/mm/campagne-perce-neige-2017-bruno-solo.jpg'
			});
		});
	});
	
	
	// ---   watch page breakpoint state changes
	$(window).on('changed.zf.mediaquery', function(){
		hongi.app.setHeadlineTarget(Foundation.MediaQuery.atLeast('large'));
	});
	
	
	// ---   equalizer resize
	this.globalResizeTimeout_ID = null;
	$(window).resize(function() {
		if(hongi.app.globalResizeTimeout_ID != null)
			window.clearTimeout(hongi.app.globalResizeTimeout_ID);
		
		hongi.app.globalResizeTimeout_ID = window.setTimeout(function() {
			hongi.app.refreshEqualizers();
		}, 200);
	});
	
	
	this.setLink('.track-link-fb-profile', 'https://www.facebook.com/profile/', true);
	this.setLink('.track-link-donate', 'https://donner.perce-neige.org/b?cid=40&lang=fr_FR', true);
	
	// ---   headlines menu
	$('#headlines-menu').find('.headline-card').each(function(index){
		if( index >= 3)
			return;
		$(this).on('click', hongi.app.setHeadline.bind(hongi.app, index));
	});
	
	
	// --- headlines 1 video menus
	$(document).on('click', '[data-yt-target]', function(){
		var item = $(this),
			targetId = item.attr('data-yt-target'),
			videoId = item.attr('data-yt-id'),
			isActive = item.hasClass('active'),
			player = hongi.app.ytPlayers[targetId];
		
		if(isActive){
			player.getPlayerState() == 1 ? player.pauseVideo() : player.playVideo();
		}
		else{
			$('#' + targetId).attr('data-current-video-id', videoId);
			player.loadVideoById(hongi.settings.videosData[videoId].id);
		}
		
		// set buttons states
		$('[data-yt-target]').each(function(){
			var mi = $(this);
			
			if(mi.attr('data-yt-target') == targetId){
				mi.toggleClass('active', mi.attr('data-yt-id') == videoId);
			}
		});
	});
	
	$(document).on('click', '.track-link-video-share', function(){
		var videoId, snetwork, url;
		
		videoId = $('#headlines1-yt-player').attr('data-current-video-id');
		snetwork = $(this).attr('data-target');
		url = 'https://www.youtube.com/watch?v=' + hongi.settings.videosData[videoId].id;
		
		hongi.app.share({
			snetwork: snetwork,
			url: url
		});
	});
	
	
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
		this.ytPlayers['headlines1-yt-player'].stopVideo();
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
	
	/*
	setTimeout(function(){
		console.log('Foundation:' + Foundation, Foundation, Foundation.reInit);
		Foundation.reInit('equalizer');
	}, 150);
	*/
};
proto.setHeadlineTarget = function(isLargeStatus){
	var largeContainer;
	
	if(isLargeStatus === this.headlinesLargeStatus){
		// console.log('setHeadlineTarget', 'skip process statuses are identical (isLargeStatus: ' + isLargeStatus + ')');
		return;
	}
	
	this.headlinesLargeStatus = isLargeStatus;
	console.log('setHeadlineTarget', 'set status to isLargeStatus: ' + isLargeStatus);
	
	if(isLargeStatus){
		largeContainer = $('#headlines-pages-large-container');
		$('#headline-content1').remove().appendTo(largeContainer);
		$('#headline-content2').remove().appendTo(largeContainer);
		$('#headline-content3').remove().appendTo(largeContainer);
	}
	else{
		$('#headline-content1').remove().appendTo($('#container-headlines1'));
		$('#headline-content2').remove().appendTo($('#container-headlines2'));
		$('#headline-content3').remove().appendTo($('#container-headlines3'));
	}
};


// #################################################### STATES

proto.splashScreenOpen = function(){
	console.info('[Application.splashScreenOpen]');
	
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
	
	console.info('[Application.splashScreenClose]');
	
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
	
	console.log('[Application.ytInit]');
	
	// ---
	console.log('\t - add youtube API script');
	scriptTag = document.createElement('script');
	scriptTag.src = 'https://www.youtube.com/iframe_api';
	firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
	
	if(apiReadyCallback != null)
		onYouTubeIframeAPIReady = apiReadyCallback;
	
	// --- create youtube players
	console.log('\t - create youtube wrappers');
	$('.yt-video-player').each(function(){
		var player, playerUID;
		
		player = $(this);
		playerUID = player.attr('id') || hongi.get_guid();
		console.log('\t\t -  UID: "' + playerUID + '"');
		
		// create sub-elements
		var html = '';
		if(!player.hasClass('no-custom-embed')){
			html += '<div class="control-area"></div>'
				+ '<div class="control-button"></div>'
				+ '<div class="thumbnail-container"></div>';
		}
		html += '<div class="yt-player-container">' +
			'<div class="yt-player-placeholder" id="real_' + playerUID + '"></div>' +
			'</div>';
		$(html).appendTo(player);
		
		// show thumbnail
		player.find('.thumbnail-container').css({
			// 'border': 'red 1px solid',
			'background-image': 'url("' + player.attr('data-thumbnail') + '")',
			'background-size': 'cover'
		});
	});
};
proto.ytOnAPIReady = function(){
	console.log('[Application.ytOnAPIReady]');
	
	$('.yt-video-player').each(function() {
		var wrapper, player, playerObj, playerId, videoId;
		
		wrapper = $(this);
		videoId = wrapper.attr('data-yt-id');
		
		playerObj = wrapper.closest('.yt-video-player');
		playerObj.attr('data-current-video-id', videoId);
		playerId = playerObj.attr('id');
		
		player = new YT.Player(
			wrapper.find('.yt-player-placeholder').attr('id'), {
				height: '100%',
				width: '100%',
				videoId: hongi.settings.videosData[videoId].id,
				playerVars: {
					'autoplay': 0,
					'rel': 0,
					'showinfo': 0
				},
				events: {
					'onStateChange': hongi.app._ytStateChanged
				}
		});
		hongi.app.ytPlayers[playerId] = player;
		
		wrapper.on('click', '.control-area', function(){
			hongi.app.ytPlayVideo(true, wrapper, player);
		});
	});
};
proto.ytPlayVideo = function(status, wrapper, player){
	console.log('[Application.ytPlayVideo] status: ' + status);
	if(status){
		wrapper.find('.control-button').fadeOut(800);
		wrapper.find('.control-area').fadeOut(800);
		wrapper.find('.thumbnail-container').fadeOut(400);
		
		wrapper.find('.yt-player-container').show();
		player.playVideo();
	}
	else{
		wrapper.find('.control-button').fadeIn(400);
		wrapper.find('.control-area').fadeIn(400);
		wrapper.find('.thumbnail-container').fadeIn(400);
		
		wrapper.find('.yt-player-container').hide();
		player.stopVideo();
	}
};
proto._ytStateChanged = function(e){
	if (e.data == YT.PlayerState.ENDED){
		console.log('[Application._ytStateChanged] YT.PlayerState.ENDED');
		hongi.app.ytPlayVideo(false, $(e.target.a).closest('.yt-video-player'), e.target);
	}
};


// #################################################### SHARE

proto.share = function(data){
	var snetwork, url, title, description, image, w, h, top, left, winstatus, req;
	
	snetwork = data.snetwork.toLowerCase()
		|| 'twitter';
	url = data.url
		|| window.location;
	title = data.title
		|| (snetwork == 'twitter' ? $('meta[name="twitter:title"]').attr('content') : $('meta[property="og:title"]').attr('content'));
	
	description = data.description
		|| (snetwork == 'twitter' ? $('meta[name="twitter:description"]').attr('content') : $('meta[property="og:description"]').attr('content'));
	image = data.image
		|| $('meta[property=\'og:image\']').attr('content');
	
	console.log("snetwork", snetwork);
	console.log("title", (snetwork == 'twitter' ? $('meta[name="twitter:title"]').attr('content') : $('meta[property="og:title"]').attr('content')));
	console.log("description", (snetwork == 'twitter' ? $('meta[name="twitter:description"]').attr('content') : $('meta[property="og:description"]').attr('content')));
	
	w = 600;
	h = 450;
	left = (window.screenX || window.screenLeft || 0) + parseInt((window.innerWidth - w) * .5);
	top = (window.screenY || window.screenTop || 0) + parseInt((window.innerHeight - h) * .5);
	winstatus = "status=1,width=" + w + ",height=" + h + ",left=" + left + ",top=" + top;
	
	switch(snetwork){
		case 'twitter':
			// @see  https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started
			req = "http://twitter.com/share?text=" + encodeURIComponent(title + " - " + description) + "&url=" + encodeURIComponent(url);
			break;
		
		case 'facebook':
			// @see  https://developers.facebook.com/docs/sharing/webmasters
			// @see  https://developers.facebook.com/tools/debug/
			// @see  https://louisem.com/3838/facebook-link-thumbnail-image-sizes
			// @see  https://developers.facebook.com/blog/post/2017/06/27/API-Change-Log-Modifying-Link-Previews/
		default:
			req = 'http://www.facebook.com/sharer/sharer.php?s=100&p[url]='+encodeURIComponent(url)+'&p[images][0]=' + image + '&p[title]=' + encodeURIComponent(title) + '&p[summary]='+encodeURIComponent(description);
			break;
	}
	window.open(req, 'share-' + snetwork, winstatus);
};


// --- reset scroll position
// avoid strange viewport settings while refreshing page
window.onbeforeunload = function(){
	window.scrollTo(0,0);
};

$(document).ready(function(){
	var app;
	
	console.log('perce-neige 2017 - hongi.io');
	
	$(document).foundation();
	
	if(!hongi.app)
		app = hongi.app = new hongi.Application();
	app.ytInit(hongi.app.ytOnAPIReady.bind(hongi.app));
	app.registerInteractions();
	app.splashScreenOpen();
	
	
});