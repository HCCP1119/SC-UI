<template>
  <div id="Top">
    <el-switch
        v-model="value"
        active-color="#13ce66"
        inactive-color="#000000"
        @change="changeModel(!value)"
        >
    </el-switch>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "Top",
  data(){
    return{
      value:true
    }
  },
  computed:{

  },
  methods:{
    ...mapActions('displayModel',['changeModel'])
  },
  mounted() {
      window.document.documentElement.setAttribute( "data-theme", 'light' );
  }
}
</script>

<style scoped lang="scss">
#Top{
  width: 100%;
}
.el-switch{
  position: fixed;
  top: 10px;
  right: 20px;
}
</style>