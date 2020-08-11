// requestAnimationFrame polyfill
(function() {
	var lastTime = 0;
	var vendors = ['webkit', 'moz'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame =
		window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); },
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			};
		}());
// end requestAnimationFrame polyfill

(function ($) {
    var $win = $(window);
    var $doc = $(document);
    var dirty = { resize: false, scroll: false };

    (function animationTick(){
    	requestAnimationFrame(animationTick);

    	if(dirty.resize) {
        homeAnimation();
    		dirty.resize = false;
    	}

    	if(!dirty.scroll) {
    		return;
    	}

    	parallaxMain();

    	dirty.scroll = false;
    }());

    function homeAnimation(){
      var logoHover = anime.timeline({
        autoplay: false,
        easing: 'easeOutBack'
      });
      logoHover
      .add({
        targets: '.custom-logo-link p',
        scaleX: 0.85,
        duration: 1
      },0)
      .add({
        targets: '.custom-logo-link svg',
        duration: 150,
        opacity: 0,
        scaleY: .85
      })
      .add({
        targets: '.custom-logo-link p',
        opacity: 1,
        scaleX: 1,
        duration: 150
      },'-=125');
      $('.custom-logo-link').hover(
        function(){
          if (logoHover.reversed) logoHover.reverse();
          logoHover.play();
        },
        function(){
          if (!logoHover.reversed) logoHover.reverse();
          logoHover.play();
        }
      );
    }

    function parallaxMain() {
        var scrolltop = window.pageYOffset
        var a = 0.1 + (scrolltop * .0018)
        var scrollEase = Math.pow(scrolltop, a)

    	if($win.width() > 960){
    		var scroll = document.getElementById('scroll')
        var scroll2 = document.getElementById('particles-js')
        	var scrollValue = scrolltop * -.01
          if ($("body").hasClass("home")){
            scroll.style.top = scrollValue + 'rem'
            scroll2.style.top = scrollValue*1.5 + 'rem'
          }else {
            scroll2.style.opacity = 1 - scrollValue*-0.15
          }
    	}
    }

    $doc.ready(function(){

    if ($("body").hasClass("home")){
      particlesJS("particles-js", {
        particles: {
            number: { value: 21, density: { enable: true, value_area: 800 } },
            color: { value: "#fa726e" },
            shape: { type: "polygon", polygon: { nb_sides: 4 } },
            opacity: { value: 1, random: false, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 4, random: true, anim: { enable: false, speed: 3, size_min: 40, sync: false } },
            line_linked: { enable: false, distance: 200, color: "#ffffff", opacity: 1, width: 2 },
            move: { enable: true, speed: 0.25, direction: "bottom-right", random: false, straight: false, out_mode: "out", bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } },
        },
				"interactivity": {
			    "detect_on": "canvas",
			    "events": {
			      "onhover": {
			        "enable": false,
			      },
			      "onclick": {
			        "enable": false,
			      },
			      "resize": true
			    },
			  },
        retina_detect: true,
    });
  } else {
    particlesJS("particles-js", {
      particles: {
          number: { value: 42, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          shape: { type: "polygon", polygon: { nb_sides: 4 } },
          opacity: { value: 1, random: false, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
          size: { value: 4, random: true, anim: { enable: false, speed: 3, size_min: 40, sync: false } },
          line_linked: { enable: false, distance: 200, color: "#ffffff", opacity: 1, width: 2 },
          move: { enable: true, speed: 0.25, direction: "none", random: false, straight: false, out_mode: "out", bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } },
      },
			"interactivity": {
				"detect_on": "canvas",
				"events": {
					"onhover": {
						"enable": false,
					},
					"onclick": {
						"enable": false,
					},
					"resize": true
				},
			},
      retina_detect: true,
  });
  }

    });
  	$win.load(function() {
      if($win.width() > 960){
        homeAnimation();
      }

    });
    $win.scroll(function() {dirty.scroll = true;});
    $win.resize(function() {dirty.resize = true;});

})(jQuery);
