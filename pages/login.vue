<template>
  <el-container>
    <el-main>
      <el-row type="flex">
        <el-col :span="24">
          <div class="grid-content">
            <h3 class="title">Please login to see the index content</h3>
          </div>
          </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="8" class="input-box">
          <el-form v-if="!$store.state.authUser" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <div class="bg-box">
              <el-form-item label="用户名">
                <el-input v-model="formUsername"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="formPassword"></el-input>
              </el-form-item>
            </div>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form>
          <div v-else>
            Hello {{ $store.state.authUser.username }}!
            <pre>I am the secret content, I am shown only when the user is connected.</pre>
            <p><i>You can also refresh this page, you'll still be connected!</i></p>
            <button @click="logout">
              Logout
            </button>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" class="input-box">
        <el-col :span="12">
          <p class="link">
            <NuxtLink to="/">
              Super index page
            </NuxtLink>
          </p>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import sha512 from "js-sha512"
export default {
  data() {
    return {
      labelPosition: 'left',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      formError: null,
      formUsername: '',
      formPassword: ''
    }
  },
  methods: {
    async login() {
      let timestamp = new Date().getTime();
      let pwd1 = sha512(`${this.formPassword}:yzyx`);
      let pwd2 = sha512(`${pwd1}${timestamp}`);
      console.log(pwd2);
      try {
        await this.$store.dispatch('login', {
          jobNo: this.formUsername,
          pwd: pwd2,
          timestamp: timestamp
        })
        this.formUsername = ''
        this.formPassword = ''
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
    }
  }
}
</script>

<style lang="less" scoped>
.grid-content{
  padding-top: 100px;
  text-align: center;
  .title{
    font-size:46px; 
    font-weight: bolder;
    margin: 40px 0 40px;
  }
}
.input-box{
  text-align: center;
  .bg-box{
    padding: 30px 15px 10px;
    background: #f7f7f7;
    margin-bottom: 25px;
    border-radius: 15px;
  }
}
.error {
  color: red;
}
.link{
  margin-top: 45px;
}
</style>
