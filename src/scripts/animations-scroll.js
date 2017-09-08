import ScrollMagic from 'scrollmagic';
import { TimelineMax } from 'gsap';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
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
			ifClassName('flower-2') 		? '30%' :
			ifClassName('countdown') 		? '50%' :
			ifClassName('texture-3') 		? '30%' :
			ifClassName('icon-drink') 		? '50%' :
			ifClassName('text') 			? '00%' :
			ifClassName('detail-inner') 	? '30%' :
			ifClassName('google-map') 		? '30%' : 
			ifClassName('subtitle') 		? '0%' :
			ifClassName('icon-birds') 		? '-50%' : 
			ifClassName('photo-gallery') 	? '0%' : 
			'0%';

		let y2 = 
			ifClassName('texture-header') 	? '-30%' :
			ifClassName('flower-2') 		? '0%' :
			ifClassName('countdown') 		? '-100%' :
			ifClassName('texture-3') 		? '-30%' :
			ifClassName('icon-drink') 		? '-300%' :
			ifClassName('text') 			? '-50%' :
			ifClassName('detail-inner') 	? '-30%' :
			ifClassName('google-map') 		? '-30%' :
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
		charsClass 	: 'char'
	});

	splitText.elements.forEach(title => {

		title.style.opacity = 0;

		const textTimeline = new TimelineMax({
			paused: true
		});
		const textScene = new ScrollMagic.Scene({
			triggerElement: title,
			duration: '300%',
			triggerHook: 1,
		});

		let duration = 2;

		textTimeline
		.fromTo(title, duration/4, {
			autoAlpha: 0,
			ease: Expo.easeIn
		}, {
			autoAlpha: 1,
			ease: Expo.easeOut
		}, 0)
		.staggerFromTo(splitText.chars, duration, {
			y: -30,
			autoAlpha: 0,
			ease: Power4.easeIn
		}, {
			y: 0,
			autoAlpha: 1,
			ease: Power4.easeOut
		}, duration/splitText.chars.length, '-=0.3');

		textScene
			.on('enter leave', e => e.type === 'enter' && textTimeline.play())
			.addTo(controller)
	});

	/* 
		Paragraphs
		------------------------------------------------------ 
	*/
	
	/* 
		Pinning Elements
		------------------------------------------------------ 
	*/

	// var proposedText = document.querySelector('#subtitle-proposed-text').children;

	// let saidYesTimeline = new TimelineMax({ paused: true })
	// .set('.said-yes', { height: '100vh' })
	// .staggerFrom(proposedText, 0.6, {
	// 	scaleX: 0,
	// 	y: '200%',
	// 	ease: Circ.easeOut
	// }, 0.6/proposedText.length)
	// .staggerTo(proposedText, 0.6, {
	// 	scaleX: 0,
	// 	y: '-200%',
	// 	ease: Circ.easeIn
	// }, 0.6/proposedText.length)
	// .from('#subtitle-she-said-yes', 1, {
	// 	autoAlpha: 0,
	// 	ease: Circ.easeOut
	// })
	// .fromTo('.proposal', 1, {
	// 	position: 'absolute',
	// 	top: '50%',
	// 	left: '50%',
	// 	x: '-50%',
	// 	y: '-50%',
	// 	autoAlpha: 0,
	// 	ease: Power2.easeIn
	// }, {
	// 	autoAlpha: 1,
	// 	ease: Power2.easeOut
	// })
	// new ScrollMagic.Scene({
	// 	triggerElement: 'section.she-said', 
	// 	duration: '300%',
	// 	triggerHook: 0,
	// })
	// .setPin('.said-yes')
	// .setClassToggle('.said-yes', 'pinned')
	// .on('progress', e => saidYesTimeline.progress(e.progress))
	// .addTo(controller);

}