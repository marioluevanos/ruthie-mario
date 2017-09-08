<template lang='pug'>
#loader
	.loading-text
		.loader-icon: wedding-monogram
		.loader-percent
			span.number {{percentLoaded}}
</template>

<script>
	import imagesloaded from 'imagesloaded';
	export default {
		props: ['doneLoading'],
		data() {
			return {
				percent: 0
			};
		},
		computed: {
			percentLoaded() {
				return this.percent + '%';
			}
		},
		mounted() {
			/* Make sure all images are rendered and loaded before starting animations */
			/* Images are CSS background images */
			this.$parent.imagesLoaded = imagesloaded(this.$parent.$el.querySelectorAll('.img-preload'), { background: true })
			.on('progress', instance => {
				this.percent = Math.round(instance.progressedCount/instance.images.length * 100);
			})
			.on('done', this.doneLoading);
		}
	}
</script>

<style lang='scss'>
	@import '../styles/vars.scss';
	@import '../styles/mixins.scss';

	body {
		height: 100%;
		-ms-overflow-style: none; 
	}
	
	::-webkit-scrollbar { width: 0 !important }

	#loader {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 1337;
		background: white;
		transition: all 0.3s $ease-out-p0;
	}

	.loading-text {
		position: absolute;
		color: $color-gold-1;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
	}

	.loader-icon {
		display: block;
		margin: 0 auto;
		width: vw(120);
		height: vw(120);
		.monogram-text {
			fill: $color-navy;
		}
	}
	
	.loader-icon .monogram .monogram-sq {
		stroke: $color-gold-1;
		stroke-width: 2;
		@for $i from 1 through 4 {
			$delay: #{$i * 0.25 + 's'};
			&:nth-of-type(#{$i}) {
				animation: spin 4s linear infinite $delay;
			}
		}
	}	

	@keyframes spin {
		0% 		{ transform: rotate(0deg); }
		100%	{ transform: rotate(360deg); }
	}

	.loader-percent {
		position: relative;
		span {
			display: block;
		}
		.number {
			font: normal 5em/1 $font-bold;
		}
	}

	.img-preload {
		opacity: 0;
		visibility: hidden;
		transition: opacity 1s $ease-out-p0 0s;
	}

	/* Loaded */
	body.loaded {
		#loader {
			opacity: 0;
		}
		.img-preload {
			opacity: 1;
			visibility: visible;
		}
	}
</style>
