<template>
  <div class="buyCard">
    <div class="my-head">
      <div class="head-body">
        <img src="../../assets/linshi/Vip1.png" alt="" class="vip">
      </div>
    </div>
    <div class="card-body" v-if="list">
      <checker
      v-model="type"
      default-item-class="default"
      selected-item-class="selected"
      @on-change="select"
    >
      <checker-item :value="list.ordinary">
        <div>
          <p>普通VIP</p>
          <p>￥{{list.ordinary}}</p>
        </div>
      </checker-item>
      <checker-item :value="list.senior">
        <div>
          <p>高级VIP</p>
          <p>￥{{list.senior}}</p>
        </div>
      </checker-item>
    </checker>
    </div>
    <div class="card-btn" @click="jumpTo({name:'pay',query:{price:type,level:level}})">
      成为{{level}}会员
    </div>
  </div>
</template>

<script>
  import { Checker, CheckerItem } from 'vux'
  export default {
    name: 'buyCard',
    components: {
      Checker,
      CheckerItem
    },
    data () {
      return {
        type: '99',
        level: '普通',
        list: ''
      }
    },
    mounted () {
      this.$http.post('/m1/pay/price').then(res => {
        if (res.code === 0) {
          this.list = res.data
        } else {
          this.$vux.toast.text()
        }
      }
      )
    },
    methods: {
      select () {
        console.log(this.type)
        this.level = (this.type === this.list.ordinary ? '1' : '2')
      }
    }
  }
</script>

<style scoped>

</style>

