<template lang='pug'>
	.google-map-group.clear
		.google-map-text: .google-map-inner.scroll-anim
			address
				h3.subtitle Address
				p Oviatt Penthouse
				p 617 S Olive Street
				p Los Angeles, CA 90014
			.parking
				.inner
					h3.subtitle Parking
					p There are a few lots available in close proximity for parking.
				wedding-button.parking Show Parking
		.google-map
</template>

<script>
	import googleMapStyle from '../scripts/google-map-style';
	import loadGoogleMapsAPI from 'load-google-maps-api';

	/* 
		Initialize the map first, so that there isn't a duplicate 
		GoogleMaps API script injected into the <body>
	*/
	const googleMapsAPI = loadGoogleMapsAPI({key: 'AIzaSyB9MbNuwaqb1uIW18ervfyn2uxapX78bdc' }).then(api => api);

	const weddingMap = [{
		coords: {
			lat: 34.0478288,
			lng: -118.2548754
		},
		icon: {
			url: require('../assets/images/icon-marker.svg'),
  		},
		title: 'Oviatt Penthouse',
		infoContent: `
			<div class='google-map-content'>
				<h2>Ruthie & Mario’s Wedding</h2>
				<p><strong>The Oviatt Penthouse</strong></p>
				<p>617 South Olive Street</p>
				<p>Los Angeles, CA 90014</p>
				<p>(213) 379–4172</p>
			</div>`
	}, 
	{
		coords: {
			lat: 34.0476179,
			lng: -118.2547187
		},
		icon: {
			url: require('../assets/images/icon-parking.svg')
		},
		title: 'Joe’s Augto Park',
		infoContent: `
			<div class='google-map-content'>
				<strong>Joe’s Auto Park</strong>
				<p>618 S. Olive Street, Los Angeles</p>
			</div>`
	},
	{
		coords: {
			lat: 34.047306,
			lng: -118.2552037
		},
		icon: {
			url: require('../assets/images/icon-parking.svg')
		},
		title: 'Lot 6353',
		infoContent: `
			<div class='google-map-content'>
				<strong>Lot 6353</strong>
				<p>625-631 S. Olive Street, Los Angeles</p>
			</div>`
	},
	{
		coords: {
			lat: 34.0482601,
			lng: -118.2522931
		},
		icon: {
			url: require('../assets/images/icon-parking.svg')
		},
		title: 'Pershing Square',
		infoContent: `
			<div class='google-map-content'>
				<strong>Parking @ Pershing Square</strong>
				<p>500 S. Hill Street, Los Angeles</p>
			</div>`
	},
	{
		coords: {
			lat: 34.0475443,
			lng: -118.2532675
		},
		icon: {
			url: require('../assets/images/icon-parking.svg')
		},
		title: 'Ampco System Parking',
		infoContent: `
			<div class='google-map-content'>
				<strong>Ampco System Parking</strong>
				<p>550 S. Hill Street, Los Angeles</p>
			</div>`
	},
	{
		coords: {
			lat: 34.0476804,
			lng: -118.2522522
		},
		icon: {
			url: require('../assets/images/icon-parking.svg')
		},
		title: 'City Center Parking',
		infoContent: `
			<div class='google-map-content'>
				<strong>City Center Parking</strong>
				<p>434 S. Broadway, Los Angeles</p>
			</div>`
	}];

	const createMap = (coords, context, googleMapsAPI) =>  {
		let map = new googleMapsAPI.Map(context.$el.querySelector('.google-map'), {
			zoom: 17,
			center: coords
		});
		/*
			The main obj that will get passed down
			Will start adding props to obj.
		*/
		return {
			map, googleMapsAPI
		}
	};

	const createInfoWindow = (mapList, obj) => {

		/* Assing an array of info windows to the obj */
		obj.info = mapList.map(loc => {
			return new obj.googleMapsAPI.InfoWindow({
				content: loc.infoContent,
				maxWidth: 600
			});
		});
		return obj;
	};

	const createStyledMap = obj => {
		let styledMapType = new obj.googleMapsAPI.StyledMapType(googleMapStyle(), {
			name: 'Wedding Styled'
		});
		obj.map.mapTypes.set('styled_map', styledMapType);
		obj.map.setMapTypeId('styled_map');
		return obj;
	};

	const createMaker = (mapList, condition, obj) => {
		/* Assing an array of markers to the obj */
		obj.marker = mapList.filter((loc, i) => {
			if (condition(loc)) {
				let marker = new obj.googleMapsAPI.Marker({
					position: loc.coords,
					map: obj.map,
					title: loc.title,
					icon: loc.icon,
					animation: obj.googleMapsAPI.Animation.DROP
				});
				marker.addListener('click', () => obj.info[i].open(obj.map, marker) );
				return marker;
			}
		});

		return obj;
	};

	const parkingEventHandle = obj => {
		let button = document.querySelector('.wedding-button.parking');
		button.addEventListener('click', (e) => {
			createMaker(weddingMap, loc => loc.title !== 'Oviatt Penthouse', obj);
		});
			return obj;
	};

	export default {
		name: 'google-map',
		mounted() {

			this.map = googleMapsAPI.then(createMap.bind(null, weddingMap[0].coords, this))
			.then(createInfoWindow.bind(null, weddingMap))
			.then(createStyledMap)

			/* Only render the first marker which is equal to Oviate Penthouse */
			.then(createMaker.bind(null, weddingMap, loc => loc.title === 'Oviatt Penthouse' ))

			/* Then add an event to listen for the parking markers drop */
			.then(parkingEventHandle)
			.catch(err => {
				console.error(err);
			});
		}
	}
</script>

<style lang='scss'>
	@import '../styles/vars.scss';
	@import '../styles/mixins.scss';
	.google-map-group {
		position: relative;
		margin: vw(30) 0 0;
		@include bp(2) {
			display: flex;
			flex-direction: column-reverse;
		}
	}
	.google-map-text {
		text-align: right;
		width: vw(890);
		float: left;
		position: absolute;
		top: vw(-30); bottom: vw(-30); left: 0;
		color: $color-navy;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right: vw(440);
		@include bp(2) {
			float: none;
			padding: 0;
			display: block;
			width: 90%;
			margin: auto;
			position: relative;
			top: initial;
			bottom: initial;
			left: initial;
		}
		.google-map-inner {
			width: 100%;
			position: relative;
			z-index: 1;
			@include bp(2) {
				display: block;
			}
		}
		h3 {
			font-size: 1.5em;
			color: $color-gold-1;
			margin: vw(30) 0 0;
			@include bp(2) {
				margin-top: 0;
			}
		}
		address {
			font-style: normal;
			text-align: right;
			@include bp(2) {
				width: 50%;
				position: absolute;
				top: 0; left: 0;
				text-align: left;
			}
			p {
				max-width: none;
				margin: 0;
				@include bp (2) {
					text-align: left;
				}
			}
		}
		.parking {
			.inner {
				padding-left: 40%;
				@include bp (2) {
					padding-left: 50%;
					position: relative;
				}
			}
			@include bp (2) {
				text-align: left;
				width: 100%;
			}
		}
		.wedding-button {
			margin-top: vw(30);
			padding: vw(20) vw(40);
			@include bp(2) {
				margin-top: vw(120);
				padding: vw(60) vw(60);
				display: block;
				width: 100%;
			}
			&:before {
				display: none;
			}
			span {
				text-transform: uppercase;
				border-width: 2px;
				border-color: $color-gold-1;
				color: $color-gold-1;
			}
			.border:nth-of-type(1) {
				left: vw(-8);
				right: vw(-8);
			}
			.border:nth-of-type(2) {
				top: vw(-8);
				bottom: vw(-8);
			}
		}
		p {
			font-size: 1em;
			max-width: none;
			margin: 0;
			padding: 0;
			@include bp(2) {
				font-size: 1.5em;
			}
		}
	}
	.google-map {
		width: vw(890);
		float: right;
		margin-right: vw(50);
		margin-right: 0;
		position: relative;
		min-height: vw(420);
		@include bp(2) {
			width: 95%;
			height: 30vh;
			float: none;
			margin: vw(60) auto vw(60);
		}
	}
	.google-map-content {
		position: relative;
		color: $color-navy; 
		text-align: center;
	}
	.google-map-content p {
		margin: 0;
		font-size: 1em;
	}
	.google-map-content h2 {
		margin: 0 0 5px; 
		font: normal 2em $font-bold;
	}
	.google-map-content h2 span {
		display: block; 
		font: normal 0.85em/1.66 $font-regular;
	}
</style>
