<template>

  <div style="background:lightpink;padding:30px">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>

    <router-view v-slot="{ Component }">
      <keep-alive :include="loadedRouteNames">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>

</template>

<script>
import { getCurrentInstance, onMounted, reactive } from "vue"
import {useRoute, useRouter} from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    let loadedRouteNames = reactive([]);
    const { ctx } = getCurrentInstance(); 

    onMounted(() => {
      
      if (window.__POWERED_BY_QIANKUN__) {
        ctx.$parentProps.onGlobalStateChange((state) => {
          const sub1 = state["sub1"]
          if(sub1){
            const { subRoutes } = sub1;
            const loadedRoutes = subRoutes.map((item) => router.resolve(item));
            const loadedRouteNames_temp = loadedRoutes.map((item) => item.name);

            loadedRouteNames.splice(0,loadedRouteNames.length)
            loadedRouteNames.push(...loadedRouteNames_temp)

            console.log('sub1',loadedRouteNames)
          }
        }, true);
      }

    });

    return{
      route,
      loadedRouteNames
    }
  },
};
</script>

<style lang="less">
#appChild1 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
