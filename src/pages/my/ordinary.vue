<template>
    <div class="ordinary">
      <div class="lists" v-for="i in 2" :key="i">
        <img src="../../assets/image/touxiang.png" alt="">
        <div class="list_item">
          <div>15343830266</div>
          <div>
            <div>普通用户</div>
            <div>2018-11-27 13:53:30</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import './my.less'
  export default {
    name: 'ordinary'
  }
</script>

<style scoped>

</style>
