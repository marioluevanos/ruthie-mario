import {
	TimelineMax,
	TweenMax
} from 'gsap';
import {
	shuffleArray
} from '../scripts/utils';

export default function(context) {

	let diamondShineAnimation = diamondShineAnimationTimeline(context);
	let drinkAnimation = drinkAnimations(context);
	let bubblesAnimation = drinkAnimation.bubblesAnimation;
	let cupAnimation = drinkAnimation.cupAnimation;
	let getElement = s => document.querySelector(s);

	let textSaveTheDate = getElement('#title-save-the-date').children;
	let textRM = getElement('#title-rm').children;
	let textGettingMarried = getElement('#title-are-getting-married').children;
	let textDate = getElement('#title-date').children;

	let overlayHeader = document.querySelectorAll('.overlay-header');

	let allText = Array.from(textSaveTheDate)
	.concat(
		Array.from(textRM),
		Array.from(textGettingMarried),
		Array.from(textDate)
	);

	let enterAnimation = new TimelineMax({
		paused: true
	})
	.delay(2)
	.fromTo(overlayHeader[0], 1, {
		scaleX: 1,
		transformOrigin: '100% 50%',
		ease: Power4.easeIn
	}, {
		scaleX: 0,
		ease: Power4.easeOut
	})
	.fromTo(overlayHeader[1], 1, {
		scaleX: 1,
		transformOrigin: '100% 50%',
		ease: Power4.easeIn
	}, {
		scaleX: 0,
		ease: Power4.easeOut
	}, '-=0.60')
	.fromTo(overlayHeader[2], 1, {
		scaleX: 1,
		transformOrigin: '100% 50%',
		ease: Power4.easeIn
	}, {
		scaleX: 0,
		ease: Power4.easeOut
	}, '-=0.5')


	let introAnimation = new TimelineMax({
		paused: true,
		onComplete() {
			diamondShineAnimation.play();
			bubblesAnimation.timeScale(3).play();
			cupAnimation.timeScale(1).play();
		}
	})
	.staggerFromTo(textSaveTheDate, 0.3, {
		scaleX: 0,
		y: -20,
	}, {
		scaleX: 1,
		y: 0,
		ease: Back.easeOut.config(1, 0.6)
	}, 0.3 / textSaveTheDate.length)
	.staggerFromTo(Array.from(textRM).reverse(), 0.6, {
		scaleX: 0,
		y: -20,
		transformOrigin: '100% 50%'
	}, {
		scaleX: 1,
		y: 0,
		ease: Back.easeOut.config(1, 0.6)
		}, 0.6 / textRM.length, '-=0.3')
	.staggerFromTo(textGettingMarried, 0.6, {
		scaleX: 0,
		y: -20,
	}, {
		scaleX: 1,
		y: 0,
		ease: Back.easeOut.config(1, 0.6)
	}, 0.6 / textGettingMarried.length, '-=0.3')
	.fromTo('#title-line-right', 0.3, {
		scaleX: 0,
		y: -20,
		transformOrigin: '100% 0'
	}, {
		scaleX: 1,
		y: 0,
		ease: Back.easeOut.config(1, 0.6)
	}, '-=0.6')
	.staggerFromTo(Array.from(textDate).reverse(), 0.3, {
		scaleX: 0,
		y: -20,
	}, {
		scaleX: 1,
		y: 0,
		ease: Back.easeOut.config(1, 0.6)
	}, 0.3 / textDate.length, '-=0.3')
	.fromTo('#title-line-left', 0.3, {
		scaleX: 0,
		transformOrigin: '100% 0'
	}, {
		scaleX: 1,
		ease: Back.easeOut.config(1, 0.6)
	}, '-=0.3')
	.fromTo('.header .wedding-button', 0.6, {
		x: -100,
		autoAlpha: 0,
	}, {
		x: 0,
		autoAlpha: 1,
		ease: Back.easeOut.config(1, 0.5)
	}, '-=0.3')
	.staggerFromTo(Array.from(document.querySelector('.header .wedding-button .text').children), 0.3, {
		scaleX: 0,
		x: -10,
		ease: Power2.easeIn
	}, {
		scaleX: 1,
		x: 0,
		ease: Power2.easeOut
	}, 0.075, '-=0.3')
	.fromTo('.icon-ring', 2, {
		y: -400
	}, {
		y: 0,
		ease: Bounce.easeOut
	}, '-=0.75')
	.staggerFromTo(allText, 1, {
		fill: '#aa9c62'
	}, {
		fill: '#001f33',
		ease: Power4.easeOut
	}, 1 / allText.length, 0.3);

	//----------------------------------------------------------

	return {
		leave(next) {
			return new TimelineMax({
				onComplete() {
					next();
				}
			})
			.to('#page-index', 1, {
				autoAlpha: 0,
				ease: Power2.easeOut
			})
		},
		intro: introAnimation,
		enter: enterAnimation
	};
};

function diamondShineAnimationTimeline(context) {
	let diamondShine = context.$el.querySelector('#shines').children;
	return new TimelineMax({
			repeat: -1,
			yoyo: true,
			paused: true
		})
		.staggerFromTo(diamondShine, 1.5, {
			autoAlpha: 0,
			ease: Circ.easeInOut
		}, {
			autoAlpha: 1,
			ease: Circ.easeInOut
		}, 0.1)
		.staggerFromTo(shuffleArray(diamondShine), 1.5, {
			autoAlpha: 0,
			ease: Circ.easeInOut
		}, {
			autoAlpha: 1,
			ease: Circ.easeInOut
		}, 0.1);
}

function drinkAnimations(context) {

	let bubbles = context.$el.querySelector('.bubbles').children;
	let blueDrink = context.$el.querySelector('.icon-drink svg:first-of-type');
	let yellowDrink = context.$el.querySelector('.icon-drink svg:last-of-type');


	let cupAnimation = new TimelineMax({
			repeat: -1
		})
		.fromTo(yellowDrink, 1.5, {
			rotation: 0,
			transformOrigin: 'bottom left',
			ease: Power2.easeIn
		}, {
			rotation: -10,
			transformOrigin: 'bottom left',
			ease: Power2.easeOut
		}, 'yellow')
		.fromTo(yellowDrink, 1.5, {
			rotation: -10,
			transformOrigin: 'bottom left',
			ease: Power2.easeIn
		}, {
			rotation: 0,
			delay: 6,
			transformOrigin: 'bottom left',
			ease: Power2.easeOut
		}, 'yellow')

	//- Blue Drink
	.fromTo(blueDrink, 1.5, {
			rotation: -5,
			x: 5,
			transformOrigin: 'bottom right',
			ease: Power2.easeIn
		}, {
			rotation: 0,
			x: 10,
			transformOrigin: 'bottom right',
			ease: Power2.easeOut
		}, 'yellow')
		.fromTo(blueDrink, 1.5, {
			rotation: 0,
			x: 10,
			transformOrigin: 'bottom right',
			ease: Power2.easeIn
		}, {
			rotation: -5,
			x: 5,
			delay: 6,
			transformOrigin: 'bottom right',
			ease: Power2.easeOut
		}, 'yellow');


	let bubblesAnimation = new TimelineMax({
			repeat: -1,
			paused: true
		})
		.staggerFromTo(shuffleArray(bubbles), 1, {
			autoAlpha: 0,
			ease: Power1.easeOut
		}, {
			autoAlpha: 1,
			ease: Power1.easeIn
		}, 0.3, 'main')
		.staggerFromTo(shuffleArray(bubbles), 1, {
			y: 0,
			ease: Power1.easeOut
		}, {
			y: -10,
			ease: Power1.easeIn
		}, 0.3, 'main+=0.5')
		.staggerFromTo(shuffleArray(bubbles), 1, {
			autoAlpha: 1,
			ease: Power1.easeOut
		}, {
			autoAlpha: 0,
			ease: Power1.easeIn
		}, 0.3, 'main+=1');

	return {
		cupAnimation,
		bubblesAnimation
	};
}


function birdsAnimations(context) {

	let birds = context.$el.querySelector('.bubbles').children;
	
}