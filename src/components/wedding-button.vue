<template lang='pug'>

	//- Helps with split text into spans for animating
	- const splitText = text => text.split('').map(w => `<span>${w}</span>`).join('')

	button.wedding-button
		router-link(v-if='to' :to='to')
		a(target='_blank' v-if='href' :href='href')
		span.border
		span.border
		span.text: slot

</template>

<script>

	export default {
		name: 'wedding-button',
		props: ['to', 'href'],
		data() {
			return {

			}
		}
	}
</script>

<style lang='scss'>
	@import '../styles/vars.scss';
	@import '../styles/mixins.scss';
	button.wedding-button {
		outline: none;
		position: relative;
		display: inline-block;
		background: none;
		border: none;
		padding: vw(15) vw(80) vw(15);
		@include bp(2) {
			padding: vw(30) vw(120);
		}
		&:before {
			content: '';
			position: absolute;
			top: vw(4); right: vw(4); bottom: vw(4); left: vw(4);
			opacity: 0.6;
			background: linear-gradient(to bottom, lighten($color-gold-1, 15%) 0%, darken($color-gold-1, 10%) 100%);
			z-index: 0;
			transition: opacity 0.3s ease-in-out;
		}
		a {
			position: absolute;
			top: 0; right: 0; bottom: 0; left: 0;
			z-index: 1;
		}
		.text {
			color: $color-navy;
			font: 1.875em/1 $font-bold;
			display: block;
			text-align: center;
			position: relative;
			top: -0.15em;
			@include bp(2) {
				font-size: 8vw;
			}	
			span {
				display: inline-block;
				position: relative;
			}
		}
		.border {
			position: absolute;
			top: 0; right: 0;
			bottom: 0;
			left: 0;
			border: 2px solid $color-navy;
			transition: all 0.15s ease-in-out;
			@include bp(2) {
				border-width: vw(4);
			}
		}
		.border:nth-of-type(1) {
			left: vw(-10);
			right: vw(-10);
			@include bp(2) {
				left: vw(-30);
				right: vw(-30);
			}
		}
		.border:nth-of-type(2) {
			top: vw(-10);
			bottom: vw(-10);
			@include bp(2) {
				top: vw(-30);
				bottom: vw(-30);
			}
		}
	}
	.wedding-button:hover {
		.border {
			top: 0!important;
			right: 0!important;
			bottom: 0!important;
			left: 0!important;
		}
		&:before {
			opacity: 0;
		}
	}
</style>
