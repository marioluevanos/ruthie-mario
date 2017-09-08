import Vue from 'vue';
import Router from 'vue-router';
import RSVP from '@/pages/rsvp';
import Index from '@/pages/index';

Vue.use(Router);

export default new Router({
	routes: [{
		path: '/',
		name: 'Index',
		component: Index
	}, {
		path: '/rsvp',
		name: 'RSVP',
		component: RSVP
	}]
})