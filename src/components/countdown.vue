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
			if (this.daysUntil < 0)  {
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
		font: normal 1.5vw/1 $font-bold;
		text-align: center;
		z-index: 3;
		@include bp(2) {
			font-size: 4vw;
			padding: vw(60) vw(45) vw(60);
			right: vw(100);
			top: vw(50);
		}
		&:before {
			content: '';
			position: absolute;
			top: vw(10); right: vw(10); bottom: vw(10); left: vw(10);
			border: 2px solid rgba(white, 0.15);
			z-index: 0;
		}
		.time-left {
			font: normal 3vw/0.6 $font-regular;
			color: $color-gold-1;
			@include bp(2) {
				font-size: 8vw;
			}
		}
		span {
			display: block;
		}
	}
</style>
