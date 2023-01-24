<template>
  <div>
    <el-dialog
        title="登录"
        :visible.sync="loginDia"
        width="30%"
        center
        :close-on-click-modal="false"
        ref="login"
    >
      <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm"
               label-width="100px"
               label-position="top">
        <el-form-item label="用户名/邮箱" prop="username">
          <el-input type="text" v-model="loginForm.username" autocomplete="off" placeholder="请输入用户名或邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off" show-password
                    placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="login"><strong>登录</strong></el-button>
        </el-form-item>
        <el-form-item style="display: flex;justify-content: space-between;">
          <el-link type="primary" style="margin-right: 50px" :underline="false" @click="reg">快速注册</el-link>
          <el-link type="primary" :underline="false">找回密码</el-link>
          <el-link type="primary" style="margin-left: 50px" :underline="false">主要链接</el-link>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
        class="register"
        title="注册"
        :visible.sync="registerDia"
        width="30%"
        center
        top="3vh"
        :close-on-click-modal="false"
        ref="register"
    >
      <el-form :model="regForm" status-icon :rules="regRules" ref="ruleForm"
               label-width="100px" class="demo-ruleForm"
               label-position="top">
        <el-form-item label="名称" prop="nickname">
          <el-input type="text" v-model="regForm.nickname" autocomplete="off" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="regForm.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="regForm.username" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="regForm.password" autocomplete="off" show-password
                    placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="authCode">
          <el-input type="text" v-model="regForm.authCode" autocomplete="off" placeholder="请输入验证码"
                    style="width: 365px"></el-input>
          <el-button :loading="loading" type="text" style="position: absolute;right: 1px;height: 40px"
                     @click="AuthCode">
            {{ btn }}
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%;" type="primary" @click="register"><strong>注册</strong></el-button>
        </el-form-item>
        <el-form-item style="display: flex;justify-content: space-between;">
          <el-link type="primary" style="margin-right: 50px" :underline="false" @click="reg">登录</el-link>
          <el-link type="primary" :underline="false">找回密码</el-link>
          <el-link type="primary" style="margin-left: 50px" :underline="false">主要链接</el-link>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {checkNull, checkPass} from "@/assets/js/formCheck"

export default {
  name: "Login",
  data() {
    return {
      loginDia: false,
      registerDia: false,
      loading: false,
      btn: "发送",
      loginForm: {
        username: "",
        password: "",
      },
      regForm: {
        nickname: "",
        email: "",
        username: "",
        password: "",
        authCode: ""
      },
      regRules: {
        nickname: [
          {required: true, message: "请输入昵称", trigger: "blur"},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'},
          {validator: checkNull, trigger: "blur"},
        ],
        email: [
          {required: true, message: "请输入邮箱", trigger: "blur"},
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "请输入正确的邮箱地址",
            trigger: "blur"
          }
        ],
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"},
          {
            pattern: /^[a-zA-Z0-9_-]{1,12}$/,
            message: "不能包含特殊字符"
          },
          {validator: checkNull, trigger: "blur"},
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur",},
          {validator: checkPass, trigger: "blur"},
        ],
        authCode: [
          {required: true, message: "请输入验证码", trigger: "blur",},
          {validator: checkNull, trigger: "blur"},
        ],
      },
      loginRules: {
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"},
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
        ],
      }
    }
  },
  watch: {},
  methods: {
    login() {
      this.$refs.loginForm.validate(v => {
        if (v) {
          this.$axios({
            url: '/login',
            method: 'post',
            headers: {"isToken":false},
            data: {
              "username":this.loginForm.username,
              "password": this.loginForm.password
            }
          }).then(res => {
                console.log(res)
                if (res.data.code===500){
                  this.$message({
                    message: res.data.msg,
                    type: 'error'
                  });
                }else {
                  localStorage.setItem("token", "Bearer " + res.headers['authorization'])
                  localStorage.setItem("uid", res.data.data)
                  this.$router.push("/note/workspace/list")
                }
              },
              error => {
                console.log(error)
                this.$message({
                  message: error.response.data.msg,
                  type: 'error'
                });
              }
          )
        } else {
          this.$message({
            message: '请输入用户名和密码',
            type: 'error'
          });
        }
      });
    },
    register() {
      this.$refs.ruleForm.validate(v => {
        if (v) {
          this.$axios.post("/register", this.regForm).then(
              res => {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                setTimeout(() => {
                  this.registerDia = false;
                  this.loginDia = true;
                }, 2000)
                this.loginForm.username = this.regForm.username;
              },
              error => {
                this.$message({
                  message: "注册失败，请稍后再试",
                  type: 'error'
                });
                console.log(error.message)
              }
          )
        } else {
          this.$message({
            message: '请检查填写的信息',
            type: 'error'
          });
        }
      });
    },
    reg() {
      if (this.loginDia) {
        this.registerDia = !this.registerDia;
        setTimeout(() => {
          this.loginDia = !this.loginDia;
        })
      } else {
        this.loginDia = !this.loginDia;
        setTimeout(() => {
          this.registerDia = !this.registerDia;
        });
      }
    },
    AuthCode() {
      this.$refs.ruleForm.validateField("email", (e) => {
        if (e.length === 0) {
          this.btn = "";
          this.loading = true;
          this.$axios.post("/register/" + this.regForm.email).then(
              res => {
                this.loading = false;
                if (res.data.code === 200) {
                  this.$message({
                    message: res.data.msg,
                    type: 'success'
                  })
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: 'error'
                  })
                }
                this.btn = "发送";
              },
              error => {
                this.loading = false;
                console.log(error.message)
              }
          );
        } else {
          this.$message({
            message: e,
            type: 'error'
          });
        }
      });
    },
  },
  mounted() {
    this.$bus.$on("logDig", (dig) => {
      this.loginDia = dig;
    });
    this.$bus.$on("regDig", (dig) => {
      this.registerDia = dig;
    })
  }
}
</script>

<style lang="scss">
.el-dialog__body {
  text-align: inherit;
  padding: 10px 25px 5px !important;
}

.el-form--label-top .el-form-item__label {
  line-height: 20px !important;
  padding: 0 !important;
}

.el-form-item {
  margin-bottom: 25px;
}
</style>
