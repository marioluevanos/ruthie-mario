export default function() {
	return [{
		"featureType": "water",
		"elementType": "geometry",
		"stylers": [{
			"color": "#496288"
		}]
	},
	{
		"featureType": "landscape",
		"elementType": "geometry",
		"stylers": [{
			"color": "#d2cebd"
		}]
	},
	{
		"featureType": "road",
		"elementType": "geometry",
		"stylers": [{
			"color": "#f3eeda"
		}, {
			"lightness": 10
		}]
	},
	{
		"featureType": "poi",
		"elementType": "geometry",
		"stylers": [{
			"color": "#f3eeda"
		}]
	},
	{
		"featureType": "transit",
		"elementType": "geometry",
		"stylers": [{
			"color": "#f3eeda"
		}]
	},
	{
		"elementType": "labels.text.stroke",
		"stylers": [{
			"visibility": "on"
		}, {
			"color": "#FFFFFF"
		}, {
			"weight": 2
		}]
	},
	{
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#42413c"
		}]
	},
	{
		"featureType": "administrative",
		"elementType": "geometry",
		"stylers": [{
			"weight": 0.6
		}, {
			"color": "#c2beae"
		}]
		}, {
		"elementType": "labels.icon",
		"stylers": [{
			"visibility": "off"
			}]
		}, {
		"featureType": "poi.park",
		"elementType": "geometry",
		"stylers": [{
			"color": "#c2beaf"
		}]
	}]
}
