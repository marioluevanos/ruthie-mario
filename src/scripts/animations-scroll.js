import ScrollMagic from 'scrollmagic';
import { TimelineMax } from 'gsap';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
// import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import '../scripts/gsap.SplitText';
import { shuffleArray } from '../scripts/utils';

export default function(controller) {

	/* 
		Parallaxing Elements
		------------------------------------------------------ 
	*/

	let elements = Array.from(document.querySelectorAll('.scroll-anim'));

	elements.forEach((element, i) => {

		/* 
			Checking classNames, then assigning a different 
			start and end translateY values for each element

		*/
		const ifClassName = name => element.classList.contains(name);

		const elementTimeline = new TimelineMax();
		const elementScene = new ScrollMagic.Scene({
			triggerElement: element,
			duration: '300%',
			triggerHook: 1,
		});

		/* Apply a smooth transition to all the elements */
		element.style.transition = 'all 0.15s linear';

		let y1 = 
			ifClassName('texture-header') 	? '20%' :
			ifClassName('flower-2') 		? '50%' :
			ifClassName('countdown') 		? '50%' :
			ifClassName('texture-3') 		? '30%' :
			ifClassName('icon-drink') 		? '50%' :
			ifClassName('flower-3') 		? '30%' : 
			ifClassName('detail-inner') 	? '30%' :
			ifClassName('google-map-wrap')	? '30%' : 
			ifClassName('subtitle') 		? '0%' :
			ifClassName('icon-birds') 		? '-50%' : 
			ifClassName('photo-gallery') 	? '0%' : 
			'0%';

		let y2 = 
			ifClassName('texture-header') 	? '-30%' :
			ifClassName('flower-2') 		? ' 10%' :
			ifClassName('countdown') 		? '-100%' :
			ifClassName('texture-3') 		? '-30%' :
			ifClassName('icon-drink') 		? '-300%' :
			ifClassName('flower-3') 		? '-30%' : 
			ifClassName('detail-inner') 	? '-30%' :
			ifClassName('google-map-wrap')	? '-60%' :
			ifClassName('subtitle') 		? '-300%' : 
			ifClassName('icon-birds') 		? '-200%' :
			ifClassName('photo-gallery') 	? '-10%' :
			'0%';

		if(ifClassName('ep-1')) {

			elementTimeline.fromTo(element, 2.5, 
				{ y: '-40%', x: '-50%', ease: Power0.easeNone }, 
				{ y: '-65%', x: '-50%', scale: 1.1, ease: Power0.easeNone });	
		}
		else if(ifClassName('ep-2')) {
			
			elementTimeline.fromTo(element, 2.5, 
				{ y: '-40%', x: '-60%', ease: Power0.easeNone }, 
				{ y: '-90%', x: '-60%', ease: Power0.easeNone });	
		}
		else {
			elementTimeline.fromTo(element, 2.5, 
				{ y: y1, ease: Power0.easeNone }, 
				{ y: y2, ease: Power0.easeNone });
		}
		
		elementScene
			.setTween(elementTimeline)
			.addTo(controller);
	});

	/* 
		Split Text
		------------------------------------------------------ 
	*/

	let splitText = new SplitText('.split-text', {
		type 		: 'chars words',
		charsClass 	: 'char',
	});

	TweenMax.set(splitText.chars, { y: -300 });

	splitText.elements.forEach(title => {

		const textTimeline = new TimelineMax({ paused: true });
		const textScene = new ScrollMagic.Scene({
			triggerElement: title,
			duration: '200%',
			triggerHook: 1,
		});
		
		let chars = title.querySelectorAll('.char');
		let delay = Math.abs((1/chars.length).toFixed(4));
		
		textTimeline
		.staggerFromTo(chars, 1, {
			y: -300,
			ease: Power4.easeIn
		}, {
			y: 0,
			ease: Power4.easeOut
		}, delay, 0);

		textScene
			.on('enter leave', e => e.type === 'enter' ? textTimeline.play() : textTimeline.reverse())
			//.setTween(textTimeline)
			.addTo(controller)
	});

	//------------------------------------------------------ //

	let splitLines = new SplitText('.split-lines', {
		type 		: 'lines chars',
		linesClass 	: 'line',
		charsClass 	: 'line-char',
	});

	splitLines.elements.forEach((line, index) => {

		const textTimeline = new TimelineMax({ paused: true });
		const textScene = new ScrollMagic.Scene({
			triggerElement: line,
			duration: '200%',
			triggerHook: 1,
		});
		
		let lines = line.querySelectorAll('.line');
		let lineChars = line.querySelectorAll('.line-char');
		let delay = Math.abs((1/lines.length).toFixed(4));
		
		textTimeline
		.staggerFromTo(lineChars, 1, {
			autoAlpha: 0,
			ease: Power4.easeIn
		}, {
			autoAlpha: 1,
			ease: Power4.easeOut
		}, 1/lineChars.length, 0);

		textScene
			.on('enter leave', e => e.type === 'enter' ? textTimeline.play() : textTimeline.reverse())
			//.setTween(textTimeline)
			.addTo(controller)
	});

	/* 
		Paragraphs
		------------------------------------------------------ 
	*/

	let scrollRise = document.querySelectorAll('.scroll-rise');

	Array.from(scrollRise).forEach(element => {
		
		let scrollRiseTimeline = new TimelineMax({ paused: true });
		let scrollRiseScene = new ScrollMagic.Scene({
			triggerElement: element,
			duration: '300%',
			triggerHook: 1,
		});

		scrollRiseTimeline.fromTo(element, 2, {
			y: 100,
			autoAlpha: 0,
			ease: Expo.easeIn
		}, {
			y: 0,
			autoAlpha: 1,
			ease: Expo.easeOut
		});

		scrollRiseScene
			.on('enter leave', e => e.type === 'enter' ? scrollRiseTimeline.play() : scrollRiseTimeline.reverse())
			.addTo(controller)

	});
	
	/* 
		Pinning Elements
		------------------------------------------------------ 
	*/

	let proposedText = document.querySelector('#subtitle-proposed-text');
	let sheSaidYesText = document.querySelector('#subtitle-she-said-yes');
	let saidYesTimeline = new TimelineMax({ paused: true })

	.staggerFrom(proposedText.children, 0.6, {
		scaleX: 0,
		y: '200%',
		ease: Circ.easeOut
	}, 0.6/proposedText.children.length)
	.staggerFromTo(sheSaidYesText.children, 0.6, {
		autoAlpha: 0,
		y: '200%',
		ease: Power2.easeIn
	}, {
		autoAlpha: 1,
		y: '0%',
		ease: Power2.easeOut
	}, 0.6/sheSaidYesText.children.length, '-=0.45')
	.fromTo('.proposal', 0.6, {
		autoAlpha: 0,
		ease: Power2.easeIn
	}, {
		autoAlpha: 1,
		ease: Power2.easeOut
	}, '-=0.45')
	.fromTo('.proposal-video-poster', 1, {
		scale: 1.01,
		ease: Power2.easeIn
	}, {
		scale: 1.5,
		ease: Power2.easeOut
	}, '-=0.75')

	new ScrollMagic.Scene({
		triggerElement: 'section.she-said', 
		duration: '200%',
		triggerHook: 0.5,
	})
	.on('enter leave', ({ type }) => type === 'enter' ? saidYesTimeline.play() : saidYesTimeline.reverse())
	.addTo(controller);

	/* 
		Overlays
		------------------------------------------------------ 
	*/

	let overlays = document.querySelectorAll('.overlay');

	Array.from(overlays).forEach(overlay => {
		
		let overlayTimeline = new TimelineMax({ paused: true });
		let overlayScene = new ScrollMagic.Scene({
			triggerElement: overlay.parentElement,
			duration: (window.innerHeight * 2),
			triggerHook: 1,
		});

		let contains = className => overlay.parentElement.classList.contains(className);
		var overlayFrom, overlayTo;

		if (contains('google-map-wrap')) {
			overlayFrom = 	{ scaleY: 0, ease: Power4.easeOut };
			overlayTo = 	{ scaleY: 1, ease: Power4.easeIn, transformOrigin: '50% 100%' };
		}
		else if (contains('registry')) {
			overlayFrom = 	{ scaleY: 0, ease: Power4.easeOut };
			overlayTo = 	{ scaleY: 1, ease: Power4.easeIn, transformOrigin: '50% 100%' };
		}
		else {
			overlayFrom = 	{ };
			overlayTo = 	{ };
		}

		overlayTimeline.fromTo(overlay, 1, overlayTo, overlayFrom);

		overlayScene
			// .addIndicators()
			.on('enter leave', e => e.type === 'enter' ? overlayTimeline.play() : overlayTimeline.reverse())
			.addTo(controller)
	});

	/* 
		Gallery
		------------------------------------------------------ 
	*/

	let galleryElement = document.querySelector('.photo-gallery');
	let galleryTimeline = new TimelineMax();
	let galleryScene = new ScrollMagic.Scene({
		triggerElement: '.photos',
		duration: (galleryElement.children.length * 100) + '%',
		triggerHook: 0
	});


	galleryTimeline.fromTo('.photo-gallery', parseInt(galleryElement.children.length), {
		x: '0',
		ease: Power0.easeNone
	}, {
		x: '-100%',
		ease: Power0.easeNone
	});

	galleryScene
		.setPin('.photos')
		.setTween(galleryTimeline)
		.addTo(controller)


	/* 
		Footer
		------------------------------------------------------ 
	*/

	const footerFlower = document.querySelector('.wedding-image.flower-4');
	const footerFlowerTimeline = new TimelineMax({ paused: true });
	const footerFlowerScene = new ScrollMagic.Scene({
		triggerElement: footerFlower,
		duration: '100%',
		triggerHook: 1,
	});

	footerFlowerTimeline
	.fromTo(footerFlower, 4, {
		y: '100%',
		ease: Power4.easeIn
	}, {
		y: '0%',
		ease: Power4.easeOut
	}, 0);

	footerFlowerScene
		.on('enter leave', e => e.type === 'enter' ? footerFlowerTimeline.play() : footerFlowerTimeline.reverse())
		.addTo(controller)
}