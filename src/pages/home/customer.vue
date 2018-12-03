<template>
    <div class="customer">
      <div class="head">
        <div>
          <img src="../../assets/forever/logo/logo.png" alt="">
          <!--<p>1.1.0</p>-->
        </div>
      </div>
      <div class="bod">
        <div class="ads-item" v-for="(item,i) in list.service" :key="i">
          <p>{{item.title}}</p>
          <p>
            <a :href="item.value"><img src="../../assets/forever/logo/msg.png" alt=""></a>
          </p>
        </div>
        <div class="ads-item" v-if="list.official">
          <p>{{list.official.title}}</p>
          <p class="color">{{list.official.value}}</p>
        </div>
      </div>
      <div class="time">
        <div class="ads-item" v-for="(item,i) in list.information" :key="i">
          <p>{{item.title}}</p>
          <p class="color">{{item.value}}</p>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'customer',
      data () {
        return {
          list: ''
        }
      },
      mounted () {
        this.$http.post('/m1/index/service-center').then(res => {
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
