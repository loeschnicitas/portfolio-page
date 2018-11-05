// MENÜ - Animation zu den Sektionen 
(function ($) {
   'use strict';
    
	$("#site-header a").click(function () {
		var goto = $(this).attr("href");
		var scrollPosneu = $(goto).offset().top;

		$("html").velocity("scroll", {duration: 600, offset: scrollPosneu +"px", mobileHA: false });
			
		return false;
	});
		
		
// START MENÜ AN SCROLL-POSITION ANPASSEN
	var $sections = $('section');  // all content sections
	var $navs = $('nav a');  // all nav sections

	var topsArray = $sections.map(function() {
	return $(this).position().top-200;  // make array of the tops of content
	}).get();                                 
	// sections, with some padding to change the class a little sooner
	var len = topsArray.length;  // quantity of total sections
	var currentIndex = 0;        // current section selected

	var getCurrent = function( top ) {  // take the current top position, and see which
	for( var i = 0; i < len; i++ ) {   // index should be displayed
    	if( top > topsArray[i] && topsArray[i+1] && top < topsArray[i+1]) {
        return i;
    	}
    	else if(top > topsArray[i] && i === topsArray.length-1){return i;}
		}
	};

// on scroll, call the getCurrent() function above, and see if we are in the
// current displayed section. If not, add the "active" class to the current nav, 
// and remove it from the previous "active" nav
	$(window).on("scroll",function(){
	var scrollTop = $(this).scrollTop();
	
	var checkIndex = getCurrent(scrollTop);
		if( checkIndex !== currentIndex ) {
    	currentIndex = checkIndex;
		$(".active").removeClass("active");
    	$navs.eq(currentIndex).addClass("active");	
		}
	});
// ENDE MENÜ AN SCROLL-POSITION ANPASSEN

var resizeTimer;

	$(window).on('resize', function() {

		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
	
		topsArray = $sections.map(function() {
		return $(this).position().top-400;  // make array of the tops of content
		}).get();
            
  		}, 250);

	});

})(window.jQuery || window.Zepto);

