<template>
  <div class="wel">
    <el-container>
      <el-header>
        <div class="header">
          <div class="back" @click="()=>$router.push('/')">
            <el-image :src="require('@/assets/logo.png')"></el-image>
            <div class="text">
              <span>SC-Note</span>
            </div>
          </div>
          <div style="position: fixed;right: 10px;top: 10px">
            <div style="float: left">
              <el-button @click="login" style="background-color: lightblue;color: steelblue;margin-right: 10px">
                <strong>登录</strong></el-button>
            </div>
            <div style="float: left">
              <el-button @click="register" type="primary"><strong>注册</strong></el-button>
            </div>
          </div>
        </div>
      </el-header>
      <el-main>
        <div class="main">
          <div class="text">
            <h1 style="font-size: 40px">你的<a style="color: cornflowerblue">云端笔记</a>库</h1>
            <p>你还在使用纸笔来记录笔记？上次记录的内容保存在哪？<br/>想要记录的时候发现没有可用的工具？ 需要查找的时候发现笔记没有在身边? 不妨来试试云笔记</p>
            <el-button type="primary" icon="el-icon-star-off" @click="start">立即使用</el-button>
            <el-button style="color: darkturquoise;margin-left: 50px;">
              <img src="../assets/github.png" style="height: 13px;width: 13px;"> GitHub
            </el-button>
          </div>
          <div>
            <Login></Login>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Login from "@/components/Login";

export default {
  name: "Welcome",
  components: {Login},
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    start() {
      const isLogin = Number(localStorage.getItem("isLogin"))
      if (isLogin){
       this.$router.push("/note/workspace/list")
      }else {
        this.$bus.$emit("logDig", !this.dialogVisible);
      }
    },
    login() {
      this.$bus.$emit("logDig", !this.dialogVisible);
    },
    register() {
      this.$bus.$emit("regDig", !this.dialogVisible);
    }
  },
  created() {
    const token = localStorage.getItem("token")
    if (token !== '' && token !== null && token !== undefined) {
      localStorage.setItem("isLogin", 1)
    } else {
      localStorage.setItem("isLogin", 0)
    }
  }
}
</script>

<style scoped lang="scss">
.wel {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

.el-header {
  padding: 0;
  width: 100%;
  height: 50px;
  background-color: #b9cff4;
  .header {
    text-align: center;
    height: 25px;
    margin: 15px 0 0 10px;
    font-size: 18px;
    line-height: 25px;
    .back{
      position: absolute;
      left: 15px;
      top: 5px;
      .el-image{
        width: 80%;
        height: 50%;
        float: left;
      }
      .text{
        color: #409EFF;
        width: 100px;
        display: block;
        position: absolute;
        float: right;
        left: 50px;
        top: 10px;
      }
    }
  }
}
.el-main{
  background-image: url("../assets/images/home.png");
  background-size:  cover;
  .main{
    height: 464px;
  }
  .text{
    text-align: center;
    margin-top: 10%;
  }
  .text p {
    color: grey;
    line-height: 30px;
  }
}
</style>
