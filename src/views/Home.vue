<template>
  <div id="home">
    <el-container>
      <el-aside width="240px">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header height="20px">
          <Top></Top>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Top from "@/components/Top";
import Aside from "@/components/Aside";
import {mapState} from 'vuex'

export default {
  name: "Home",
  components: {Top, Aside},
  data() {
    return {

    }
  },
  computed: {
    ...mapState("displayModel", ["isDark"])
  },
  methods: {

  },
  watch: {
    isDark: function (val) {
      if (val) {
        window.document.documentElement.setAttribute("data-theme", "dark");
      } else {
        window.document.documentElement.setAttribute("data-theme", "light");
      }
    }
  },
  mounted() {

  },
}
</script>

<style scoped lang="scss">
@import '../assets/scss/common/common.scss';

.el-main, .el-header {
  //在此使用了背景颜色变量
  @include background_color("background_color");
  //在此使用了文字颜色变量
  @include font_color("text-color");
  transition: background 1s, color 0.6s;
}

.el-aside {
  @include background_color("aside_color");
  @include font_color("aside_text-color");
  transition: background 1s, color 0.6s;
}

.home {
  height: 100%;
}
</style>