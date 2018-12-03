<template>
  <div class="team">
    <group class="group-item">
      <cell title="一级会员" is-link class="cell-item" :link="{path:'level'}">
        <img slot="icon" width="30" style="display:block;margin-right:5px;" src="../../assets/forever/logo/yijihuiyuan.png">
        <p class="color">20人</p>
      </cell>
      <cell title="二级会员" is-link class="cell-item">
        <img slot="icon" width="30" style="display:block;margin-right:5px;" src="../../assets/forever/logo/erjihuiyuan.png">
        <p class="color">20人</p>
      </cell>
    </group>
  </div>

</template>

<script>
  import { Cell, Group } from 'vux'
  export default {
    name: 'team',
    comments: {
      Cell, Group
    },
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
    }
  }
</script>

<style scoped lang="less">
  .cell-item{
    height: 2rem;
  }
  p.color{
    font-size: 15px;
    color: #fd6363;
  }
</style>
