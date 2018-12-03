<template>
    <div class="hall">
      <group class="group-item">
        <cell title="高级任务大厅" is-link class="cell-item" :link="{path:'senior'}">
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/forever/logo/logo.png">
        </cell>
        <cell title="普通任务大厅" is-link class="cell-item">
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/forever/logo/logo.png">
        </cell>
        <cell title="自由任务大厅" is-link class="cell-item">
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/forever/logo/logo.png">
        </cell>
      </group>
    </div>
</template>

<script>
  import { Cell, Group } from 'vux'
  export default {
    name: 'hall',
    comments: {
      Cell, Group
    }
  }
</script>

<style scoped>
  .cell-item{
    height: 2rem;
  }
</style>
