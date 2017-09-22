import { TimelineMax, TweenMax } from 'gsap';

export default function() {
	return {
		leave(next) {
			return new TimelineMax({
				onComplete() {
					next();
				}
			})
			.to('#page-rsvp', 1, {
				autoAlpha: 0,
				ease: Power2.easeOut
			})
		},
		enter(context) {


			let overlay = context.$el.querySelectorAll('.overlay');
			let text = context.$el.querySelectorAll('.inner p span');
			let inputElem = context.$el.querySelectorAll('.input');

			/* Collect all items in one array */
			let textElemets = [text, inputElem].reduce((all, item) => all.concat(Array.from(item)), []);

			return new TimelineMax({
				onStart() {
					document.querySelector('.monogram').classList.add('not-entered');
				},
				onComplete() {
					document.querySelector('.monogram').classList.remove('not-entered');
				}
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
			.staggerFromTo(textElemets.reverse(), 1, {
				autoAlpha: 0,
				y: -100,
				ease: Power4.easeInOut
			}, {
				autoAlpha: 1,
				y: 0,
				ease: Power4.easeInOut
			},
			1/textElemets.length)
		}
	};
};