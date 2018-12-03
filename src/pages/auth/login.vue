<template>
  <div id="login" class="border-box">
    <div class="login">登录</div>
    <div class="register-logo">
      <img src="../../assets/forever/logo/logo.png" alt="">
    </div>
    <div class="register-form">
      <div class="re_input">
        <div class="login-input pad10">
          <img src="../../assets/forever/shoujihao.png" alt="">
          <input v-model="loginForm.mobile" placeholder="手机号">
        </div>
        <div class="login-input pad10">
          <img src="../../assets/forever/mima.png" alt="">
          <input type="password" v-model="loginForm.password" placeholder="密码">
        </div>
      </div>

      <div class="login-tips" @click="jumpTo('/forget')">忘记密码</div>
      <div class="login-btn" @click="login" :disabled="!loading">
        登录
      </div>
      <div class="footer">
        <div class="left"></div> <span @click="jumpTo('/register')">注册账号</span> <div class="right"></div>
      </div>
    </div>

  </div>
</template>

<script>
  import * as utils from '../../utils'
  import './auth.less'
  import {XHeader, XInput, XButton, PopupPicker, Group} from 'vux'
  export default {
    components: {
      XHeader,
      XInput,
      XButton,
      PopupPicker,
      Group
    },
    data () {
      return {
        loginForm: {
          mobile: '',
          password: ''
        },
        loading: true,
        imgSrc: '',
        codeUrl: ''
      }
    },
    methods: {
      getuserinfo () {
        this.$http.post('/m1/center/user-info').then((res) => {
          utils.storage.set('userinfo', res.data)
        }).catch((res) => {
          console.log(res)
        })
      },
      login () {
        // this.$http.post('/m1/login/login', this.loginForm).then(response => {
        //   if (response.code === 0) {
        //     console.log(response)
        //   }
        // })
        this.loading = false
        this.$store.dispatch('user/login', this.loginForm).then((response) => {
          this.getuserinfo()
          this.loading = true
          if (response.code === 0) {
            console.log(response)
            utils.storage.set('name', this.loginForm.mobile)
            utils.storage.set('password', this.loginForm.password)
            this.$router.replace({path: '/'})
          } else {
            this.$vux.toast.show({type: 'cancel', text: response.msg})
          }
        }).catch((e) => {
          this.loading = true
        })
      }
    },
    mounted () {
    }
  }
</script>
<style scoped lang="less">
  .logo{
    display: block;
    width: 100px;
    margin: 30px auto;
    overflow: hidden;
    height: 94px;
    /*-webkit-border-radius: 50%;*/
    /*-moz-border-radius: 50%;*/
    /*border-radius: 50%;*/
    img{
      width: 100%;
    }
  }
</style>
