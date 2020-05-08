import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import draggable from 'vuedraggable';
import Dropzone from 'vue2-dropzone';
import './assets/theme/index.css';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import loadComponents from './utils/register-components';
import VueCompositionApi from '@vue/composition-api';


loadComponents();

Vue.component('draggable', draggable);
Vue.component('dropzone', Dropzone);

Vue.config.productionTip = false
Vue.use(Element, { locale });
Vue.use(require('vue-moment'));
Vue.use(VueCompositionApi);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
