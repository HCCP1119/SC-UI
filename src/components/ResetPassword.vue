<template>
  <div>
    <el-form :model="password" status-icon :rules="formRules" ref="ruleForm"
             label-width="100px" class="demo-ruleForm"
             label-position="top">
      <el-form-item label="请输入旧密码" prop="oldPassword">
        <el-input type="password" v-model="password.oldPassword" autocomplete="off" show-password
                  placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="设置新密码" prop="newPassword">
        <el-input type="password" v-model="password.newPassword" autocomplete="off" show-password
                  placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="resetPassword"><strong>确定</strong></el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {checkPass} from "@/assets/js/formCheck";

export default {
  name: "ResetPassword",
  data() {
    return {
      password:{
        oldPassword: "",
        newPassword: "",
      },
      formRules: {
        oldPassword:[
          {required: true, message: "请输入密码", trigger: "blur",},
        ],
        newPassword:[
          {required: true, message: "请输入密码", trigger: "blur",},
          {validator: checkPass, trigger: "blur"},
        ],
      },
    }
  },
  methods: {
    resetPassword(){
      this.$refs.ruleForm.validate(v => {
        if (v) {
          this.$axios({
            url: "/changePassword",
            data: this.password.newPassword,
          }).then(res => {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
          })
        } else {
          this.$message({
            message: '请检查填写的信息',
            type: 'error'
          });
        }
      })
    },
  },
}
</script>

<style scoped>

</style>