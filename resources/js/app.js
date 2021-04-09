require('./bootstrap');

window.Vue = require('vue').default;

import VueRouter from 'vue-router';
import routes from './routers/router';
import App from './components/App.vue';
import store from './store/store';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

const app = new Vue({
    el: '#app',
    components: {App},
    router,
    store
});
