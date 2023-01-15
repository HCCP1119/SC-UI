<template>
  <div id="Top">
    <el-switch
        v-model="value"
        active-color="#13ce66"
        inactive-color="#000000"
        @change="changeVal"
    >
    </el-switch>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "Top",
  data() {
    return {
      value: null
    }
  },
  watch: {
    colorSwitch() {
      this.value = this.colorSwitch
      const theme = this.value ? 'light' : 'dark'
      localStorage.setItem("isLight", this.value)
      localStorage.setItem("theme", theme)
    }
  },
  computed: {
    ...mapState("displayModel", ['colorSwitch']),
  },
  methods: {
    changeVal() {
      this.$store.dispatch("displayModel/changeModel", !this.value)
    }
  },
  mounted() {
    this.value = this.colorSwitch
    // const theme = (localStorage.getItem("isLight")) ? 'dark' : 'light'
    // window.document.documentElement.setAttribute("data-theme", theme);
  }
}
</script>

<style scoped lang="scss">
#Top {
  width: 100%;
}

.el-switch {
  position: fixed;
  top: 10px;
  right: 20px;
}
</style>