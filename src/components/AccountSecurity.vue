<template>
  <div>
    <div style="margin-top: -20px">
      <div class="main-data">
        <el-row v-for="col in tokenList" :key="col.id">
          <div>
            <el-col :span="1">
              <div style="width: 40px;height: 40px;background-color: #e7f5ff;border-radius: 5px">
                <el-image :src="require('@/assets/images/notebook.png')"
                          style="width: 20px;height: 20px;padding-left: 10px;padding-top: 10px;"></el-image>
              </div>
            </el-col>
            <el-col :span="20" style="margin-top: -3px">
              <div style="font-size: 20px">{{ col.token }}</div>
              <div>
                <span style="font-size: 10px;padding-right: 15px">{{ col.device}}/{{col.browser}}</span>
                <span style="font-size: 10px;padding-right: 15px">登录时间：{{ col.loginTime}} | {{col.address}}</span>
                <span style="font-size: 10px" v-if="col.updateTime!==null">登录ip：{{ col.ip }}</span>
              </div>
            </el-col>
            <el-col :span="2">
              <div>
                <el-button
                    style="margin-left: 50px"
                    type="primary"
                    size="medium"
                    @click="() => remove(col.id)">
                  <span style="font-size: 14px">删除</span>
                </el-button>
              </div>
            </el-col>
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountSecurity",
  data(){
    return{
      tokenList:[],
    }
  },
  methods:{

  },
  created() {
    this.$axios.get("/users/token").then(res => {
      this.tokenList = res.data.data
      console.log(res.data)
    })
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/common/common";

.main-data {
  max-height: 500px;
  overflow-y: auto;

  .el-row{
    height: 70px;
    width: 100%;
    border-bottom: 1px solid grey;
  }
  .el-row:last-child{
    border-bottom: 0 solid grey;
  }

  .el-col {
    padding-top: 15px;
    padding-left: 15px;
  }
}
</style>