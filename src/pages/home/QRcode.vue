<template>
    <div class="code" :style="{'background-image':url}">
    </div>
</template>

<script>
    export default {
      name: 'QRcode',
      data () {
        return {
          url: ''
        }
      },
      mounted () {
        this.$http.post('/m1/index/qr-code').then(res => {
          if (res.code === 0) {
            this.url = "url('" + res.data.qrCode + "')"
            console.log(this.url)
          } else {
            this.$vux.toast.text(res.msg)
          }
        })
      }
    }
</script>

<style scoped>
  .code{
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    padding: 0;
    margin: 0;
  }
</style>
