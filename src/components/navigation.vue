<template lang='pug'>
	nav
		.icon-menu: include ../assets/images/icon-menu.svg
		.nav-items
			router-link(to='/') Home
			router-link(to='/rsvp') RSVP
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

	nav {
		position: fixed;
		text-align: center;
		top: 0;
		right: 0;
		height: vw(60);
		width: vw(100);
		display: flex;
		background: $color-navy;
		align-items: center;
		justify-content: center;
		z-index: 1337;
		display: none;
		a {
			cursor: pointer;
			text-decoration: none;
			font: 1.125em/1 $font-bold;
			margin: 0 vw(20);
			display: block;
			position: relative;
		}
	}
	.nav-items {
		display: none;
	}
	.icon-menu {
		width: 32px;
		height: 32px;
		cursor: pointer;
		svg {
			width: 100%;
			display: block;
		}
		.middle, .lines{
			fill: $color-navy;
		}
		.middle {
			transform: scale(0.7, 1);
			transform-origin: 100% 50%;
			transition: transform 0.15s ease-in-out;
		}
		&:hover .middle {
			transform: scale(1, 1);
		}
	}
</style>
