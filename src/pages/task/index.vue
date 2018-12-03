<template>
  <div class="task">
    <swiper loop auto height="11rem">
      <swiper-item v-for="(item,index) of swiper" v-bind:key="index">
        <img :src="item.imgsrc" alt="" class="task-img">
      </swiper-item>
    </swiper>
    <div class="task-nav">
      <div v-for="(item,i) in logoList" :key="i" @click="jumpTo(item.path)">
        <img :src="item.src" alt="">
        <p>{{item.title}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'vux'
  export default {
    name: 'index',
    components: {
      Swiper,
      SwiperItem
    },
    data () {
      return {
        swiper: [
          {imgsrc: require('../../assets/linshi/bg.png')},
          {imgsrc: require('../../assets/linshi/bg.png')},
          {imgsrc: require('../../assets/linshi/bg.png')}
        ],
        logoList: [
          {src: require('../../assets/forever/logo/renwudating.png'), title: '任务大厅', path: '/hall'},
          {src: require('../../assets/forever/logo/tijiaorenwu.png'), title: '提交任务', path: ''},
          {src: require('../../assets/forever/logo/renwujilu.png'), title: '任务记录', path: ''}
        ]
      }
    }
  }
</script>

<style scoped lang="less">
  .task-img{
    width: 100%;
    height: 11rem;
  }
  .task-nav{
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 3% 5% 0% 5%;
    div{
      margin-bottom: 15px;
      width: 30%;
      text-align: center;
      img{
        width: 45px;
        height: 45px;
      }
      p{
        font-size: 13px;
        color:#666666;
      }
    }
  }
</style>
