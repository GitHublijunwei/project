<template>
  <div id="login" class="border-box">
    <div class="register-logo">
      <div>
        <a class="goback" @click="goBack()"><i class="iconfont icon-back"></i></a>
        <span>找回密码</span>
      </div>
      <img src="../../assets/forever/logo/logo.png" alt="">
    </div>
    <div class="register-form">
      <div class="re_input">
        <div class="login-input pad10">
          <img src="../../assets/forever/shoujihao.png" alt="">
          <input v-model="form.mobile" placeholder="请输入手机号">
        </div>
        <div class="login-input pad10 smallButton">
          <img src="../../assets/forever/yanzhengma.png" alt="">
          <input type="text" v-model="form.smsCode" placeholder="请输入验证码">
          <p v-on:click="getSmsCode" :diabled="smsCodeBtnDisabled" v-show="!showCount">点击获取</p>
          <button disabled="true" v-show="showCount">{{count}}s</button>
        </div>
        <div class="login-input pad10">
          <img src="../../assets/forever/mima.png" alt="">
          <input type="password" v-model="form.password" placeholder="请输入密码">
        </div>
      </div>

      <!--<div class="login-input pad10">-->
        <!--<i class="iconfont icon-mima"></i>-->
        <!--<input type="password" v-model="form.password" placeholder="请确认密码">-->
      <!--</div>-->
      <div class="login-btn" @click="register">
        <span>确定</span>
      </div>
    </div>

  </div>
</template>

<script>
  // import * as api from '../../api/index'

  export default {
    data () {
      return {
        form: {
          mobile: '',
          password: '',
          smsCode: '',
          timer: null
        },
        count: '',
        smsCodeBtnDisabled: false,
        registerBtnDisabled: false,
        showCount: false
      }
    },
    methods: {
      getSmsCode () {
        this.smsCodeBtnDisabled = true
        const mobile = this.form.mobile.trim()
        this.$http.post('/m1/login/phone-sms', {
          mobile: mobile
        }).then(response => {
          this.smsCodeBtnDisabled = false
          this.$vux.toast.show({
            type: 'cancel',
            width: '20em',
            text: response.msg
          })
          if (response.code === 0) {
            if (!this.timer) {
              this.count = 60
              this.showCount = true
              this.timer = setInterval(() => {
                if (this.count > 1) {
                  this.count--
                } else {
                  this.showCount = false
                  clearInterval(this.timer)
                  this.timer = null
                }
              }, 1000)
            }
          }
        })
      },
      register () {
        this.registerBtnDisabled = false
        const mobile = this.form.mobile.trim()
        const password = this.form.password.trim()
        const smsCode = this.form.smsCode.trim()
        this.$http.post('/m1/login/retrieve-pwd', {
          mobile: mobile,
          smsCode: smsCode,
          password: password
        }).then(response => {
          if (response.code === 0) {
            this.$vux.toast.show({
              width: '20em',
              text: response.msg
            })
            this.$router.push({name: 'login'})
          } else {
            this.$vux.toast.show({
              type: 'cancel',
              width: '20em',
              text: response.msg
            })
          }
        })
      }
    }
  }
</script>
