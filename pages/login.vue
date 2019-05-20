<template>
  <div>
    <el-card class="login-form-layout">
      <el-form autoComplete="on"
               :model="loginForm"
               :rules="loginRules"
               ref="loginForm"
               label-position="left">
        <div style="text-align: center">
          <img :src="iconcloud" style="width: 86px;height: 66px;color: #409EFF;margin-bottom: 6px;">
          <h2 class="login-title color-main">在线教学系统</h2>
        </div>
        <el-form-item prop="username">
          <el-input name="username"
                    type="text"
                    v-model="loginForm.username"
                    autoComplete="on"
                    placeholder="请输入用户名">
          <span slot="prefix">
            <img :src="user" class="icon">
          </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password"
                    :type="pwdType"
                    @keyup.enter.native="login"
                    v-model="loginForm.password"
                    autoComplete="on"
                    placeholder="请输入密码">
          <span slot="prefix">
            <img :src="password" class="icon">
          </span>
            <span slot="suffix" @click="showPwd">
              <img :src="eye" class="icon">
            </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px">
          <el-button style="width: 100%" :loading="loading" @click.native.prevent="login" class="bg-color-main">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <img :src="login_center_bg" class="login-center-layout">
  </div>
</template>


<script>
import sha512 from "js-sha512"
import login_center_bg from '~/static/login_center_bg.png'
import iconcloud from '~/static/icon-cloud.png'
import user from '~/static/user.png'
import password from '~/static/password.png'
import eye from '~/static/eye.png'

export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      loginRules: {
        // username: [{required: true, trigger: 'blur', validator: validateUsername}],
        // password: [{required: true, trigger: 'blur', validator: validatePass}]
      },
      loading: false,
      pwdType: 'password',
      login_center_bg,
      iconcloud,
      user,
      password,
      eye,
      dialogVisible:false
    }
  },
  methods: {
    async login() {
      let timestamp = new Date().getTime();
      let pwd1 = sha512(`${this.loginForm.password}:yzyx`);
      let pwd2 = sha512(`${pwd1}${timestamp}`);
      try {
        await this.$store.dispatch('login', {
          jobNo: this.loginForm.username,
          pwd: pwd2,
          timestamp: timestamp
        })
        this.loginForm.username = ''
        this.loginForm.password = ''
        this.formError = null
      } catch (e) {
        this.$message.error(e.message);
        this.formError = e.message
      }
    },
    async logout() {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        this.formError = e.message
      }
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
  }
}
</script>

<style scoped>
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: 140px auto;
    border-top: 10px solid rgb(255, 208, 75);
  }
  .icon {
    width: 18px;
    height: 18px;
    transform: translateY(4px)
  }
  .login-title {
    text-align: center;
    margin-bottom: 12px;
  }
  .color-main {
    color: rgb(255, 208, 75);
  }
  .bg-color-main {
    background-color:rgb(255, 208, 75); 
  }
  .login-center-layout {
    background: rgb(255, 208, 75);
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 200px;
  }
</style>
