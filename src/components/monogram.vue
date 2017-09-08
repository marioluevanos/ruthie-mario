<template lang='pug'>
	.monogram
		include ../assets/images/monogram.svg
</template>

<script>
	export default {
		name: 'monogram',
		mounted() {
		
		},
		methods: {
		
		}
	}
</script>

<style lang='scss'>
	@import '../styles/vars.scss';
	.monogram {
		transition: all 0.6s $ease-in-out-p0;
		svg {
			.monogram-sq {
				fill: $color-navy;
				fill-opacity: 0;
				stroke-width: 1;
				transform-origin: 50% 50%;
				transition: all 0.6s $ease-in-out-p0;
				@for $i from 1 through 4 {
					&:nth-of-type(#{$i}) {
						$deg: #{($i * 22.5) + 'deg'};
						transform: rotate($deg);
					}
				}
			}
		}
		&:active svg .monogram-sq,
		&:hover svg .monogram-sq {
			transform: rotate(135deg);
		}
	}
</style>
