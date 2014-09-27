// IIFE - Immediately Invoked Function Expression
  (function(yourcode) {

    // The global jQuery object is passed as a parameter
  	yourcode(window.jQuery, window, document);

  }(function($, window, document) {

    // The $ is now locally scoped 

   // Listen for the jQuery ready event on the document
   $(function() {

	// The DOM is ready!

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

	function setDotNav(){

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

 	function init(){
 		
 		counter = counter + 1;
 		TweenLite.to($('#slider_content'), 0, {css:{left:-(counter*100)+'%'} });
 		setDotNav();
 		setController();

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
	function setTimer() {
		timeoutId = setTimeout(setTimeFunc, timeVal);
		return false;
	}

	function animateSlides(num){

		TweenLite.killTweensOf($('#slider_content'));
		TweenLite.to($('#slider_content'), 0.8, {css:{left:-(num*100)+'%'}, ease:Power2.easeInOut });

		if(counter <= 0){
			TweenLite.killTweensOf($('.dotstyle-dotmove li:last-child'));
			TweenLite.to($('.dotstyle-dotmove li:last-child'), 0.8, { css:{left:(48*(total_slides-3))}, ease:Power2.easeInOut});
		}else if(counter >= total_slides-1){
			TweenLite.killTweensOf($('.dotstyle-dotmove li:last-child'));
			TweenLite.to($('.dotstyle-dotmove li:last-child'), 0.8, { css:{left:0+'%'}, ease:Power2.easeInOut});
		}else{
			TweenLite.killTweensOf($('.dotstyle-dotmove li:last-child'));
			TweenLite.to($('.dotstyle-dotmove li:last-child'), 0.8, { css:{left:(48*(num-1))}, ease:Power2.easeInOut});
		}

	}

	function checkNextPrevLimit(){

		if (counter < 0){
			counter = total_slides-2;
			animateSlides(counter);
			$('#slider_content').css({
				left: -(counter*100)+'%'
			});
			counter = 2;
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
	function setTimeFunc() {

		counter++;
		checkNextPrevLimit();
		setTimer();
		return false;
		
	}

	function setController(){

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

	init();
	setTimer();

   });

   // The rest of the code goes here!

  }));