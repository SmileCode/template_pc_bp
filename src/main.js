import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'

import $ from 'jquery';
import './lib/index.css';
import 'element-ui/lib/theme-chalk/index.css';
import routes from './router/router';
import lsx from 'lsx';

window.S_TOKEN_NAME = "TOKEN_NAME";
window.H_TOKEN_NAME = "token";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    next();
});

new Vue({
    router
}).$mount('#app');
