// IIFE - Immediately Invoked Function Expression
  (function(yourcode) {

    // The global jQuery object is passed as a parameter
  	yourcode(window.jQuery, window, document);

  }(function($, window, document) {

    // The $ is now locally scoped 

   // Listen for the jQuery ready event on the document
   $(function() {

	// The DOM is ready!

	var total_slides;
	var timeVal = 1000;
	var timeoutId;
	var counter = 0;

	var slides = {
 		width: 1000,
 		height: 384,
 		nav_animation: 'true'
 	}

 	function init(){
 		/*$('#slider_content').css({
 		});*/
 	}

	// create timer
	function setTimer() {
		timeoutId = setTimeout(setTimeFunc, timeVal);
		return false;
	}

	function animateBanner(num){
		TweenLite.killTweensOf($('#slider_content'));
		//TweenLite.killTweensOf($('.dotstyle-dotmove li:last-child'));
		TweenLite.to($('#slider_content'), 0.8, {css:{left:-(760*num)}, ease:Power2.easeInOut});
		//TweenLite.to($('.dotstyle-dotmove li:last-child'), 0.8, { css:{left:(48*num)+1}, ease:Power2.easeInOut});
	}

	// slide animation
	function setTimeFunc() {

		counter++;

		if (counter >= total_slides) {
			counter = 0;
			animateBanner(counter);
		} else {
			animateBanner(counter);
		}
		setTimer();
		return false;
		
	}

	init();

   });

   // The rest of the code goes here!


  }));