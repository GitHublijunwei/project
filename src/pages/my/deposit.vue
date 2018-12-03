<template>
    <div class="Deposit_main" id="tx">
      <x-header :left-options="{backText: ''}">提现<a @click="jumpTo({name: 'txlist'})" slot="right">提现详情</a>
      </x-header>
        <div class="Deposit_header">
          <table></table>
            <p>可提现余额（元）</p>
            <div>{{money}}</div>
        </div>
        <div class="Deposit_count">
          <div class="count_main">
            <div class="icon">
              <p v-if="!show">提现到{{list.alipay}}</p>
              <p v-if="show">提现到{{lists.wechat}}</p>
              <!--<p v-else>请先绑定支付宝</p>-->

              <div class="way">
                <span class="select">请选择支付类型</span>

                <div @click="zfb">
                  <div class="ico"><img src="../../assets/img/timg.jpg" alt=""></div>
                  <span class="zfb">支付宝</span>
                  <div v-show="right" class="right"><img src="../../assets/img/t15.png" alt=""></div>
                </div>

                <div @click="wx">
                  <div class="ico"><img src="../../assets/img/timg2.jpg" alt=""></div>
                  <span class="zfb">微信</span>
                  <div v-show="!right" class="right"><img src="../../assets/img/t15.png" alt=""></div>
                </div>
              </div>


            </div>
            <div class="input">
              提现金额
              <div class="input_box">
                <span>￥</span>
                <input  v-model="inputModel" type="text">
              </div>
            </div>
          </div>
          <div class="btns">
            <button @click="subMit" type="button" :disabled="disabled">确定</button>
          </div>
        </div>
      <!--<actionsheet v-model="show" :menus="menus" @on-click-menu="clickPhoto" show-cancel></actionsheet>-->
    </div>
</template>

<script>
    import {
      Actionsheet,
      XHeader,
      Radio,
      Group
    } from 'vux'
    export default {
      name: 'Deposit',
      inject: ['reload'],
      data () {
        return {
          show: true,
          options: ['支付宝', '微信'],
          right: 'true',
          disabled: false,
          menus: {
            0: '支付宝',
            1: '微信'
          },
          list: [],
          lists: [],
          chars: 'alipay',
          show: false,
          money: '',
          inputModel: '',
          djstatus: true,
          type: 'alipay'
        }
      },
      components: {
        Actionsheet,
        XHeader,
        Radio,
        Group
      },
      mounted () {
        this.money = this.$route.query.ye
        this.get()
        this.gets()
      },
      computed: {
        userAll: function () {
          return this.$store.state.user.userAll
        }
      },
      // created () {
      //   if (this.$store.state.user.userAll == null) {
      //     this.getUserCenter()
      //   }
      // },
      methods: {
        get () {
          this.$http.post('/m1/center/my-alipay').then((res) => {
            this.list = res.data
          })
        },

        gets () {
          this.$http.post('/m1/center/my-wechat').then((res) => {
            this.lists = res.data
            console.log(this.lists)
          })
        },

        subMit () {
          if (this.djstatus) {
            this.djstatus = false
            this.$http.post('/m1/center/withdraw', {money: this.inputModel, type: this.type}).then((res) => {
              if (res.code === 0) {
                this.disabled = true,
                this.reload()
                this.$vux.toast.text(res.msg)
              } else {
                this.$vux.toast.text(res.msg)
                // this.djstatus = true
              }
            })
          }
        },
        zfb () {
          console.log(222)
          this.show = false
          this.type = 'alipay'
          this.right = true
        },
        wx () {
          this.show = true
          this.type = 'wechat'
          this.right = false
          console.log(111)
        }
      }
    }
</script>
<style>
#tx
.vux-header .vux-header-left, .vux-header .vux-header-right a{
  color: #fff!important;
}
</style>
<style scoped lang="less">
  .Deposit_main{
      margin-top: -46px;
    .vux-header{
      background: #FE4E4E!important;
    }
    .left{
      text-align: left;
      margin: 20px 0px;
    }
    .way{
      width: 100%;
      padding:20px 0px 20px 10px;
      .select{
        display: block;
        text-align: left;
        margin-bottom: 10px;
        padding-left: 10px;
      }
      >div{
        width: 90%;
        height: 40px;
        border-bottom: 1px solid #ccc;
        display: flex;
      }
      .ico{
        flex: 2;
        img{
          width: 60%;
          margin-top: 6px;
        }
      }
      .right{
        flex: 1;
        img{
          width: 66%;
          height: 40%;
        }
      }
      .zfb{
        flex: 8;
        font-size: 16px;
        text-align: left;
        line-height: 40px;
        padding-left: 20px;
      }
    }
  }
</style>
