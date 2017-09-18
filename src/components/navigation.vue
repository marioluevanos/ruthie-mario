<template lang='pug'>
	nav#nav
		.texture-2
		wedding-button(to='/') Home
		wedding-button(to='/rsvp') RSVP
</template>

<script>
	export default {
		name: 'navigation',
		mounted() {
		
		},
		methods: {
		
		}
	}
</script>

<style lang='scss'>
	
	@import '../styles/vars.scss';
	@import '../styles/mixins.scss';

	#nav {
		display: none;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: vw(240);
		background: white;
		z-index: 1337;
		@include bp(2) {
			display: flex;
		}
		.wedding-button {
			background: none;
			width: 50%;
			height: 100%;
			padding: 0;
			.border,
			&:before {
				display: none;
			}
			.text {
				font-size: 6vw;
			}
			&:last-of-type {
				border-left: 1px solid $color-gold-1;
			}
		}
		.texture-2 {
			position: absolute;
			top: vw(-25); right: 0; left: 0;
			z-index: 0;
			height: vw(25);
		}
	}
</style>
