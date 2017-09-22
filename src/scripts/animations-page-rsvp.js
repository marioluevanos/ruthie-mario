import { TimelineMax, TweenMax } from 'gsap';

export default function() {
	return {
		leave(next) {
			return new TimelineMax({
				onComplete() {
					next();
				}
			})
			.to('#page-rsvp', 0.6, {
				autoAlpha: 0,
				ease: Power2.easeOut
			})
		},
		enter(context) {

			let ctx = context.$el;
			let overlay = ctx.querySelectorAll('.overlay');
			let text = ctx.querySelectorAll('.inner p span');
			let step1Button = ctx.querySelector('.step-1-button');
			let inputElement = ctx.querySelector('#rsvp-input');
			let inputPlaceholder = ctx.querySelector('.input-placeholder');

			/* Collect all items in one array */
			let textElemets = [text].reduce((all, item) => all.concat(Array.from(item)), []);

			return new TimelineMax({
				onStart() {
					document.querySelector('.monogram').classList.add('not-entered');
				},
			})
			.to(overlay[0], 1, {
				transformOrigin: '100% 50%',
				scaleX: 0,
				ease: Power4.easeIn
			}, 'overlay')
			.to(overlay[1], 1, {
				transformOrigin: '100% 50%',
				scaleX: 0,
				ease: Power4.easeIn
			}, 'overlay+=0.15')

			.staggerFromTo(textElemets, 0.6, {
				autoAlpha: 0,
				y: 60,
				ease:Back.easeOut.config(1)
			}, {
				autoAlpha: 1,
				y: 0,
				ease:Back.easeOut.config(1)
			},
			0.6/textElemets.length)
			.fromTo(inputElement, 0.3, {
				scaleX: 0,
				ease: Back.easeOut.config(1)
			}, {
				scaleX: 1,
				ease: Back.easeOut.config(1)
			}, 'last')
			.fromTo(step1Button, 0.3, {
				autoAlpha: 0,
				ease: Back.easeOut.config(1)
			}, {
				autoAlpha: 1,
				ease: Back.easeOut.config(1)
			}, 'last')
			.fromTo(inputPlaceholder, 0.3, {
				autoAlpha: 0,
				ease: Back.easeOut.config(1)
			}, {
				autoAlpha: 1,
				ease: Back.easeOut.config(1),
				onComplete() {
					setTimeout(()=> {
						document.querySelector('.monogram').classList.remove('not-entered');
					}, 400);
					
				}
			}, 'last')
			

		}
	};
};