<template>
    <div class="information">
      <group>
        <x-input title="真实姓名:" placeholder="请输入真实姓名"></x-input>
        <cell title="手机号:" :value="15343830266"></cell>
        <x-address title="地址选择: " v-model="addressValue" raw-value :list="addressData" value-text-align="left"></x-address>
        <x-textarea title="详细地址:" placeholder="请填写详细地址" :show-counter="false" :rows="5"></x-textarea>
      </group>
      <p class="font_title">*资料一旦提交将无法修改,请谨慎提交</p>
      <div class="determine">
        确定
      </div>
    </div>
</template>

<script>
 import { Cell, Group, XInput, XAddress, ChinaAddressData, XTextarea} from 'vux'
export default {
   name: 'information',
   components: {
     Cell,
     Group,
     XInput,
     XAddress,
     XTextarea
   },
   data () {
     return {
       addressData: ChinaAddressData
     }
   }
}
</script>

<style scoped>
  .font_title{
    padding: 10px;
    font-size: 13px;
  }
  .determine{
    background-image: -moz-linear-gradient( right, rgb(190,35,250) 0%, rgb(217, 120, 223) 100%);
    background-image: -webkit-linear-gradient( right, rgb(190,35,250) 0%, rgb(217, 120, 223) 100%);
    background-image: -ms-linear-gradient( right, rgb(190,35,250) 0%, rgb(217, 120, 223) 100%);
    height: 3rem;
    color: #fff;
    width: 90%;
    margin: 0 auto;
    border-radius: 1.5rem;
    text-align: center;
    line-height: 3rem;
    font-size: 18px;
    margin-top: 5rem;
  }
</style>
