import $ from 'jQuery';
import { TimelineLite, TweenLite, Linear } from 'gsap';
import ScrollMagic from 'scrollmagic';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js';
import inView from 'in-view';


$(document).ready(function(){
	if ($(window).width()>720){
		scrollAnimation();	
	}
})
$(window).on("load", function(){
	$("body, .header, #main .anim").addClass("loaded");
	inView.threshold(0.2);
	$(window).on("scroll", function(){
		inView(".anim")
		.on("enter", el => {
			$(el).addClass("vi");
		})
		.on("exit", el => {
			$(el).removeClass("vi")
		})
	})
})



function scrollAnimation(){
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
	background.to('.main__background', 1, {
			y: 0,
			ease: Power2.easeOut,
		}, "paral").to('.lines__wrapper', 1, {
			opacity: 0,
		}, "paral")
	background.add(
		"paral"
	)
	const main_scene = new ScrollMagic.Scene({
		triggerElement: "#main",
		duration: main_height,
		triggerHook: 0,
	})
	.setTween(background)
	.addTo(controller)
	const projects_TL = new TimelineLite();
	projects_TL.to('.projects__header', 1, {
		opacity: 1,
		y: 0
	}, "header");
	projects_TL.to('.projects__wrapper', 1, {
		opacity: 1,
		y: 0
	}, "images");
	projects_TL.add("header");
	projects_TL.add("images");
	const showing_trigger = new ScrollMagic.Scene({
		triggerElement: ".projects",
		triggerHook: 0.5,
		duration: 300
	})
	.setTween(projects_TL)
	.addTo(controller)
}