import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import DocEditor from "../packages";
Vue.use(DocEditor);
import "remixicon/fonts/remixicon.css";
Vue.config.productionTip = false;
const instance = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
window.instance = instance;
