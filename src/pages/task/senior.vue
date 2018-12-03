<template>
    <div class="senior">
      <p class="senior-title">*官方任务每天只可领取2条,自由任务可领取多条</p>
      <group class="group-item">
        <cell title="高级VIP任务1(商城)" is-link class="cell-item" :link="{path:'senior'}" inline-desc='未领取'>
          <img slot="icon" width="40" style="display:block;margin-right:5px;" src="../../assets/forever/logo/logo.png">
          <div style="text-align: center">
            <p style="color: #fd6363">￥20</p>
            <p>【高级】</p>
          </div>
        </cell>
        <cell title="高级VIP任务1(霸屏纸巾)" is-link class="cell-item" inline-desc='未领取'>
          <img slot="icon" width="40" style="display:block;margin-right:5px;" src="../../assets/forever/logo/logo.png">
          <div style="text-align: center">
            <p style="color: #fd6363">￥20</p>
            <p>【高级】</p>
          </div>
        </cell>
      </group>
      <div class="rules">
        <dl>
          <dt>任务领取规则:</dt>
          <dd v-for="(item,i) in list1" :key="i">{{i+1}}、{{item.title}}</dd>
        </dl>
      </div>
    </div>
</template>

<script>
  import { Cell, Group } from 'vux'
  export default {
    name: 'senior',
    comments: {
      Cell, Group
    },
    data () {
      return {
        list1: [
          {title: 'VIP会员可领取每天2条朋友圈发布任务'},
          {title: '发布任务时必须与平台内的文案、图片一致'},
          {title: '不得屏蔽微信好友查看您的朋友圈'},
          {title: '上传图片必须是朋友圈全屏截图'}
        ]
      }
    }
  }
</script>

<style scoped>
  .senior-title{
    padding: 15px;
    font-size: 13px;
  }
  .cell-item{
    height: 3rem;
  }
  .rules{
    margin-top: 30px;
    padding: 0 10px;
  }
  .rules>dl>dt{
    margin-bottom: 10px;
  }
  .rules>dl>dd{
    font-size: 13px;
    color: #8d8d8d;
    margin-bottom: 5px;
  }
</style>
