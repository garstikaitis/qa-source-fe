import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui';
import draggable from 'vuedraggable';
import Dropzone from 'vue2-dropzone';
import './assets/theme/index.css';
import axios from 'axios';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import Cookies from 'js-cookie';

axios.defaults.baseURL = 'http://qa-source.test/api/';
axios.defaults.headers.common.Authorization = `Bearer ${Cookies.get('authToken')}`;

Vue.component('draggable', draggable);
Vue.component('dropzone', Dropzone);
import { upperFirst, camelCase } from 'lodash';

const requireComponent = require.context(
  // The relative path of the components folder
  './components',
  // Whether or not to look in subfolders
  true,
  // The regular expression used to match base component filenames
  /[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName)

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )


  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  )
})

Vue.config.productionTip = false
Vue.use(Element);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
