import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/common.css";
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"
import Button from 'primevue/button';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import Dialog from 'primevue/dialog';
import ProgressSpinner from 'primevue/progressspinner';

const app = createApp(App)

app.component('Button', Button)
app.component('Dialog', Dialog)
app.component('ProgressSpinner', ProgressSpinner)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.use(PrimeVue);
app.mount("#app")
