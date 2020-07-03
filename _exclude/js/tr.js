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
    		dirty.resize = false;
    	}

    	if(!dirty.scroll) {
    		return;
    	}

    	parallaxMain();

    	if ( $win.width() < 1279) {
			clearParallax();
		}
    	dirty.scroll = false;
    }());

    function parallaxMain() {
        var scrolltop = window.pageYOffset
        var a = 0.1 + (scrolltop * .0018)
        var scrollEase = Math.pow(scrolltop, a)

    	if($win.width() > 960 && $('body.home').length){
    		var scroll = document.getElementById('scroll')
        	var scrollValue = scrolltop * -.01 - 16

        	scroll.style.backgroundPosition = '-8rem ' + scrollValue + 'rem'

    	}
    	if($win.width() > 1280 && $('body.page-template-case-study .tr-casestudy-top').length){
    	    var b = document.getElementsByClassName('tr-casestudy-top');
	    	var c = b[0].children;

        	c[0].style.left = scrollEase * -0.2 + 'px'
        	c[0].style.opacity= -scrollEase * 0.0004 + 1

        	c[1].style.right = scrollEase * -0.2 + 'px'
        	c[1].style.opacity= -scrollEase * 0.0004 + 1
        }
    }

    function clearParallax(){
    	if( $('body.page-template-case-study .tr-casestudy-top').length ){
    	    var b = document.getElementsByClassName('tr-casestudy-top');
	    	var c = b[0].children;

        	c[0].style.left = 0
        	c[0].style.opacity= 1

        	c[1].style.right = 0
        	c[1].style.opacity= 1
        }
    }





    $doc.ready(function(){

    });

	$win.load(function() {
        var hasbulbed = false;

        var bulb1 = anime.timeline({
          easing: 'easeOutExpo',
          duration: 750,
          autoplay: false,
        });
        bulb1
        .add({
            targets: '#mouth, #mouth-cover',
            opacity: '0',
            duration: 0,
        }, 0)
        .add({
            targets: '.tr-navigation-sub-wrapper li',
            translateY: [60, 0],
            opacity: [0, 1],
            duration: 400,
            delay: anime.stagger(100),
            easing: 'easeOutQuart',
        }, 0)
        .add({
          targets: '.bulb-box',
          opacity: 1,
          translateY: ['75%', '0%'],
          translateX: ['-90%', '0%'],
          rotate: ['90deg', '0deg'],
          delay: 750,
          duration: 750,
          easing: 'spring(1, 85, 10, 0)',
        })
        .add({
          targets: '#bulb-middle',
          translateY: ['30px', '0'],
          translateX: ['-18px', '0'],
          rotate: ['6deg', '0deg'],
          easing: 'spring(1, 42, 10, 10)',
          duration: 250,
        }, '-=1650')
        .add({
          targets: '#bulb-bottom',
          translateY: ['32px', '0'],
          translateX: ['-20px', '0'],
          rotate: ['6deg', '0deg'],
          easing: 'spring(1, 42, 10, 14)',
          duration: 250,
        }, '-=1652')
        .add({
            targets: '#eyes circle',
            opacity:[
                { value: [0,1], duration: 20 },
                { value: 0, duration: 75},
                { value: 1, duration: 20, delay: 500},
                { value: 0, duration: 75},
                { value: 1, duration: 300},
            ],
        duration: 100,
        easing: 'easeInOutSine',
        })
        .add({
          targets: '#left-eye',
          translateX: 32,
          delay: 500,
        })
        .add({
          targets: '#right-eye',
          translateX: 28,
          delay: 500,
        }, '-=1250')
        .add({
          targets: '.bulb-box',
          rotate: '9deg',
          duration: 1250,
          easing: 'spring(0.1, 25, 50, 20)',
        }, '-=750')
        .add({
          targets: '#eyes',
          keyframes: [
            {translateY: 5, delay: 350, duration: 400},
            {translateY: 7, translateX: '-=0.5'},
            {translateY: 11, translateX: '-=1'},
            {translateY: 0, translateX: '+=1.5', delay: 750}
          ],
          duration: 350,
          delay: 500,
        })
        .add({
          targets: '#left-eye',
          translateX: 0,
          delay: 1000,
          duration: 750,
        })
        .add({
          targets: '#right-eye',
          translateX: 0,
          delay: 1000,
          duration: 750,
        }, '-=1750')
        .add({
            targets: '#mouth, #mouth-cover',
            opacity: '100',
            duration: 0,
        })
        .add({
          targets: '.bulb-box',
          translateY: [
              {value: '+=5'},
              {value: '-=5', delay: 25},
              ],
          rotate: [
              {value: '+=2'},
              {value: '-=2', delay: 25},
              ],
          duration: 750,
          easing: 'easeOutExpo',
          complete: function(anim) {
            hasbulbed = true;
          }
        }, '-=500')
        .add({
          targets: '.bulb-box',
          rotate: '5deg',
          duration: 750,
          easing: 'easeOutCubic',
        })
        .add({
          targets: '#mouth-cover',
          translateY: -25,
          delay: 500,
          duration: 3000,
          easing: 'easeOutExpo',
        }, '-=1250')
        .add({
          targets: '#mouth',
          fill: ['#fff', '#FA726E'],
          duration: 2000,
          easing: 'easeOutExpo',
        }, '-=3000')
        .add({
          targets: '#bulb-top',
          fill: ['#fff', '#FFDA31'],
          duration: 2000,
          easing: 'easeOutExpo',
        }, '-=3000')
        .add({
          targets: '#bulb-middle',
          fill: ['#fff', '#FFA656'],
          duration: 2000,
          easing: 'easeOutExpo',
        }, '-=3300')
        .add({
          targets: '#bulb-bottom',
          fill: ['#fff', '#FA726E'],
          duration: 2000,
          easing: 'easeOutExpo',
        }, '-=3600')
        .add({
          targets: '#bulb-bg, #mouth-cover',
          fill: ['#2D3233', '#FFFFE2'],
          duration: 2000,
          easing: 'easeOutExpo',
        }, '-=3000')
        .add({
          targets: '#eyes circle',
          fill: ['#fff', '#2D3233'],
          duration: 2000,
          easing: 'easeOutExpo',
        }, '-=3000')
        .add({
            targets: '.tr-navigation-sub-wrapper li a, #close-nav',
            color: ['#fff', '#2D3233'],
            duration: 1200,
            easing: 'easeOutQuart',
        }, '-=3500')
        .add({
            targets: '#tr-navigation-wrapper',
            background: ['#2D3233', '#fff'],
            duration: 1200,
            easing: 'easeOutQuart',
        }, '-=2900')
        ;

        var bulbawkward = anime.timeline({
          easing: 'easeOutExpo',
          duration: 750,
          autoplay: false,
        });

        bulbawkward
        .add({
          targets: '#mouth-cover',
          translateY: -25,
          duration: 1,
          delay: 1,
        })
        .add({
          targets: '#mouth-cover',
          translateY: -21,
          duration: 300,
          delay: 500,
        })
        .add({
          targets: '#eyes',
          translateX: [
              {value: '+=2', duration: 25},
              {value: '+=1', delay: 250, duration: 75},
              {value: '-=6', delay: 750},
              {value: '+=3', delay: 750, duration: 500},
              ],
          duration: 750,
          easing: 'easeOutExpo',
        }, '-=-325')
        .add({
          targets: '#mouth-cover',
          translateY: -25,
          duration: 500,
        }, '-=350')

	    var navButton = document.getElementById('tr-nav-toggle');
	    var navClose = document.getElementById('close-nav');

        navButton.onclick = function(e) {
            var scrolled = $doc.scrollTop();

            $("#tr-navigation-wrapper").css({
                display: 'flex',
                top: scrolled
            });
            $("#tr-navigation-wrapper").animate({opacity: 1}, 250);
            $("body, #page").css("overflow-y", "hidden");

            if($win.width() > 960  && !hasbulbed){
            bulb1.restart();
            } else if($win.width() > 960  && hasbulbed){
                bulbawkward.play();
            } else if($win.width() <= 960){
                anime({
                    targets: '.tr-navigation-sub-wrapper li',
                    translateY: [60, 0],
                    opacity: [0, 1],
                    duration: 400,
                    delay: anime.stagger(100),
                    easing: 'easeOutQuart',
                });
            }

            e.preventDefault();
        };

        var bulbtoclick = document.getElementById('bulb-happy-symbol');

        bulbtoclick.onclick = function() {
            if($win.width() > 960  && !hasbulbed){
                bulb1.seek(9999999);
                hasbulbed = true;
                bulbawkward.play();
            }
        }

        navClose.onclick = function(e) {

            if($win.width() > 960 && !hasbulbed){
                bulb1.restart();
                bulb1.pause();
            }

            if($win.width() <= 960){
                anime({
                  targets: '.tr-navigation-sub-wrapper li',
                  translateY: [0, 60],
                  opacity: [1, 0],
                  duration: 350,
                  delay: anime.stagger(75, {direction: 'reverse'}),
                  easing: 'easeOutQuart',
                });

                $("#tr-navigation-wrapper").delay(350).animate({opacity: 0}, 250, function(){
                $("#tr-navigation-wrapper")
                .css({
                    display: 'none'
                });
                $("body, html, #page").css("overflow-y", "auto");
            });
            } else{
                $("#tr-navigation-wrapper").animate({opacity: 0}, 250, function(){
                $("#tr-navigation-wrapper")
                .css({
                    display: 'none'
                });
                $("body, html, #page").css("overflow-y", "auto");
            });
            }



            e.preventDefault();
        };
	})

    $win.scroll(function() {
    	dirty.scroll = true;
    });
    $win.resize(function() {
    	dirty.resize = true;
    });

})(jQuery);
