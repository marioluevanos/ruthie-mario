<template>
	<figure class='wedding-image'>
		<slot></slot>
		<img class='img-preload' :src='filePath' :class='className'>
	</figure>
</template>

<script>
	export default {
		name: 'wedding-image',
		props: ['file', 'className'],
		data() {
			return {
				filePath: require('../assets/images/' + this.file)
			}
		}
	}
</script>

<style lang='scss'>
	@import '../styles/vars.scss';
	.wedding-image {
		position: relative;
		img {
			width: 100%;
		}
	}
</style>
