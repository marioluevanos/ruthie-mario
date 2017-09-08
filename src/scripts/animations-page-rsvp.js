import { TimelineMax, TweenMax } from 'gsap';

export default function() {
	return {
		leave(next) {
			return new TimelineMax({
				onComplete() {
					next();
				}
			})
		},
		enter(context) {
			return new TimelineMax({
				onStart() {
					document.querySelector('#page-rsvp .monogram').classList.add('not-entered');
				},
				onComplete() {
					document.querySelector('#page-rsvp .monogram').classList.remove('not-entered');
				}
			})	
		}
	};
};