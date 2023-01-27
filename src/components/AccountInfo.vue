<template>
  <div v-loading="loading" class="info">
    <div style="padding-bottom: 25px">
      <label style="font-size: 14px">账号</label>
      <el-input style="margin-top: 5px" readonly :value="user.email"></el-input>
    </div>
    <div style="padding-bottom: 25px">
      <label style="font-size: 14px">用户名</label>
      <el-input style="margin-top: 5px" readonly :value="user.username"></el-input>
    </div>
    <div style="padding-bottom: 15px">
      <label style="font-size: 14px">注册日期</label>
      <el-input style="margin-top: 5px" readonly :value="user.createTime"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountInfo",
  data() {
    return {
      loading: true,
      user: {},
    }
  },
  created() {
    this.$axios({
      url: '/users/getUser',
      method: 'get',
    }).then(res => {
      this.loading = false
      this.user = res.data.data.user
    })
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/common/common";

.info{
  ::v-deep .el-input__inner {
    @include font_color("aside_text-color");
    @include background_color("background_color");
  }
}
</style>
