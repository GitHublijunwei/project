import audio from '../assets/audio/xqyx.mp3'
export default {
  install (Vue, options) {
    Vue.prototype.jumpTo = function (path) {
      // console.log(options)
      options.router.push(path)
    }
    Vue.prototype.noPastTo = function (path) {
      options.router.replace(path)
    }
    Vue.prototype.goBack = function (path) {
      window.history.length > 1 ? options.router.go(-1) : options.router.push('/')
    }
    Vue.prototype.hide = function () {
      this.$vux.toast.show({type: 'cancel', text: '暂未开放'})
    }
    Vue.prototype.clickButton = () => {
      let buttonAudio = document.getElementById('buttonAudio')
      buttonAudio.setAttribute('src', audio)
      buttonAudio.play()
    }
    document.body.addEventListener('click', function (e) {
      let event = e || window.event
      let target = event.target || event.srcElement
      let clickMusic = target.getAttribute('clickMusic')
      if (clickMusic === 'true') Vue.prototype.clickButton()
      else return false
    })
  }
}
