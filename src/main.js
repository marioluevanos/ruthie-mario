import Vue from 'vue';
import App from './App';
import VueFire from 'vuefire';
import router from './router'

Vue.component('wedding-monogram', require('./components/monogram.vue'));
Vue.component('wedding-image', require('./components/wedding-image.vue'));
Vue.component('wedding-button', require('./components/wedding-button.vue'));
Vue.component('wedding-navigation', require('./components/navigation.vue'));
Vue.component('wedding-countdown', require('./components/countdown.vue'));
Vue.component('wedding-loader', require('./components/loader.vue'));

Vue.component('google-map', require('./components/google-map.vue'));

Vue.use(VueFire);

Vue.config.productionTip = false;

new Vue({
	el: '#app',
	router,
	mode: 'history',
	template: '<App/>',
	components: {
		App
	}
});