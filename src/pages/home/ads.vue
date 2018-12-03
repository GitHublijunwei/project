<template>
    <div class="ads">
      <p class="ads-title">欢迎在慧点赞投放广告,你的广告将在十亿朋友圈中曝光,广告投放线上咨询请点击广告投放客服:</p>
      <div class="ads-body">
        <div class="ads-item">
          <p>广告投放客服</p>
          <p>
            <a :href="list.advert"><img src="../../assets/forever/logo/msg.png" alt=""></a>
          </p>
        </div>
        <div class="ads-item">
          <p>广告招商专用咨询热线</p>
          <p class="color">{{list.hotline}}</p>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'ads',
    data () {
      return {
        list: ''
      }
    },
    mounted () {
      this.$http.post('/m1/index/advert').then(res => {
        if (res.code === 0) {
          this.list = res.data
        } else {
          this.$vux.toast.text(res.msg)
        }
      })
    }
  }
</script>

<style scoped>

</style>
