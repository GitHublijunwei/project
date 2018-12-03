<template>
  <div class="my">
    <div class="my-head">
      <p class="my-title">个人中心</p>
      <div class="head-body">
        <div class="top">
          <div>
            <img src="../../assets/image/touxiang.png" alt="">
            <p><span>普通用户</span></p>
          </div>
          <div><span>18137798162</span></div>
        </div>
        <div class="bottom">
          <div>
            <p class="total">500</p>
            <p>总收入</p>
          </div>
          <div>
            <p>20</p>
            <p>今日收入</p>
          </div>
          <div>
            <p>300</p>
            <p>已提现</p>
          </div>
        </div>
      </div>
    </div>
    <div class="my-body">
      <div class="nav-bar">
        <div v-for="(item,i) in logoList" :key="i" @click="jumpTo(item.path)">
          <img :src="item.src" alt="">
          <p>{{item.title}}</p>
        </div>
      </div>
      <div class="nav-bar">
        <div v-for="(item,i) in logoList1" :key="i" @click="jumpTo(item.path)">
          <img :src="item.src" alt="">
          <p>{{item.title}}</p>
        </div>
      </div>
      <div class="nav-bar last">
        <div v-for="(item,i) in logoList2" :key="i" @click="jumpTo(item.path)">
          <img :src="item.src" alt="">
          <p>{{item.title}}</p>
        </div>
        <div @click="loginout">
          <img src="../../assets/forever/logo/tuichudenglu.png" alt="">
          <p>退出登录</p>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    XHeader,
    Cell,
    Actionsheet,
    XDialog,
    Confirm
  } from 'vux'
  import * as utils from '../../utils'
  import './my.less'
  export default {
    name: 'my',
    components: {
      XHeader,
      Cell,
      Actionsheet,
      XDialog,
      Confirm
    },
    data () {
      return {
        myself: [],
        tc: 0,
        getname: 0,
        name: '',
        wgtVer: '',
        logoList: [
          {src: require('../../assets/forever/logo/gerenziliao.png'), title: '个人资料', path: '/information'},
          {src: require('../../assets/forever/logo/wodetuandui.png'), title: '我的团队', path: '/team'},
          {src: require('../../assets/forever/logo/yinhangka.png'), title: '绑定银行卡', path: '/binding'}
        ],
        logoList1: [
          {src: require('../../assets/forever/logo/qianbao.png'), title: '钱包', path: '/wallet'},
          {src: require('../../assets/forever/logo/caiwuguanli.png'), title: '财务管理', path: ''},
          {src: require('../../assets/forever/logo/jianchagengxin.png'), title: '检查更新', path: ''}
        ],
        logoList2: [
          {src: require('../../assets/forever/logo/zhanghaoqiehuan.png'), title: '切换账号', path: '/login'}
        ]
      }
    },
    ready () {
    },
    mounted () {
      // this.getMyself()
      // this.getVersion()
    },
    methods: {
      getVersion () {
        let This = this
        if (!window.plus) { return }
        // 获取本地应用资源版本号
        plus.runtime.getProperty(plus.runtime.appid, function (inf) {
          This.wgtVer = inf.version
        // alert('当前应用版本：' + wgtVer)
        // console.log(1112222222);
        })
      },
      loginout () {
        this.$http.post('/m1/login/logout').then(() => {
          utils.storage.remove('token')
          utils.storage.remove('name')
          utils.storage.remove('password')
          utils.storage.remove('userInfo')
          this.$router.push('/login')
        })
      },
      // 弹窗出现js
      tcshow: function () {
        this.tc = 1
      },
      // 弹窗关闭js
      tcclose: function () {
        this.tc = 0
      },
      getMyself () {
        this.$http.post('/m1/center/index').then((res) => {
          if (res.code === 0) {
            this.myself = res.data
            // console.log(res.data)
          } else {
            this.$vux.toast.text(res.msg)
          }
        })
      },
      nameshow () {
        this.getname = 1
      },
      nameclose () {
        this.getname = 0
      },
      xgname () {
        if (this.name === '') {
          this.$vux.toast.text('请输入姓名')
        } else {
          this.$http.post('/m1/center/edit-nickname', {
            nickname: this.name
          }).then((res) => {
            if (res.code === 0) {
              this.myself.nickname = this.name
            }
            this.$vux.toast.text(res.msg)
            this.nameclose()
          })
        }
      },
      GetBase64Code (path) {
        let This = this
        let bitmap = new plus.nativeObj.Bitmap('test')
        bitmap.load(path, function () {
          let base4 = bitmap.toBase64Data()
          let datastr = base4.split(',', 3)
          let pics = []
          if (datastr.length > 1) {
            pics.push(datastr[1])
          } else {
            pics.push(datastr[0])
          }
          This.$http.post.postUpload = function (avatar) {
            return This.$http.post('/m1/center/edit-img', {headpic: avatar})
          }
          This.$http.post.postUpload(base4).then(response => {
            if (response === 0) {
              This.$vux.toast.show({
                width: '20em',
                text: response.msg
              })
              // This.getUser();
            }
          })
        }, function (e) {
          console.log('加载图片失败：' + JSON.stringify(e))
        })
      },
      // 从相册中选取图片
      galleryImg () {
        let This = this
        console.log('从相册中选择图片:')
        // 从相册中选择图片
        plus.gallery.pick(function (path) {
          This.myself.headimgurl = path
          This.GetBase64Code(path)
          This.tcclose()
          // 取消选择图片
        }, function (e) {
          console.log('取消选择图片')
        }, {filter: 'image'})
      },
      // 拍照
      captureImage () {
        let This = this
        // 获取摄像头管理对象
        let cmr = plus.camera.getCamera()
        // 字符串数组，摄像头支持的拍照分辨率
        let res = cmr.supportedImageResolutions[0]
        // 字符串数组，摄像头支持的拍照文件格式
        let fmt = cmr.supportedImageFormats[0]
        console.log('拍照分辨率: ' + res + ', 拍照文件格式: ' + fmt)
        // 进行拍照操作
        cmr.captureImage(function (path) {
          // 通过URL参数获取目录对象或文件对象
          plus.io.resolveLocalFileSystemURL(path, function (entry) {
            // 获取目录路径转换为本地路径URL地址
            let tmpPath = entry.toLocalURL()
            This.myself.headimgurl = tmpPath
            This.GetBase64Code(tmpPath)
            This.tcclose()
          })
        },
        // 捕获图像失败回调
        function (error) {
          console.log('捕获图像失败: ' + error.message)
        }, {resolution: res, format: fmt}
        )
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~vux/src/styles/close';

  .dialog-demo {
    .weui-dialog {
      border-radius: 8px;
      padding-bottom: 8px;
    }
    .dialog-title {
      line-height: 30px;
      color: #666;
    }
    .img-box {
      height: 350px;
      overflow: hidden;
    }
    .vux-close {
      margin-top: 8px;
      margin-bottom: 8px;
    }
  }

  .listMain {
    font-size: small;
  }

  .name {
    display: block;
    margin-top: -6px;
  }
  .agent{
    position: absolute;
    width: 80px;
    height: 30px;
    background-color: orange;
    color: black;
    border-radius: 25px;
    right: 50%;
    top: 38px;
    font-size: 13px;
    color: #fff;
    line-height: 30px;
    text-align: center;
    transform: translate(50%, 0)
  }
  .tck{
    width:100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
  }
  .zzc{
    width:100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
  }
  .tck_cen{
    width: 100%;
    background: #30aaff;
    margin: 0rem auto;
    position: absolute;
    bottom: 10px;
  }
  .tck_mid ul{
    width:100%;
    overflow: hidden;
    margin-top:15px;
  }
  .tck_mid li{
    float: left;
    width:50%;
    padding: 10px 0px;
    text-align: center;
    background:#1f283c;
    color: #fff;
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;
  }
  .tck_mid li p{
    font-size: 14px;
  }
  .tck_mid li span{
    font-size: 14px;
    line-height:15px;
  }
  .on{
    background: #2c3b5b!important;
  }
  .tck_bth{
    width:90%;
    display: block;
    background:none;
    outline: none;
    margin: 0px auto;
    font-size: 14px;
    padding: 10px 8px;
    color: #fff;
    outline: none;
    border: 0px;
    border-bottom: #fff 1px solid ;
  }
  .nametc{
    width: 80%;
    left: 10%;
    bottom: 250px;
    background: #30aaff;
  }
  .name_input{
    text-align: center;
    padding: 10px;
    input{
      width: 80%;
      padding: 8px;
      outline: none;
      border: none;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
    }
  }
  .name_bth{
    width: 50%;
    font-size: 13px;
    text-align: center;
    display: block;
    border: 0px;
    padding: 5px;
    margin: 10px auto;
    outline: none;
    background:#fff;
    color: #30aaff;
  }
  .goldDetail{
    position:absolute ;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    .detail{
      height: 30px;
      width: 86px;
      border: 1px solid #ccc;
      background-color: #fff;
      border-radius: 26px;
      font-size: 13px;
      line-height: 30px;
    }
  }
</style>
     
