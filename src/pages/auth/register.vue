<template>
  <div id="login" class="border-box">
    <div class="register-logo">
      <div>
        <a class="goback" @click="goBack()"><i class="iconfont icon-back"></i></a>
        <span>注册</span>
      </div>
      <img src="../../assets/forever/logo/logo.png" alt="">
    </div>
    <div class="register-form">
      <div class="re_input">
        <div class="login-input pad10">
          <img src="../../assets/forever/shoujihao.png" alt="">
          <input v-model="form.mobile" placeholder="手机号">
        </div>
        <div class="login-input pad10 smallButton">
          <img src="../../assets/forever/yanzhengma.png" alt="">
          <input type="password" v-model="form.smsCode" placeholder="短信验证码">
          <p v-on:click="getSmsCode" :diabled="smsCodeBtnDisabled" v-show="!showCount">点击获取</p>
          <button disabled="true" v-show="showCount">{{count}}s</button>
        </div>
        <div class="login-input pad10">
          <img src="../../assets/forever/mima.png" alt="">
          <input type="password" v-model="form.password" placeholder="请输入密码">
        </div>
        <div class="login-input pad10">
          <img src="../../assets/forever/yaoqingma.png" alt="">
          <input type="text" v-model="form.recomPerson" placeholder="请输入邀请码">
        </div>
        <div class="login-input pad10">
          <img src="../../assets/forever/mima.png" alt="">
          <input type="text" v-model="form.real_name" placeholder="请输入姓名">
        </div>
        <div class="login-input pad10">
          <img src="../../assets/forever/yaoqingma.png" alt="">
          <input type="text" v-model="form.id_number" placeholder="请输入身份证号">
        </div>
      </div>

      <div class="login-btn" @click="register">
        <span>注册</span>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          mobile: '',
          password: '',
          smsCode: '',
          recomPerson: '',
          real_name: '',
          id_number: ''
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
        const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
        const mobile = this.form.mobile.trim()
        if (reg.test(this.form.mobile)) {
          this.$http.post('/m1/login/phone-sms', {
            mobile: mobile
            // scenario: 'register'
          }).then(response => {
            this.smsCodeBtnDisabled = false
            this.$vux.toast.text(response.msg)
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
        } else {
          this.$vux.toast.text('手机号输入错误')
        }
      },
      register () {
        this.registerBtnDisabled = false
        // const mobile = this.form.mobile.trim()
        // const password = this.form.password.trim()
        // const smsCode = this.form.smsCode.trim()
        // const referrer = this.form.referrer.trim()
        this.$http.post('/m1/login/register', this.form).then(response => {
          this.registerBtnDisabled = false
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
