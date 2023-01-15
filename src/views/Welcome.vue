<template>
  <div class="wel">
    <el-container>
      <el-header>
        <div style="margin-left: 89%;margin-top: 5px">
          <div style="float: left">
            <el-button @click="login" style="background-color: lightblue;color: steelblue;margin-right: 10px"><strong>登录</strong></el-button>
          </div>
          <div>
            <el-button @click="register" type="primary"><strong>注册</strong></el-button>
          </div>
        </div>
      </el-header>
      <el-main>
        <div class="text">
          <h1>你的<a style="color: cornflowerblue">云端笔记</a>库</h1>
          <p>你还在使用纸笔来记录笔记？上次记录的内容保存在哪？<br/>想要记录的时候发现没有可用的工具？ 需要查找的时候发现笔记没有在身边? 不妨来试试云端笔记</p>
          <el-button type="primary" icon="el-icon-star-off" @click="start">立即使用</el-button>
          <el-button style="color: darkturquoise;margin-left: 50px;" ><img src="../assets/github.png" style="height: 13px;width: 13px;"> GitHub</el-button>
        </div>
        <div>
          <Login></Login>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Login from "@/components/Login";

export default {
  name: "Welcome",
  components:{Login},
  data(){
    return {
      dialogVisible:false
    }
  },
  methods:{
    start(){
      this.$router.push("/note/workspace/list")
    },
    login(){
      this.$bus.$emit("logDig",!this.dialogVisible);
    },
    register(){
      this.$bus.$emit("regDig",!this.dialogVisible);
    }
  }
}
</script>

<style>
.wel{
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.text{
  position: relative;
  text-align: center;
  margin-top: 10%;
}
.text p{
  color: grey;
  line-height: 30px;
}
</style>
