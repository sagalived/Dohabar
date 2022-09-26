jQuery(document).ready(function ($) {

    $('.menu-mobile').click(function () {
	
		$('#nav').addClass('menu-cel');
    
	});
	
    $('#nav').click(function () {
		
		$('#nav').removeClass('menu-cel')
    });

});

var tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/player_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var tv,
		playerDefaults = {autoplay: 0, autohide: 1, modestbranding: 0, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 0, iv_load_policy: 3, loop: 1};
var vid = [
			{'videoId': 'qMG4AyTCYb8', 'startSeconds': 12, 'endSeconds': 60, 'suggestedQuality': 'hd720'},
			{'videoId': 'cy1CyQg8MH0', 'startSeconds': 14, 'endSeconds': 60, 'suggestedQuality': 'hd720'},
			{'videoId': 'ONohCIvhSzg', 'startSeconds': 90, 'endSeconds': 100, 'suggestedQuality': 'hd720'},
			{'videoId': 'cy1CyQg8MH0', 'startSeconds': 90, 'endSeconds': 105, 'suggestedQuality': 'hd720'},
			{'videoId': 'ONohCIvhSzg', 'startSeconds': 11, 'endSeconds': 60, 'suggestedQuality': 'hd720'},
			{'videoId': 'qMG4AyTCYb8', 'startSeconds': 60, 'endSeconds': 90, 'suggestedQuality': 'hd720'},
			{'videoId': 'cy1CyQg8MH0', 'startSeconds': 30, 'endSeconds': 90, 'suggestedQuality': 'hd720'},
			{'videoId': 'qMG4AyTCYb8', 'startSeconds': 90, 'endSeconds': 100, 'suggestedQuality': 'hd720'},
			{'videoId': 'cy1CyQg8MH0', 'startSeconds': 60, 'endSeconds': 100, 'suggestedQuality': 'hd720'},
			{'videoId': 'ONohCIvhSzg', 'startSeconds': 60, 'endSeconds': 90, 'suggestedQuality': 'hd720'},
		],
		randomVid = Math.floor(Math.random() * vid.length),
    currVid = randomVid;

$('.hi em:last-of-type').html(vid.length);

function onYouTubePlayerAPIReady(){
  tv = new YT.Player('tv', {events: {'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange}, playerVars: playerDefaults});
}

function onPlayerReady(){
  tv.loadVideoById(vid[currVid]);
  tv.mute();
}

function onPlayerStateChange(e) {
  if (e.data === 1){
    $('#tv').addClass('active');
    $('.hi em:nth-of-type(2)').html(currVid + 1);
  } else if (e.data === 2){
    $('#tv').removeClass('active');
    if(currVid === vid.length - 1){
      currVid = 0;
    } else {
      currVid++;  
    }
    tv.loadVideoById(vid[currVid]);
    tv.seekTo(vid[currVid].startSeconds);
  }
}

function vidRescale(){

  var w = $(window).width()+200,
    h = $(window).height()+200;

  if (w/h > 16/9){
    tv.setSize(w, w/16*9);
    $('.tv .screen').css({'left': '0px'});
  } else {
    tv.setSize(h/9*16, h);
    $('.tv .screen').css({'left': -($('.tv .screen').outerWidth()-w)/2});
  }
}

$(window).on('load resize', function(){
  vidRescale();
});

$('.hi span:first-of-type').on('click', function(){
  $('#tv').toggleClass('mute');
  $('.hi em:first-of-type').toggleClass('hidden');
  if($('#tv').hasClass('mute')){
    tv.mute();
  } else {
    tv.unMute();
  }
});

$('.hi span:last-of-type').on('click', function(){
  $('.hi em:nth-of-type(2)').html('~');
  tv.pauseVideo();
});
