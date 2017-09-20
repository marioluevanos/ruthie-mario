<template lang='pug'>
	.google-map-group.clear
		.google-map-wrap.scroll-anim
			.overlay
			.google-map
		.google-map-text
			.details.scroll-rise
				h3.subtitle: span.split-text Wedding Details
				p.split-lines Our ceremony and reception will be held on October 27, 2017 at the Oviatt Penthouse. 
				p.split-lines Ceremony will begin at Six o’clock.
			address.scroll-rise
				h3.subtitle: span.split-text Address
				p.split-lines Oviatt Penthouse
				p.split-lines 617 S Olive Street
				p.split-lines Los Angeles, CA 90014
			.parking.scroll-rise
				.inner
					h3.subtitle: span.split-text Parking
					p.split-lines There are a few lots available in close proximity for parking.
				wedding-button.parking.scroll-rise Show Parking
</template>

<script>
	import googleMapStyle from '../scripts/google-map-style';
	import loadGoogleMapsAPI from 'load-google-maps-api';

	/* 
		Initialize the map first, so that there isn't a duplicate 
		GoogleMaps API script injected into the <body>
	*/
	const googleMapsAPI = loadGoogleMapsAPI({ key: 'AIzaSyB9MbNuwaqb1uIW18ervfyn2uxapX78bdc' }).then(api => api);

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
		margin: 0;
		display: flex;
		@include bp(2) {
			display: flex;
			flex-direction: column-reverse;
		}
	}

	.overlay {
		@include bp(2) {
			display: none;
		}
	}
	.google-map-text {
		text-align: left;
		width: 50%;
		padding: 0 8% 0 8%;
		color: $color-navy;
		display: flex;
	   	align-items: flex-start;
		flex-direction: column;
		justify-content: center;
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

		h3 {
			font-size: 1.75vw;
			color: $color-gold-1;
			margin: 0;
			@include bp(3) {
				font-size: 2vw;
				margin-top: 0;
			}
			@include bp(2) {
				font-size: 6vw;
				margin-top: 0;
			}
			
		}
		address {
			display: block;
			width: 100%;
			font-style: normal;
			margin: vw(30) 0;
			@include bp(2) {
				position: relative;
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
			width: 80%;
			.inner {
				@include bp (2) {
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
				border-color: $color-gold-1;
				color: $color-gold-1;
			}
		}
		p {
			max-width: none;
			margin: 0;
			padding: 0;
		}
	}
	.google-map {
		position: absolute;
		top: 0; right: 0; bottom: 0; left: 0;
	}
	.google-map-wrap {
		width: 50%;
		position: relative;
		min-height: vw(600);
		@include bp(2) {
			width: 95%;
			height: 30vh;
			float: none;
			margin: vw(120) auto vw(120);
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
