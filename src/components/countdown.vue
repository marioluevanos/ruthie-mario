<template lang='pug'>
	.countdown
		.time-left {{ daysUntil }}
		span {{ daysText }}
		span Until
		span Wed
</template>

<script>

	export default {
		name: 'countdown',
		data() {
			let eventDate = this.getTimeRemaining('10-27-2017');
			return {
				daysRemaining: eventDate.days,
				hoursRemaining: eventDate.hours
			}
		},
		mounted() {
			if ( this.daysRemaining < 0 && this.hoursRemaining < 0 ) {
				this.$el.remove()
			}
		},
		methods: {
			getTimeRemaining(endtime) {
				let total = Date.parse(endtime) - Date.parse(new Date());
				let seconds = Math.floor( (total/1000) % 60 );
				let minutes = Math.floor( (total/1000/60) % 60 );
				let hours = Math.floor( (total/(1000 * 60 * 60)) % 24 );
				let days = Math.floor( total/(1000 * 60 * 60 * 24) );
				return {
					total,
					days,
					hours,
					minutes,
					seconds
				};
			},
		},
		computed: {
			daysUntil() {
				return this.daysRemaining >= 1 ? this.daysRemaining : this.hoursRemaining;
			},
			daysText() {
				return this.daysRemaining >= 1 ? 'Days' : 'Hours';
			}
		}
	}
</script>

<style lang='scss'>
	@import '../styles/vars.scss';
	@import '../styles/mixins.scss';
	
	.countdown {
		position: absolute;
		top: vw(-80);
		right: vw(100);
		transition: all 0.6s $ease-in-out-p0;
		background: lighten($color-navy, 0%);
		padding: vw(40) vw(35) vw(35);
		color: white;
		font: normal 1.5em/1 $font-bold;
		text-align: center;
		z-index: 3;
		@include bp(2) {
			padding: vw(60) vw(45) vw(60);
			right: 0;
		}
		&:before {
			content: '';
			position: absolute;
			top: 10px; right: 10px; bottom: 10px; left: 10px;
			border: 2px solid rgba(white, 0.15);
			z-index: 0;
		}
		.time-left {
			font: normal 1.5em/0.6 $font-regular;
			color: $color-gold-1;
			@include bp(2) {
				font-size: 2em;
			}
		}
		span {
			display: block;
		}
	}
</style>
