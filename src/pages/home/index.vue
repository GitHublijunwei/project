<template>
  <div class="home">
    <swiper loop auto height="11rem">
      <swiper-item v-for="(item,index) of swiper" v-bind:key="index">
        <img :src="item.imgsrc" alt="">
      </swiper-item>
    </swiper>
    <div class="notice">
      <div class="notice-box">
        <img src="@/assets/forever/toutiao.png" alt="" class="notice-img" @click="jumpTo('/strategy')">
        <marquee behavior="scroll" direction="left">
          <span v-for="(item,i) in notice" :key="i">{{item.title}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </marquee>
      </div>
    </div>
    <div class="nav-bar">
        <div v-for="(item,i) in logoList" :key="i" @click="jumpTo(item.path)">
          <img :src="item.src" alt="">
          <p>{{item.title}}</p>
        </div>
    </div>
      <confirm
        v-model="showVersion"
        :close-on-confirm="false"
        title="操作提示"
        @on-confirm="downWgt">
        <p style="text-align:center;">检测到新版本是否更新</p>
      </confirm>
  </div>
</template>
<style>
  .vux-slider > .vux-swiper > .vux-swiper-item img{
    width: 100%;
  }
</style>

<script>
  import './home.less'
  import {Swiper, SwiperItem, Confirm} from 'vux'
  export default {
    name: 'index',
    components: {
      Swiper,
      SwiperItem,
      Confirm
    },
    data () {
      return {
        swiperItemIndex: 1,
        swiper: [
          {imgsrc: require('../../assets/linshi/bg.png')},
          {imgsrc: require('../../assets/linshi/bg.png')},
          {imgsrc: require('../../assets/linshi/bg.png')}
        ],
        notice: '慧点赞升级VIP赠送超级豪华大礼包',
        wgtVer: '',
        wgtUrl: '',
        showVersion: false,
        logoList: [
          {src: require('../../assets/forever/logo/ruhezhuanyong.png'), title: '点赞赚钱', path: '/wonderful'},
          {src: require('../../assets/forever/logo/erweima.png'), title: '推广二维码', path: 'QRcode'},
          {src: require('../../assets/forever/logo/guangaotoufang.png'), title: '广告投放', path: '/ads'},
          {src: require('../../assets/forever/logo/vip.png'), title: '慧点赞会员', path: '/buyCard'},
          {src: require('../../assets/forever/logo/faburenwu.png'), title: '发布任务', path: '/waitExplore'},
          {src: require('../../assets/forever/logo/mianfeilingqu.png'), title: '免费领用', path: '/waitExplore'},
          {src: require('../../assets/forever/logo/jinronglicai.png'), title: '金融理财', path: ''},
          {src: require('../../assets/forever/logo/bapingqianbao.png'), title: '慧点赞钱包', path: '/waitExplore'},
          {src: require('../../assets/forever/logo/chengzhu.png'), title: '慧点赞城主', path: '/waitExplore'},
          {src: require('../../assets/forever/logo/shangcheng.png'), title: '慧点赞商城', path: '/waitExplore'},
          {src: require('../../assets/forever/logo/hongbao.png'), title: '慧点赞红包', path: '/waitExplore'},
          {src: require('../../assets/forever/logo/kefu.png'), title: '客服中心', path: '/customer'}
        ]
      }
    },
    ready () {
    },
    mounted () {
      this.getSwiper()
      this.getNotice()
      // this.getVersion()
    },
    methods: {
      getVersion () {
        let This = this
        if (!window.plus) return
        // 获取本地应用资源版本号
        plus.runtime.getProperty(plus.runtime.appid, function (inf) {
          This.wgtVer = inf.version
          // alert('当前应用版本：' + wgtVer)
          This.checkUpdate()
        })
      },
      // 检查更新
      checkUpdate () {
        let This = this
        let type
        if (plus.os.name === 'ios') {
          type = 'ios'
        } else {
          type = 'android'
        }
        this.$http.post('/m1/login/download', {type: type, version: This.wgtVer}).then(response => {
          console.log(response)
          console.log(This.wgtVer)
          if (response.code === 0) {
            This.wgtUrl = response.data.URL
            This.showVersion = true
          } else {
            console.log('不需更新')
          }
        })
      },
      // 下载wgt文件
      // 下载wgt文件
      downWgt () {
        let This = this
        This.showVersion = false
        plus.nativeUI.showWaiting('加载中')
        plus.downloader.createDownload(This.wgtUrl, {filename: '_doc/update/'}, function (d, status) {
          if (status === 200) {
            console.log('下载wgt成功：' + d.filename)
            plus.nativeUI.alert('下载成功')
            plus.nativeUI.closeWaiting()
            This.installWgt(d.filename) // 安装wgt包
            console.log(d.filename)
          } else {
            console.log('下载wgt失败！')
            if (plus.os.name === 'iOS') {
              This.updateComplete()
            } else {
              plus.nativeUI.alert('下载更新包失败！', function () {
                This.updateComplete()
              })
            }
          }
          plus.nativeUI.closeWaiting()
        }).start()
      },
      // 更新应用资源
      installWgt (path) {
        let This = this
        plus.nativeUI.showWaiting('安装wgt文件...')
        plus.runtime.install(path, {}, function () {
          plus.nativeUI.closeWaiting()
          This.deleteWgt(path, true)
        }, function (e) {
          console.log(e)
          plus.nativeUI.alert('更新失败')
          plus.nativeUI.closeWaiting()
          This.updateComplete()
          This.deleteWgt(path)
        })
      },
      closeThis () {
        setTimeout(function () {
          plus.webview.getLaunchWebview().close()
        }, 300)
      },
      updateComplete () {
        console.log('updateComplete')
        var userInfo = plus.storage.getItem('userInfo')
        if (userInfo) {
        } else {
        }
        this.closeThis()
      },
      // 删除热更新包
      deleteWgt (path, restart) {
        console.log('path', path)
        plus.io.resolveLocalFileSystemURL('_doc/update/', function (entry) {
          console.log('删除开始')
          console.log('entry', entry)
          entry.removeRecursively(function () {
            console.log('删除成功')
            restart && plus.runtime.restart()
          })
        })
      },
      getSwiper () {
        this.$http.post('/m1/index/carousel').then((res) => {
          if (res.code === 0) {
            this.swiper = res.data
          } else {
            this.$vux.toast.text(res.msg)
          }
        }).catch((res) => {
          console.log(res)
        })
      },
      getNotice () {
        this.$http.post('/m1/index/headlines').then((res) => {
          if (res.code === 0) {
            this.notice = res.data
          } else {
            this.$vux.toast.text(res.msg)
          }
        }).catch((res) => {
          console.log(res)
        })
      },
      GetBase64Code (path) {
        let This = this
        var bitmap = new plus.nativeObj.Bitmap('test')
        bitmap.load(path, function () {
          var base4 = bitmap.toBase64Data()
          var datastr = base4.split(',', 3)
          var pics = []
          if (datastr.length > 1) {
            pics.push(datastr[1])
          } else {
            pics.push(datastr[0])
          }
          This.$http.post.postUpload = function (avatar) {
            return This.$http.post('/api?do=mc&op=saveInfo&type=save', {avatar: avatar})
          }
          This.$http.post.postUpload(base4).then(response => {
            if (response === 0) {
              This.$vux.toast.show({
                width: '20em',
                text: response.msg
              })
              This.imgSrc = response.data.avatar
              let data = This.userInfo
              data.avatar = response.data.avatar
              This.$store.commit('user/setUserInfo', data)
              // This.getUser();
            }
          })
        }, function (e) {
          console.log('加载图片失败：' + JSON.stringify(e))
        })
      }
    }
  }
</script>



