/*
 *
 * Copyright 2014, Derwin Sadiwa - http://www.derwinsadiwa.com
 * Released under the MIT license - http://opensource.org/licenses/MIT
 * 
 */

  (function(yourcode) {

  	yourcode(window.jQuery, window, document);

  }(function($, window, document) {

   $(function() {

	//clone first image
	var node_figs = document.getElementById('slider_content').getElementsByTagName('figure'),
		first_node_figs = node_figs[0],
		fig_wrap = first_node_figs.cloneNode(true);
	document.getElementById('slider_content').appendChild(fig_wrap);

	//clone last image
	var len = $('#slider_content').children('figure').length;
	var last_node_figs = node_figs[len-2],
		fig_last = last_node_figs.cloneNode(true);
	document.getElementById('slider_content').appendChild(fig_last);
	document.getElementById('slider_content').insertBefore(fig_last,first_node_figs);

	var total_slides = $('#slider_content').children('figure').length,
		w_slides_wrapper = total_slides * 100,
		w_percentage = 100/total_slides,
		timeVal = 3000,
		counter = 0,
		timeoutId,
		slides = {
	 		w: $('.slider_content_img').width(),
	 		h: $('.slider_content_img').height(),
	 		nav_animation: 'true'
	 	}

	var setDotNav = function(){

		var slider = document.getElementById('slider');
		slider.innerHTML += '<div id="slider_nav" class="dotstyle dotstyle-dotmove clearfix">'	
		var slider_nav = document.getElementById('slider_nav');
		slider_nav.innerHTML += '<ul id="dot-nav"></ul>';
		var ul = document.getElementById('dot-nav');

		var i = 1;
		while(i < total_slides-1){
			var li = document.createElement('li');
			li.innerHTML += '<a href="javascript:void();">'+i+'</a>'; 
			ul.appendChild(li);
			i++;
		}
		ul.appendChild(document.createElement('li'));
		slider.innerHTML += '<nav id="prev_next_btn"><div id="prev_btn"><i class="ion-chevron-left"></i></div>\n<div id="next_btn"><i class="ion-chevron-right"></i></div></nav>';
	
	}

 	var init = function(){
 		
 		counter = counter + 1;
 		TweenLite.to($('#slider_content'), 0, {css:{left:-(counter*100)+'%'} });
 		setDotNav();
 		setController();
 		initPreloader();

		$('#slider').css({
			'max-width': slides.w+'px',
			overflow: 'hidden'
		});

 		$('#slider_content').css({
 			width: w_slides_wrapper+'%'
 		});

 		$('.slider_content_img').css({
 			width: w_percentage+'%'
 		});

 	}

	// create timer
	var setTimer = function() {
		timeoutId = setTimeout(setTimeFunc, timeVal);
		return false;
	}

	var animateSlides = function(num){

		TweenLite.killTweensOf([$('.dotstyle-dotmove li:last-child'), $('#slider_content')]);
		if(counter <= 0){
			TweenLite.to($('.dotstyle-dotmove li:last-child'), 0.8, { css:{left:(48*(total_slides-3))}, ease:Power2.easeInOut});
		}else if(counter >= total_slides-1){
			TweenLite.to($('.dotstyle-dotmove li:last-child'), 0.8, { css:{left:(48*(num-(total_slides-1)))}, ease:Power2.easeInOut});
		}else{
			TweenLite.to($('.dotstyle-dotmove li:last-child'), 0.8, { css:{left:(48*(num-1))}, ease:Power2.easeInOut});
		}
		TweenLite.to($('#slider_content'), 0.8, {css:{left:-(num*100)+'%'}, ease:Power2.easeInOut });
	}

	var checkNextPrevLimit = function(){

		if (counter < 0){
			counter = total_slides-2;
			$('#slider_content').css({
				left: -(counter*100)+'%'
			});
			counter = counter - 1;
			animateSlides(counter);
		}else if (counter >= total_slides) {
			counter = 1;
			$('#slider_content').css({
				left: -(counter*100)+'%'
			});
			counter = 2;
			animateSlides(counter);
		}else{
			animateSlides(counter);
		}

	}

	// slide animation
	var setTimeFunc = function() {

		counter++;
		checkNextPrevLimit();
		setTimer();
		return false;
		
	}

	var setController = function(){

		$('ul#dot-nav li').each(function(index) {
	  		$(this).click(function(){
	  			counter = index+1;
				animateSlides(counter);
				clearInterval(timeoutId);
			})
		});

		$('#prev_btn').click(function(){
			clearInterval(timeoutId);
			counter--;
			checkNextPrevLimit();
		});

		$('#next_btn').click(function(){
			clearInterval(timeoutId);
			counter++;
			checkNextPrevLimit();
		});

		$('#slider').hover(
			function() {
			    $('#prev_next_btn').fadeIn();
			}, function() {
			    $('#prev_next_btn').fadeOut();
			}
		);
	}

	var initPreloader = function(){
		
		var img_arr = [];

		$('#slider_content figure').each(function(index) {
			var _fig = document.getElementsByTagName('figure');
			_fig[index].innerHTML += '<i class="icon ion-ios7-reloading"></i>';
			var icon_preloader = document.getElementsByClassName('ion-ios7-reloading');
			$('.ion-ios7-reloading').css({
				display: 'block',
				position: 'absolute',
				left: (slides.w/2)-($('.ion-ios7-reloading').width()/2)+'px',
				top: (slides.h/2)-($('.ion-ios7-reloading').height()/2)+'px'
			});
		});

		$('#slider_content figure img').each(function(index) {
			img_arr[index] = new Image();
			img_arr[index].onLoad = imagesLoaded(index);
		});

	}

	var imagesLoaded = function(num){
		$('.ion-ios7-reloading').css({
			display: 'none'
		});
	}

	init();
	setTimer();

   });

  }));