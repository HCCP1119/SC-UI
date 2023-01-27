<template>
  <div style="background-color: #e7ebed;height: 100%">
    <el-container>
      <el-header>
        <div class="header">
          <div class="back" @click="()=>$router.push('/')">
            <el-image :src="require('@/assets/logo.png')"></el-image>
            <div class="text">
              <span>首页</span>
            </div>
          </div>
          <span class="header">账号安全 | 密码找回</span>
        </div>
      </el-header>
      <el-main>
        <div class="main">
          <div>
            <el-steps finish-status="success" process-status="finish" :active="step" align-center>
              <el-step title="确认账号"></el-step>
              <el-step title="重置密码"></el-step>
              <el-step title="重置成功"></el-step>
            </el-steps>
          </div>
          <el-divider/>
          <div style="width: 350px;margin-left: 18%;margin-top: 80px">
            <div v-if="step===0">
              <el-input v-model="account" placeholder="请输入用户名/邮箱"></el-input>
              <el-button type="primary" style="width: 350px;margin-top: 40px" @click="checkAccount">确认</el-button>
            </div>
            <div v-if="step===1">
              <el-form :model="password" status-icon :rules="passwordRules" ref="passwordForm"
                       size="medium"
                       label-width="100px"
                       label-position="right">
                <el-form-item label="新密码" prop="newPassword">
                  <el-input type="password" v-model="password.newPassword" autocomplete="off" placeholder="请输入用户名或邮箱"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="repeatPassword">
                  <el-input type="password" v-model="password.repeatPassword" autocomplete="off" show-password
                            placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input :value="userEmail" readonly></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="authCode">
                  <el-input v-model="password.authCode" autocomplete="off" placeholder="请输入邮件验证码">
                  </el-input>
                  <el-button :loading="loading" type="text" @click="sendCode">{{ btn }}</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button style="width: 100%" type="primary" @click="resetPassword" :disabled="commit"><strong>确认修改</strong></el-button>
                </el-form-item>
              </el-form>
            </div>
            <div v-if="step===3">
              <el-result icon="success" title="修改成功" subTitle="点击按钮返回首页">
                <template slot="extra">
                  <el-button type="primary" size="medium" @click="()=>$router.push('/')">返回</el-button>
                </template>
              </el-result>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {checkPass} from "@/assets/js/formCheck";

export default {
  name: "Findpassword",
  data() {
    const repeatPasswordValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.password.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      step: 0,
      account: "",
      userEmail:"",
      commit:true,
      btn: "发送",
      loading:false,
      password:{
        newPassword:"",
        repeatPassword:"",
        authCode:'',
      },
      passwordRules:{
        newPassword:[
          {required: true, message: "请输入密码", trigger: "blur"},
          {validator: checkPass, trigger: "blur"},
        ],
        repeatPassword:[
          {required: true, message: "请输入密码", trigger: "blur"},
          {validator: repeatPasswordValidator,trigger: "blur"}
        ],
        authCode:[
          {required: true, message: "验证码不能为空", trigger: "blur"},
        ]
      },
    }
  },
  methods: {
    checkAccount() {
        if (this.account!=="") {
          this.$axios({
            url: '/register/verify',
            method: "GET",
            params: {
              "account": this.account
            }
          }).then(res => {
            if (res.data.code === 200) {
              this.userEmail = res.data.data
              this.step = 1
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              })
            }
          })
        } else {
          this.$message({
            message: '请输入用户名和密码',
            type: 'error'
          });
        }
    },

    sendCode(){
      this.btn = "";
      this.loading = true;
      this.$axios({
        url: `/register/${this.userEmail}`,
        method: "post",
      }).then(res =>{
        this.loading = false;
        if (res.data.code===200){
          this.commit = false
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
        }else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
        this.btn = "发送";
      },()=>{
        this.loading = false;
        this.btn = "发送";
      })
    },

    resetPassword(){
      this.$refs.passwordForm.validate((v) => {
        if (v){
          this.$axios({
            url: "/register/reset",
            method: "post",
            data:{
              "newPassword": this.password.newPassword,
              "email": this.userEmail,
              "authCode": this.password.authCode
            }
          }).then(res => {
            if (res.data.code===200){
              this.step = 3
            }
          })
        }

      })
    }
  }
}
</script>

<style scoped lang="scss">

.el-header {
  padding: 0;
  width: 100%;
  height: 50px;
  background-color: white;

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
        width: 50px;
        position: absolute;
        float: right;
        left: 50px;
        top: 5px;
      }
    }
  }
}

.el-main {
  width: 600px;
  height: 600px;
  margin-top: 30px;
  margin-left: 30%;
  background-color: white;

  .main {
    padding-top: 30px;
    .el-form-item:nth-child(3){
    ::v-deep .el-input__inner{
      border: 0 solid #f9fafb;
      padding-left: 5px;
      height: 21px;
      font-size: 14px;
    }
  }
    .el-form-item:nth-child(4){
      ::v-deep .el-input{
        width: 190px;
      }
      .el-button{
        padding: 10px;
        margin-left: 10px;
        position: absolute;
      }
    }
  }
}

</style>