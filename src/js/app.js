import $ from 'jQuery';
import { TimelineLite, TweenLite, Linear } from 'gsap';
import ScrollMagic from 'scrollmagic';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js';



$(document).ready(function(){

	// main animation
	const tween = new TimelineLite();
	tween.add(
		TweenLite.to('.navigation', 1, {
			opacity: 0,
			x: -10,
			y: -150,
			scale: 1.07,
			ease: Power2.easeOut,
		})
	)
	const controller = new ScrollMagic.Controller();
	const main_height = parseInt($("#main").outerHeight());
	const scene = new ScrollMagic.Scene({
			triggerElement: "#main",
			duration: main_height/2,
			offset: main_height/2,
			triggerHook: 0.5,

		})
		.setTween(tween)
		.setClassToggle(".header", "scrolled")
		.addTo(controller);


	const background = new TimelineLite();
	background.add(
		TweenLite.to('.main__background', 1, {
			opacity: 0.9,
			ease: Power2.easeOut,
		})
	)
	const main_scene = new ScrollMagic.Scene({
		triggerElement: "#main",
		duration: main_height,
		triggerHook: 0,
	})
	.setTween(background)
	.addIndicators()
	.addTo(controller)

})

