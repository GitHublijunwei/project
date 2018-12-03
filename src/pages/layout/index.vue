<template>
  <view-box ref="viewBox" body-padding-top="46px" :body-padding-bottom="$route.meta.navShow?'53px': 0 ">
    <x-header v-show="$route.meta.isShowNav" slot="header" :left-options="{showBack: false}" style="width:100%;position:absolute;left:0;top:0;z-index:100;" id="header">
      <a v-show="!$route.meta.goBack" slot="left" @click="$route.meta.address ? jumpTo($route.meta.address) : goBack()"><i class="iconfont icon-back"></i></a>
      {{$route.params.title ? $route.params.title : $route.meta.title}}
    </x-header>
    <router-view></router-view>
    <tabbar slot="bottom" class="tabbar"  v-show="$route.meta.navShow" style="height: 55px;">
      <tabbar-item :selected="this.$route.name === 'home'" link="/home" @click.native="select('home')">
        <img slot="icon" src="../../assets/forever/logo/shouye1.png" alt="" v-if="type==='home'">
        <img slot="icon" src="../../assets/forever/logo/shouye.png" alt="" v-if="type!=='home'">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item :selected="this.$route.name === 'task'" @click.native="select('task')">
        <img slot="icon" src="../../assets/forever/logo/renwuzhongxin.png" alt="" v-if="type!=='task'">
        <img slot="icon" src="../../assets/forever/logo/renwuzhongxin1.png" alt="" v-if="type==='task'">
        <span slot="label">任务中心</span>
      </tabbar-item>
      <tabbar-item :selected="this.$route.name === 'my'" @click.native="select('my')">
        <img slot="icon" src="../../assets/forever/logo/gerenzhongxin.png" alt="" v-if="type!=='my'">
        <img slot="icon" src="../../assets/forever/logo/gerenzhongxin1.png" alt="" v-if="type==='my'">
        <span slot="label">个人中心</span>
      </tabbar-item>
    </tabbar>
  </view-box>
</template>

<script>
  import { ViewBox, Tabbar, TabbarItem, XHeader } from 'vux'

  export default {
    name: 'layout',
    components: {
      ViewBox,
      Tabbar,
      TabbarItem,
      XHeader
    },
    data () {
      return {
        type: 'home'
      }
    },
    methods: {
      select (type) {
        // this.type = this.$route.path.slice(1)
        // console.log(this.$route.name)
        this.$router.push({
          name: type
        })
      }
    },
    mounted () {
      this.type = this.$route.path.slice(1)
    },
    watch: {
      $route (to, from) {
        this.type = this.$route.path.slice(1)
      }
    }
  }
</script>

<style>
  .weui-tabbar__icon img{
    width: 78%!important;
    height: auto!important;
    position: relative;
    top: 4px;
  }
  .weui-tabbar .weui-tabbar__item:nth-of-type(4) img{
    top: 0!important;
  }
</style>
