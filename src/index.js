import fullpage from 'fullpage.js';
import slides from './scripts/slides.js';
import './styles/index.scss';
import menu from './scripts/menu';

$(document).ready(function(){
	
	slides();
	menu();
	$.fn.fullpage.moveTo('welcome');

	/* Cache bust some shit */
	$('link[href="/styles.css"]').attr('href', '/styles.css?v=' + Date.now());
	$('script[src="/scripts.js"]').attr('src', '/scripts.js?v=' + Date.now());
});

$(window).on('load', function() {

	/* Add for CSS control */
	$('body').addClass('loaded');
	/* Remove some elements that are not needed */
	setTimeout(()=> {
		[
			'#mfPreviewBarShow',
			'#mfPreviewBar'
		].forEach(thing => $(thing).remove());		
	}, 0);

});


