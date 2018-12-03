<template>
  <div class="binding">
    <group>
      <x-input title="持卡人姓名:" placeholder="请输入持卡人姓名"></x-input>
      <popup-picker title="发卡行名称:" :data="list1" v-model="value1" @on-change="onChange"></popup-picker>
      <x-input title="银行卡卡号:" placeholder="请输入银行卡卡号"></x-input>
      <x-address title="所属城市: " v-model="addressValue" raw-value :list="addressData" value-text-align="left">
        <p>请选择</p>
      </x-address>
      <cell title="短信验证:" :value="15343830266">
        <div class="getnum"><p>18137798162 </p> <p class="get">获取</p></div>
      </cell>
    </group>
    <p class="font_title">*请先选择发卡行名称,再输入相应的银行卡号.</p>
    <div class="determine">
      确定
    </div>
  </div>
</template>

<script>
  import { Cell, Group, XInput, XAddress, ChinaAddressData, XTextarea, PopupPicker} from 'vux'
  export default {
    name: 'information',
    components: {
      Cell,
      Group,
      XInput,
      XAddress,
      XTextarea,
      PopupPicker
    },
    data () {
      return {
        addressData: ChinaAddressData,
        list1: [['小米1', 'iPhone1', '华为1', '情怀1', '三星1', '其他1', '不告诉你1']],
        value1: [],
        addressValue: []
      }
    },
    methods: {
      onChange () {}
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
  .getnum{
    display: flex;
    justify-content: space-between;
  }
  .get{
    padding-left: 10px;
    border-left: 1px solid #e5e5e5;
    margin-left: 5px;
    color: rgb(190,35,250);
  }
</style>
