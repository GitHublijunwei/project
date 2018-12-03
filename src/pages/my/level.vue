<template>
    <div class="level">
      <group class="group-item">
        <cell title="高级VIP" is-link class="cell-item" :link="{path:'ordinary'}">
          <img slot="icon" width="30" style="display:block;margin-right:5px;" src="../../assets/forever/logo/gaojivip.png">
          <p class="color">20人</p>
        </cell>
        <cell title="普通VIP" is-link class="cell-item" :link="{path:'ordinary'}">
          <img slot="icon" width="30" style="display:block;margin-right:5px;" src="../../assets/forever/logo/putongvip.png">
          <p class="color">20人</p>
        </cell>
        <cell title="普通会员" is-link class="cell-item" :link="{path:'ordinary'}">
          <img slot="icon" width="30" style="display:block;margin-right:5px;" src="../../assets/forever/logo/putonghuiyuan.png">
          <p class="color">20人</p>
        </cell>
      </group>
    </div>
</template>

<script>
  import { Cell, Group } from 'vux'
  export default {
    name: 'level',
    comments: {
      Cell, Group
    }
  }
</script>

<style scoped>
  .cell-item{
    height: 2rem;
  }
  p.color{
    font-size: 15px;
    color: #fd6363;
  }
</style>
