<template>
  <div class="about">
    <h1>子应用一About</h1>
    <el-input v-model="txt" placeholder=""></el-input>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name:"About",
  setup(){
    let txt = ref('')
    
    return{
      txt
    }
  }
  
}
</script>