<template lang='pug'>
	#app
		loader(:doneLoading='doneLoading')
		wedding-image.flower-1(file='flower-1.png')
		router-view
</template>

<script>
	export default {
		name: 'app',
		methods: {
			doneLoading(imagesLoaded) {
				if (imagesLoaded.isComplete) {
					let loader = this.$el.querySelector('#loader');
					loader.addEventListener('transitionend', () => loader.remove());
					setTimeout(()=> document.body.classList.add('loaded'), 0);
				}
			}
		}
	}
</script>

<style lang='scss'>
	@import './styles/vars.scss';
	@import './styles/reset.scss';
	@import './styles/mixins.scss';
	@import './styles/grid.scss';
	@import './styles/fonts.scss';
	@import '../node_modules/flickity/css/flickity.css';

	html {
		width: 100%;
		height: 100%;
		background: white;
	}

	body {
		background: white;
		color: $color-navy;
		height: 100%;
		font: 20px $font-regular;
	    -webkit-tap-highlight-color: transparent;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		@include bp(4) {
			font-size: 16px;
		}
		@include bp(3) {
			font-size: 18px;
		}
		@include bp(2) {
			font-size: 24px;
			width: 100vw;
			overflow-x: hidden; 
		}
	}
	h3 {
		color: $color-gold-1;
		font-variant: all-small-caps;
    	font-size: 2.25em;
		font-weight: normal;
		margin: 0 0 vw(0);
	}
	a {
		color: $color-navy;
	}
	p {
		font-size: 1.75em;
		line-height: 1.33;
		margin: 0 0 vw(30) 0;
		@include bp(4) {
			font-size: 1.5em;
		}
		@include bp(3) {
			font-size: 1.15em;
		}
		@include bp(2) {
			font-size: 2em;
		}
	}
	#app {
		position: relative;
		min-height: 100%;
		width: 100%;
	}
	.wedding-image[class*='ep-'] {
		position: relative;
		overflow: hidden;
	}
	.wedding-image.subtitle {
		height: vw(24);
		width: auto;
		margin-bottom: vw(15);
		@include bp(2) {
			height: vw(40);
		}
		img {
			height: 100%;
			width: auto;
			max-width: 100%;
		}
	}
	.texture-1 {
		position: relative;
		background-color: $color-blue-1;
		&:before {
			content: '';
			position: absolute;
			opacity: 0.3;
			top: 0; right: 0; bottom: 0; left: 0;
			background: url('./assets/images/texture-1.png') 0 0/46% auto;
			// mix-blend-mode: hard-light;
			z-index: 0;
		}
		&:after {
			content: '';
			position: absolute;
			top: 0; right: 0; bottom: 0; left: 0;
			background: linear-gradient(to bottom, #c4ccac 0%, #979fa7 50%,#7298a8 100%); 
			z-index: -1;
		}

	}
	.texture-2 {
		background-image: url('./assets/images/texture-2.jpg');
		background-size: 115px auto;
		background-repeat: repeat;
	}
	.texture-3 {
		background-image: url('./assets/images/texture-3.jpg');
		background-size: 100%;
		background-repeat: repeat;
	}

	.wedding-image.flower-1 {
		position: absolute;
		width: vw(400);
		top: 0;
		left: 0;
		transform: translate(-15%, -25%);
		z-index: 3;
		@include bp(2) {
			width: vw(800);
		}
	}
</style>
