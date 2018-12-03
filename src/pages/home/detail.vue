<template>
    <div class="detail">
      <div>
        <p>{{list.title}}</p>
        <p>{{list.created_at}}</p>
      </div>
      <div v-html="list.content">

      </div>
    </div>
</template>

<script>
    export default {
      name: 'detail',
      data () {
        return {
          list: ''
        }
      },
      mounted () {
        this.$http.post('/m1/index/notice-detail', {id: this.$route.query.id}).then(res => {
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
