<template>
 <div class="pay">
  <div class="money">
    <p>需支付</p>
    <p>￥{{$route.query.price}}</p>
  </div>
   <div class="select">
     <div>支付方式 </div>
     <!--<div>-->
       <!--<div class="type">-->
         <!--<img src="../../assets/forever/logo/yinlianka.png" alt="">-->
         <!--<p>银行卡支付</p>-->
       <!--</div>-->
       <!--<div class="selected" @click="select('3')">-->
         <!--<img src="../../assets/forever/logo/xuanzhong.png" alt="" v-if="type==='3'">-->
         <!--<img src="../../assets/forever/logo/weixuanzhong.png" alt="">-->
       <!--</div>-->
     <!--</div>-->
     <div>
       <div class="type">
         <img src="../../assets/forever/logo/zhifubao.png" alt="">
         <p>支付宝支付</p>
       </div>
       <div class="selected" @click="select('1')">
         <img src="../../assets/forever/logo/xuanzhong.png" alt="" v-if="type==='1'">
         <img src="../../assets/forever/logo/weixuanzhong.png" alt="">
       </div>
     </div>
     <div>
       <div class="type">
         <img src="../../assets/forever/logo/weixin.png" alt="">
         <p>微信支付</p>
       </div>
       <div class="selected" @click="select('2')">
         <img src="../../assets/forever/logo/xuanzhong.png" alt="" v-if="type==='2'">
         <img src="../../assets/forever/logo/weixuanzhong.png" alt="">
       </div>
     </div>
     <!--<div>-->
       <!--<div class="type">-->
         <!--<img src="../../assets/forever/logo/yue.png" alt="">-->
         <!--<p>可用佣金支付</p>-->
       <!--</div>-->
       <!--<div class="selected" @click="select('4')">-->
         <!--<img src="../../assets/forever/logo/xuanzhong.png" alt="" v-if="type==='4'">-->
         <!--<img src="../../assets/forever/logo/weixuanzhong.png" alt="">-->
       <!--</div>-->
     <!--</div>-->

   </div>
   <div class="determine" @click="paydata">
   确定支付
 </div>
 </div>
</template>

<script>
  import { Radio, Group } from 'vux'
  import './home.less'
  export default {
    name: 'pay',
    components: {
      Radio,
      Group
    },
    data () {
      return {
        type: '1',
        channel: '',
        ALIPAYSERVER: 'http://demo.dcloud.net.cn/helloh5/payment/alipay.php?total=',
        WXPAYSERVER: 'http://demo.dcloud.net.cn/helloh5/payment/wxpay.php?total='
      }
    },
    mounted () {
    },
    methods: {
      select (i) {
        this.type = i
      },
      plusReady (index, data) {
        // 获取支付通道
        plus.payment.getChannels((channels) => {
          // this.channel = channels[index]
          console.log(JSON.stringify(channels))
          if (index === 1) {
            for (var x in channels) {
              if (channels[x].id === 'alipay') {
                this.channel = channels[x]
              }
            }
            this.pay('alipay', data)
          } else {
            for (var y in channels) {
              if (channels[y].id === 'wxpay') {
                this.channel = channels[y]
              }
            }
            this.pay('wxpay', data)
          }
        }, function (e) {
          this.$vux.toast.text('获取支付通道失败：' + e.toString())
        })
      },
      pay (id, data) {
        console.log(data.toString())
        console.log(this.channel)
        plus.payment.request(this.channel, data, (result) => {
          this.$vux.toast.show('支付成功')
          this.$router.push({name: 'order'})
        }, (error) => {
          console.log(error.toString())
          if (error.message && (error.message.indexOf('canceled') > -1 || error.message.indexOf('取消') > -1)) {
            this.$vux.toast.text('支付已取消')
          } else {
            this.$vux.toast.text('支付失败：' + error.message)
          }
        })
      },
      paydata () {
        this.$http.post('/m1/pay/buy', {
          pay_type: this.type,
          vip_type: this.$route.query.level,
          money: this.$route.query.price
        }).then((res) => {
          if (res.code === 1) {
            console.log(res)
            this.$vux.toast.text(res.msg)
          }
          if (this.type === 1) {
            this.plusReady(this.type, res.data)
          } else if (this.type === 2) {
            this.plusReady(this.type - 2, res.data)
          }
        })
      }
    }
  }
</script>
<style scoped lang="less">

</style>
