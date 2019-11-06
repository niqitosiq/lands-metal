import $ from 'jQuery';
import { TimelineLite, TweenLite, Linear } from 'gsap';
import ScrollMagic from 'scrollmagic';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js';
import inView from 'in-view';
import Swiper from 'swiper';

$(document).ready(function(){
	scrollAnimation();
	$(".time-manager__item").click(function(){
		$(".time-manager__item").removeClass("active");
		$(this).addClass("active");
	})
	var clients = new Swiper('.clients__slider .swiper-container', {
		parallax: true,
		speed: 1500,
		slidesPerView: 'auto',
	    navigation: {
	        nextEl: '.clients__arrow_right',
	        prevEl: '.clients__arrow_left',
		},
	})
})
$(window).on("load", function(){
	$("body, .header, #main .anim").addClass("loaded");
	inView.offset({top: 0, left: 0, right: 0, bottom: 300});

	const inview = inView(".anim")
	.on("enter", el => {
		$(el).addClass("vi");
	});
	if ($(window).width()>720){
		inview.on("exit", el => {
			$(el).removeClass("vi")
		})
	}
})



function scrollAnimation(){
	// main animation


	const controller = new ScrollMagic.Controller();

	const headerfix = new ScrollMagic.Scene({
		triggerElement: ".main__header",
		triggerHook: 0,
		offset: -100,
	})
		.setClassToggle(".header", "scrolled")
		.addTo(controller);


	if ($(window).width()>720){
		const tween = new TimelineLite();
		tween.add(
			TweenLite.to('.navigation', 1, {
				opacity: 0,
				x: -10,
				y: -150,
				scale: 1.07,
				ease: Power2.easeOut,
				display: 'none',
			})
		)


		const main_height = parseInt($("#main").outerHeight());
		const scene = new ScrollMagic.Scene({
				triggerElement: "#main",
				duration: main_height/2,
				offset: main_height/2,
				triggerHook: 0.5,

			})
			.setTween(tween)
			.addTo(controller);

		const background = new TimelineLite();
		background.to('.main__background', 1, {
				y: 0,
				ease: Power2.easeOut,
			}, "paral").to('#main-line-wrapper', 1, {
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
		projects_TL.to('.projects__cifre', 3, {
			opacity: 1,
			x: 85
		}, "header");
		projects_TL.add("header");
		projects_TL.add("images");
		const showing_trigger = new ScrollMagic.Scene({
			triggerElement: ".projects",
			triggerHook: 0.5,
			duration: 300
		})
		.setTween(projects_TL)
		.addTo(controller)



		const clientTl = new TimelineLite();
		clientTl.to(".clients__backword", 1, {
			x: 530,
			opacity: 1
		}, "client")
		const clientScene = new ScrollMagic.Scene({
			triggerElement: ".clients",
			triggerHook: 0.75,
			duration: $(".clients").outerHeight(),
		})
		.setTween(clientTl)
		.addTo(controller);


		const partnerTl = new TimelineLite();
		partnerTl.to(".partners__image", 1, {
			scale: 1.1,
			opacity: 1,
		})
		const partnerScene = new ScrollMagic.Scene({
			triggerElement: ".partners",
			triggerHook: 0.5,
			duration: $(".partners").outerHeight(),
		})
		.setTween(partnerTl)
		.addTo(controller);



		const aboutTl = new TimelineLite();
		aboutTl.to(".about__circle_c1", 1, {
			scale: 1.25
		}, "back")
		aboutTl.to(".about__circle_c2", 1, {
			scale: 1.65
		}, "back")
		aboutTl.to(".about__backword", 1, {
			x: 0,
			opacity: 1,
		}, "back")
		const aboutScene = new ScrollMagic.Scene({
			triggerElement: ".about",
			triggerHook: 0.7,
			duration: $(".about").outerHeight(),
		})
		.setTween(aboutTl)
		.addTo(controller);


		const withoutTl = new TimelineLite();
		const allBlockHeight = parseInt($(".without").outerHeight()) + parseInt($(".team").outerHeight());
		withoutTl.to(".without__background", 1, {
			y: -($(".without__background").outerHeight()/1.25),
			ease: Power1.easeOut
		}, "back")
		const withoutScene = new ScrollMagic.Scene({
			triggerElement: ".without",
			triggerHook: 0,
			duration: allBlockHeight,
		})
		.setTween(withoutTl)
		.setPin(".without__background")
		.addTo(controller);
		
	}
}