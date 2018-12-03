<template>
  <div id="app" :style="{height: bodyHeight + 'px'}">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  // 路由参数变化时重新刷新页面
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      bodyHeight: null,
      isRouterAlive: true
    }
  },
  mounted () {
    this.bodyHeight = document.documentElement.clientHeight
  },
  methods: {
    // 刷新页面方法
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
html, body {
  height: 100%;
  width: 100%;
  min-height:100%;
  overflow-x: hidden;
  background: #f5f5f7 !important;
  margin: 0;
}
.vux-header{
  background: #FFFFFF!important;
  .vux-header-title{
    color: #333!important;
  }
}
body {
  background-color: #fff;
}
a {
  color: inherit;
}
.weui-cells{
  margin-top: 0.5rem!important;
}
.weui-input{
 text-align: right;
}
.vux-popup-picker-select{
  text-align: right!important;
}
.wonderful img{
  width: 100%;
}
</style>
