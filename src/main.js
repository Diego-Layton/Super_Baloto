// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')

// import Vue from 'vue';
// import VueSweetalert2 from 'vue-sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';
// Vue.use(VueSweetalert2);

import { createApp } from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import App from './App.vue';
import './style.css';

// Configuración de SweetAlert2 como plugin de Vue
const app = createApp(App);
app.use(VueSweetalert2);

// Montar la aplicación Vue en el elemento con id 'app'
app.mount('#app');