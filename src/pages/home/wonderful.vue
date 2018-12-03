<template>
    <div class="wonderful" v-html="img">
    </div>
</template>

<script>
    export default {
      name: 'wonderful',
      data () {
        return {
          img: ''
        }
      },
      mounted () {
        this.$http.post('/m1/index/earn').then(res => {
          console.log(res)
          if (res.code === 0) {
            this.img = res.data.content
          } else {
            this.$vux.toast.text(res.msg)
          }
        })
      }
    }
</script>

<style scoped>

</style>
