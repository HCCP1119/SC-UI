<template>
  <div>
    <el-container>
      <h2 style="padding-left: 20px;margin-bottom: 3px">设置</h2>
      <el-header>
        <el-tabs :value="value"  @tab-click="handleClick">
          <el-tab-pane label="账号信息" name="info"></el-tab-pane>
          <el-tab-pane label="我的设备" name="security"></el-tab-pane>
          <el-tab-pane label="修改密码" name="resetPassword"></el-tab-pane>
        </el-tabs>
      </el-header>
      <el-main>
        <div style="margin-top: -20px">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  name: "Setting",
  data(){
    return{
      value:'info'
    }
  },
  methods:{
    handleClick(tab){
      this.$router.push({
        path: `/note/setting/${tab.name}`
      })
    }
  },
  created() {
    const path = this.$route.path
    this.value = path.substring(path.lastIndexOf("/")+1)
  }
}
</script>
