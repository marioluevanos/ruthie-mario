<template lang='pug'>
#page-index
	section.header
		.col
			wedding-monogram
			wedding-image.ep-1(file='ep-1.jpg', className='scroll-anim ep-1')
				.overlay-header
			.texture-header.scroll-anim
				.texture-1.img-preload
					.overlay-header

		.col
			.text
				.icon-ring: include ../assets/images/icon-ring.svg
				.title: include ../assets/images/title.svg
				wedding-button(to='/rsvp') RSVP
			.texture-2.img-preload
				.overlay-header
				
	section.how-we-met
		.cols
			.col
				.text
					h3.subtitle: span.split-text How we first met
					h2: span.split-text “stop staring &amp; close youR mouth”
					p.scroll-rise
						span.dropcaps: include ../assets/images/dropcaps-t.svg
						span.split-lines hat is the thought I had when I saw Ruthie for the first time at my friend Hoang’s 40th birthday. I was mezmorized. I needed to know who she was, the beauty walked in. I tried to impress her by showing her my best dance moves.
					p.scroll-rise 
						span.split-lines After the initial meet, it took—maybe two weeks for us to finally arrange and have our first date. It was a year later that I moved in with her, and at that time he knew that Ruthie and I, are meant to be.
			.col.scroll-rise
				//- wedding-countdown.scroll-anim
				wedding-image.flower-2.scroll-anim(file='flower-2.png')
				wedding-image.ep-2(file='ep-2.jpg', className='scroll-anim ep-2')
					.overlay
				.texture-3.scroll-anim.img-preload
					.overlay
				.icon-drink.scroll-anim
					include ../assets/images/icon-drinks.svg
					include ../assets/images/icon-drinks.svg
	section.she-said
		.said-yes
			include ../assets/images/subtitle-proposed-text.svg
			include ../assets/images/subtitle-she-said-yes.svg
			.proposal
				.proposal-bg
					wedding-image.glitter(file='glitter.png')
				.proposal-video
					.overlay
					button#play-button(@click='playVideo')
						include ../assets/images/icon-play.svg
					.proposal-video-poster
					video(controls): source(src='../assets/video/proposal-compressed.mp4', type='video/mp4')
	
	section.details: google-map
	
	section.photos
		.text
			h3.subtitle: span.split-text Engagement Photos
			p.scroll-rise At Disney Concert Hall in Downtown Los Angeles. Photography by #[a(href='https://timeonfilm.com/', target='_blank') Charles Ng.]
			
			.birdy.mario: wedding-image(file='birdy-mario.png')
			.birdy.ruthie: wedding-image(file='birdy-ruthie.png')

		.photo-gallery
			wedding-image.photo(v-for='(photo, index) in gallery' :key='index' :file='photo')
	section.registry
		.texture-2.img-preload
		wedding-image.flower-4(file='flower-4.png')
		.cols
			.col
				.text
					h3.subtitle: span.split-text Registry
					p.scroll-rise 
						span.split-lines We can't wait to get married and are so honored to have you at our wedding! If you would like to help us start our new life together, we have registered for items we would love to have in our home.
			.col
				wedding-button.scroll-rise(href='https://www.theknot.com/us/ruthie-collins-and-mario-luevanos-oct-2017/registry#newly-wed')
					img.img-preload(src='../assets/images/logo-knot.png')
				wedding-button.scroll-rise(href='https://www.macys.com/wgl/registry/guest?registryId=6796946&PartnerID=WEDDINGCHANNEL&cm_mmc=WEDDINGCHANNEL-_-Registry-_-n-_-Registry&LinkshareID=590115231&ref=wc&EFCKEY=%7B%22EXPERIMENT%22%3A%5B%222525%22%2C%2228-20%22%5D%7D&SEED=2045141519874331111%7C25-21%2C31-20')
						img.img-preload(src='../assets/images/logo-macys.png')
</template>

<script>
	import { TweenMax, TimelineMax } from 'gsap';
	import 'gsap/ScrollToPlugin';
	import animations from '../scripts/animations-page-index';
	import { scrollUp, ifMobile } from '../scripts/utils';
	import ScrollMagic from 'scrollmagic';
	import animationsScroll from '../scripts/animations-scroll';

	export default {
		name: 'app',
		data() {
			return {
				gallery: [
					'g-1.jpg',
					'g-2.jpg',
					'g-3.jpg',
					'g-4.jpg',
					'g-5.jpg',
					'g-6.jpg',
					'g-7.jpg',
					'g-8.jpg',
					'g-9.jpg',
					'g-10.jpg'
				]
			};
		},
		beforeRouteLeave(to, from, next) {
			return !ifMobile() ? 
				scrollUp(()=> this.animations.leave(next)) : 
				this.animations.leave(next);
		},
		mounted() {

			/* Attatch initialization to the Vue component */
			this.animations = animations(this);

			const animateAll = () => {
				this.animations.intro.delay(1).timeScale(1.3).play();
				this.animations.enter.play();
			};

			/* Only use ScrollMagic if not mobile device  */
			this.bodyController = new ScrollMagic.Controller();
			animationsScroll(this.bodyController);

			/* Initialize after all the images have been loaded */
			this.$parent.imagesLoaded.on('done', () => animateAll() );
			if (this.$parent.imagesLoaded.isComplete) { animateAll() }

		},
		methods: {
			playVideo() {
				this.$el.querySelector('video').play();
				this.$el.querySelector('.proposal-video-poster').style.display = 'none';
				this.$el.querySelector('#play-button').style.display = 'none';
			}
		}
	}
</script>

<style lang='scss'>
@import '../styles/vars.scss';
@import '../styles/mixins.scss';

#page-index {
	background: white;
}

.overlay {
	position: absolute;
	top: -1px; right: -1px; bottom: -1px; left: -1px;
	background: white;
	z-index: 2;
}

#page-index .overlay {
	@include bp(2) {
		display: none;
	}
}

section.header {
	position: relative;
	padding-top: 60px;
	display: flex;
	color: $color-navy;
	@include bp(2) {
		display: block;
		top: -1px;
		padding-top: 1px;
	}
	.overlay-header {
		position: absolute;
		top: 0; right: 0; bottom: 0; left: 0;
		background: white;
		z-index: 3;
	}
	.icon-ring {
		width: vw(100);
		display: inline-block;
		margin-bottom: vw(30);
		@include bp(2) {
			width: vw(200);
			margin-bottom: vw(60);
		}
		svg {
			width: 100%;
			height: auto;
			display: block;
		}
		.diamond {
			fill: none;
			stroke: $color-navy;
			stroke-linejoin: bevel;
		}
		.st1 {
			fill: $color-gold-2;
		}
		.st2 {
			fill: none;
			stroke: #AA9C62;
			stroke-width: 2;
		}
		.shine {
			fill: none;
			stroke: $color-navy; 
			stroke-linecap: round;
			stroke-linejoin: round;
		}
	}
	.col:nth-of-type(1) {
		position: relative;
		width: vw(550);
		height: vw(800);
		@include bp(2) {
			position: absolute;
			width: 100vw;
			height: 40vh;
		}
		.monogram {
			position: absolute;
			bottom: vw(90);
			left: vw(35);
			width: vw(90);
			height: vw(90);
			transform: translate(0, 0);
			z-index: 2;
			@include bp(2) {
				width: vw(240);
				height: vw(240);
				bottom: initial;
				left: initial;
				top: vw(90);
				right: vw(90);
				display: none;
			}
			.monogram-sq {
				stroke: white;
			}
			.monogram-text {
				fill: white;
			}
		}
		.ep-1 {
			background: lighten($color-gold-1, 30%);
			position: absolute;
			top: 0; right: 0; bottom: 0; left: 0;
			z-index: 1;
			img {
				width: 250%;
				position: absolute;	
				top: 50%; left: 50%;
				transform: translate(-50%, -50%);
				@include bp(2) {
					width: 190%;
				}
			}
		}
		.texture-header {
			display: block;
			height: 100%;
		}
		.texture-1 {
			position: absolute;
			bottom: vw(-50); right: vw(-50);
			width: vw(340);
			height: vw(710);
			z-index: 0;
			@include bp(2) {
				right: 0;
				display: none;
			}
		}
	}
	.col:nth-of-type(2) {
		position: static;
		width: vw(890);
		height: vw(800);
		display: flex;
		align-items: center;
		justify-content: center;
		@include bp(2) {
			width: 90%;
			height: auto;
			position: relative;
			background: white;
			margin: 35vh auto 5vh;
			display: block;
			z-index: 2;
		}
		div.text {
			position: relative;
			top: vw(-60);
			text-align: center;
			@include bp(2) {
				width: 90%;
				top: 0;
				margin: auto;
				padding-top: vw(100);
				overflow: hidden;
			}
		}
		.title {
			width: vw(460);
			margin: 0 auto vw(40);
			@include bp(2) {
				width: 80%;
				margin-bottom: vw(60);
			}
			svg {
				width: 100%;
				display: block;
				fill: $color-navy;
				overflow: visible;
			}
		}

		.texture-2 {
			position: absolute;
			top: 60px; right: 0; bottom: 0;
			width: vw(50);
			@include bp(2) {
				top: 0;
				left: 0;
				right: 0;
				bottom: initial;
				width: auto;
				height: vw(50);
			}
		}
	}
	.wedding-button {
		@include bp(2) {
			display: none;
			padding: vw(40) vw(240);
			.text {
				font-size: 4vw;
			}
		}
	}
}

section.how-we-met {
	position: relative;
	text-align: left;
	@include bp(2) {
		padding-top: vw(120);
	}
	.cols {
		position: relative;
		display: flex;
		@include bp(2) {
			flex-direction: column-reverse;
		}
	}
	.col {
		position: relative;
	}
	.dropcaps {
		float: left;
		width: vw(100);
		height: vw(100);
		margin: vw(-20) vw(25) 0 vw(-40);
		@include bp(2) {
			width: vw(200);
			height: vw(200);
		}
		.border{
			fill:none;
			stroke: $color-gold-1;
			stroke-width: 1;
			@include bp(2) {
				stroke-width: 1;
			}
		}
		.deco{
			fill: $color-gold-1;
		}
		.letter{
			fill: $color-navy;
		}
	}
	.col:nth-of-type(1) {
		width: vw(890);
		display: flex;
		align-items: center;
		justify-content: center;
		@include bp(2) {
			width: 100%;
		}
		.text {
			padding-top: vw(170);
			width: vw(470);
			@include bp(2) {
				padding: vw(120) 0 0;
				width: 80%;
				.wedding-image {
					width: 55%;
					height: auto;
					padding-left: vw(120);
					img {
						width: 100%;
					}
				}
			}
			p {
				width: 90%;
				@include bp(2) {
					width: 100%;
					margin: 0 auto vw(30);
				}
			}
		}
		h2 {
			margin: 0 0 vw(90) vw(0);
			font: 6vw/1 $font-bold;
			color: $color-navy;
			.split-text {
				div:first-of-type .char:first-of-type {
					margin-left: -1.5vw;
				}
			}
			@include bp(2) {
				width: auto;
				font-size: 12vw;
				box-sizing: border-box;
				margin: 0 0 vw(120);
				padding: 0;
			}
		}
	}
	.col:nth-of-type(2) {
		width: vw(550);
		height: vw(640);
		@include bp(2) {
			width: 100%;
			height: 40vh;
			position: relative;
			top: 0;
			right: 0;
		}
		.icon-drink {
			position: absolute;
			bottom: -40%;
			left: 25%;
			transform: translate(-50%, 100%);
			width: vw(140);
			height: vw(140);
			z-index: 3;
			@include bp(2) {
				display: none;
			}
			svg {
				width: 100%;
				display: block;
				&:nth-of-type(1) {
					position: absolute;
					top: 0; left: 0;
					.drink-yellow {
						display: none;
					}
				}
				&:nth-of-type(2) {
					position: absolute;
					top: 0; left: 0;
					.drink:not(.drink-yellow),
					.bubbles {
						display: none;
					}
				}
			}
			.drink-yellow {
				transition: all 1s $ease-in-out-p0;
			}
			.line{
				fill: none;
				stroke: $color-gold-1;
				stroke-width: 2;
				stroke-miterlimit:10;
			}
			.blue{
				fill: url(#gradient-blue);
			}
			.pink{
				fill: url(#gradient-pink);
			}
			.bubble {
				fill: none;
				stroke-width: 1;
				stroke: $color-gold-1;
				stroke-miterlimit: 10;
			}
		}
		.flower-2 {
			position: absolute;
			bottom: 0; left: 0;
			z-index: 2;
			transform: translate(-50%, 50%);
			width: vw(440);
			@include bp(2) {
				width: vw(700);
				bottom: 20%; 
				right: -20%;
				left: initial;
			}
		}
		.texture-3 {
			opacity: 1;
			position: absolute;
			width: inherit;
			height: inherit;
			z-index: 0;
			transform: translate(vw(-60), vw(60));
			background-size: 100% auto;
			&:before {
				content: '';
				position: absolute;
				top: 0; right: 0; bottom: 0; left: 0;
				mix-blend-mode: screen;
				background: linear-gradient(to bottom, lighten($color-gold-1, 25%) 0%, darken($color-gold-1, 20%) 100%);
			}
			@include bp(2) {
				height: 80%;
				transform: translate(0%, -50%);
				top: 50%;
				right: 0;
			}
		}
		.ep-2 {
			position: absolute;
			top: 0; right: vw(50); bottom: 0; left: 0;
			z-index: 1;
			@include bp(2) {
				right: 0;
				width: 65%;
			}

			img {
				width: 180%;
				position: absolute;
				top: 50%;
				left: 50%;
				-webkit-transform: translate(-50%, -50%);
				transform: translate(-60%, -70%);
			}
		}
	}
}


section.she-said {
	position: relative;
	.said-yes {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		flex-direction: column;
		padding: 20px 0 40px;
		@include bp(2) {
			height: auto;
			padding: vw(30) 0 vw(120) 0;
		}
		> svg {
			overflow: visible;
		}
		svg#subtitle-proposed-text {
			fill: $color-navy;
			width: 70vw;
			margin: vw(60) 0 0;
			@include bp(2) {
				width: 80%;
			}
		}
		svg#subtitle-she-said-yes {
			fill: $color-gold-1;
			width: 26vw;
			margin: 0 0 vw(60);
			@include bp(2) {
				margin-top: vw(30);
				width: 70%;
			}
		}
	}
	.said-yes.pinned svg#subtitle-she-said-yes {
		position: absolute;
	}
}

.proposal {
	position: relative;
	z-index: 1;
	@include bp(2) {
		margin-top: vw(60);
		margin-bottom: vw(60);
	}
	.proposal-bg {
		position: relative;
		position: absolute;
		left: 0; right: 0;
		top: 10%; bottom: 10%;
		z-index: -1;
		@include bp(2) {
			top: 0;
			bottom: 0;
		}
		.video-bg {
			position: absolute;
			bottom: -1px;
			bottom: -1px;
			left: 0; right: 0;
			display: block;
			z-index: 1;
			img {
				display: block;
				width: 100%;
			}
		}
		.texture-proposal-cover {
			overflow: hidden;
			position: absolute;
			top: 0; bottom: 0; right: 10%; left: 10%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.texture-1 {
			background-color: transparent;
			position: absolute;
			width: 100vw;
			height: 100vh;
			top: 50%;
			opacity: 1;
			&:before {
				background-size: vw(200) auto;
			}
		}
	}
	.glitter {
		position: absolute;
		left: 0; right: 0;
		width: vw(460);
		margin: auto;
		bottom: -50%;
		z-index: 0;
		@include bp(2) {
			bottom: -25%;
			width: 100%;
		}
	}
	.flower-3 {
		position: absolute;
		left: 50%;
		width: vw(1120);
		margin: auto;
		bottom: -50%;
		z-index: 1;
		transform: translate(-50%, 0);
		@include bp(2) {
			bottom: initial;
			top: -25%;
			transform: none;
			left: 0;
			right: 0;
			transform: scale(1, 1);
		}
	}
	.proposal-video {
		position: relative;
		width: vw(890);
		padding: 0;
		display: block;
		margin: auto;
		@include bp(2) {
			width: 100%;
		}
	}
	button {
		margin: 0; padding: 0;
		width: vw(110);
		height: vw(110);
		background: none;
		border: none;
		position: absolute;
		outline: none;
		top: 50%; left: 50%;
		transform: translate(-50%, -50%);
		z-index: 3;
		@include bp(2) {
			width: vw(300);
			height: vw(300);
		}
	}
	.icon-play {
		cursor: pointer;
		width: 100%;
		height: 100%;
		.icon-play-tri {
			fill: white;
		}
		 .icon-play-sq {
			fill: $color-navy;
			fill-opacity: 0;
			stroke: white;
			stroke-width: 1;
			transform-origin: 50% 50%;
			transition: transform 0.6s $ease-in-out-p0;
			@for $i from 1 through 4 {
				&:nth-of-type(#{$i}) {
					$deg: #{($i * 22.5) + 'deg'};
					transform: rotate($deg);
				}
			}
		}
		&:active .icon-play-sq,
		&:hover .icon-play-sq {
			transform: rotate(135deg);
		}
	}
	.overlay {
		top: -1vw;
		right: -1vw;
		bottom: -1vw;
		left: -1vw;
	}
	.proposal-video-poster,
	video {
		position: relative;
		width: 100%;
		height: 100%;
		display: block;
		margin: auto;
	}
	.proposal-video-poster {
		position: absolute;
		z-index: 1;
		box-shadow: none;
		transform: scale(1.01);
		background: url('../assets/images/video-cover.jpg') 50% 50%/cover no-repeat;
		&:before {
			content: '';
			position: absolute;
			top: 0; left: 0; width: inherit; height: 100%;
			opacity: 0;
			box-shadow: 0 30px 60px rgba(black, 0.3);
			transition: opacity 0.3s ease-in-out;
			z-index: 1;
		}
		&.active:before {
			 opacity: 1;
		}
	}
}

section.details {
	padding: vw(300) 0;
	position: relative;
	@include bp(2) {
		padding: 0;
	}
	> .text {
		text-align: center;
		padding: vw(30) 0 vw(50);
		@include bp(2) {
			width: 80%;
			margin: auto;
		}
		.subtitle {
			margin-bottom: vw(40);
		}
		p {
			margin: 0;
		}
	}
}

section.photos {
	position: relative;
	z-index: 1;
	.text {
		
		padding: 0 vw(240) 0;
		height: 20vh;
		display: flex;
		align-items: center;
		position: static;

		@include bp(2) {

			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			text-align: center;
			width: 90%;
			margin: auto;
			padding: 0;
		}
		.subtitle {
			line-height: 1;
			position: relative;
			white-space: nowrap;
			width: 45%;
			margin-right: 5%;
			@include bp(2) {
				text-align: center;	
				margin-bottom: vw(30);
			}
		}
		p {
			width: 50%;
			margin: 0;
			@include bp(2) {
				width: auto;
			}
		}
		a {
			text-decoration: none;
			border-bottom: 1px solid $color-gold-1;
			&:hover {
				border-color: $color-navy;
			}
		}
	}
	.birdy {
		position: absolute;
		width: 150px;
		height: 150px;
		overflow: hidden;
		left: 0;
		bottom: 0;
		z-index: 1337;
		@include bp(2) {
			display: none;
		}
		figure {
			position: absolute;
			width: 100%; height: 100%;
			top: 0; right: 0; bottom: 0; left: 0;
		}
		img {
			width: auto;
			height: 150px;
			position: absolute;
			top: 0;
			left: 0;
			will-change: transform;
		}

	}

	.photo-gallery {
		position: relative;
		box-sizing: border-box;
		left: vw(320);
	
		@include bp(2) {
			left: 0;
		}
		&:after {
			content: '';
			display: table;
			position: relative;
			clear: both;
		}

		.photo {
			width: auto;
			height: 70vh;
			margin-right: 60px;
			margin-bottom: 10vh;
			background: white;
			float: left;
			@include bp(2) {
				float: none;
				height: auto;
				width: 100%;
				margin-bottom: vw(30);
			}
			img {
				width: auto;
				height: 100%;
				display: block;
				margin: auto;
				transition: all 0.3s ease-in-out;
				@include bp(2) {
					width: 100%;
					height: auto;
				}
			}
		}
	}
}

section.registry {
	margin-top: vw(-90);
	background: rgba($color-gold-2, 0.5);
	padding: vw(280) 0 vw(380);
	position: relative;

	&:before {
		content: '';
		position: absolute;
		top: 0; right: 0; bottom: 0; left: 0;
		background: url('../assets/images/texture-4.png') 0 0/10% auto repeat;
		opacity: 0.5;
	}

	.subtitle {
		margin-bottom: vw(30);
		@include bp(2) {
			margin-bottom: vw(120);
		}
	}
	.cols {
		position: relative;
		padding: 0 0 0 vw(240);
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		
		align-items: flex-end; // MACY's FUCCKING SUCKS!~

		@include bp(2) {
			align-items: center;
			flex-direction: column;
			padding: 0 0 0 vw(50);
		}
		.col {
			&:first-of-type {
				margin-right: vw(60);
				width: vw(500);
				@include bp(2) {
					width: 70%;
				}
			}
			&:last-of-type {
				width: vw(340);
				@include bp(2) {
					margin-top: vw(90);
					width: 70%;
				}
			}
		}
	}
	.texture-2 {
		width: vw(50);
		height: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
	}
	.wedding-button {
		margin-bottom: vw(60);
		@include bp(2) {
			padding: vw(90) vw(180) vw(90);
			margin-bottom: vw(120);
		}
		&:before {
			display: none;
		}
		.text {
			display: inline-block;
			top: initial;
			transform: none;
			img {
				width: 100%;
				@include bp(2) {
					width: 80%;
				}
			}
		}
	}
	.flower-4 {
		position: absolute;
		bottom: 0; left: 0; right: 0;
		img {
			width: 100%;
			display: block;
		}
	}
}

</style>
