import { createApp } from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import App from './App.vue';
import './style.css';

const app = createApp(App);
app.use(VueSweetalert2);

app.mount('#app');
