import "./public-path";
import { createApp, getCurrentInstance } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

let instance = createApp(App) .use(store) .use(router) .use(ElementPlus);

function render({ routes, routerBase, container } = {}) {
  instance.mount(container ? container.querySelector("#appChild1") : "#appChild1");
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log("子应用1—————bootstraped");
}

export async function mount(props) {
  //挂载全局属性，必须在render方法前进行
  //vue3中使用Provide/Inject依赖注入，将替代vue2中在原型链上挂载一些属性
  //https://blog.csdn.net/MZS_ym/article/details/108868102
  //或查找其他方法
  instance.config.globalProperties.$parentProps = props;
  render(props);
}

export async function unmount() {
  instance.unmount()
  instance = null;
  router = null
}
