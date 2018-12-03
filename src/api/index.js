import http from './http'

// 登录接口
export const login = function (mobile, password) {
  return http.post('/auth/login', {mobile: mobile, password: password})
}

// 获取短信验证码 type为验证码类型 方便后期不同类型校验
export const getSmsCode = function (mobile, type) {
  return http.post('/api/m1/login/phonesms', {mobile: mobile, type: type})
}

// 注册接口
export const register = function (mobile, password, smsCode, referrer) {
  return http.post('/auth/register', {mobile: mobile, password: password, smsCode: smsCode, referrer: referrer})
}

// 忘记密码接口
export const fetchArticleList = function (mobile, password, smsCode) {
  return http.post('/auth/reset', {mobile: mobile, password: password, smsCode: smsCode})
}

// 新闻列表接口  type=1新闻 type=2：快讯 type=3：学院
export const getArticle = function (type) {
  return http.get('/article/list', {type: type})
}

// 公告接口
export const getAnnouncement = function () {
  return http.get('/article/list')
}

// 挖矿理财产品接口
export const fetchMineList = function () {
  return http.get('/financial/mine-list')
}

// 挖矿理财产品接口
export const doMine = function (param) {
  return http.post('/user/buy-mine', param)
}

// 收益记录
export const getMine = function () {
  return http.get('/user/mine-gain-list')
}

// 获取理财列表
export const getFinancial = function () {
  return http.get('/financial/term-list')
}

// 获取理财列表
export const getUser = function () {
  return http.get('/user/term-list')
}

// 根据id获取详情信息
export const getDetail = function (id) {
  return http.get('/financial/term-detail', {id: id})
}

// 根据id获取详情信息
export const getBuy = function (id, amount, isauto) {
  return http.post('/user/buy-term', {id: id, amount: amount, is_auto: isauto})
}

// 获取挖矿收益
export const getMineGain = function () {
  return http.get('/user/newest-mine-gain')
}
// 首页公告
export const getNotice = function () {
  return http.get('article/announcement')
}
// 修改个人信息
export const postName = function (param) {
  return http.post('user/update', param)
}
// 修改个人信息
export const getIndexList = function () {
  return http.get('financial/market-quotation')
}
// 获取详情
export const getNewDetail = function (id) {
  return http.get('article/detail', {id: id})
}
// 获取详情
export const getRangKing = function () {
  return http.get('user/week-rank-list')
}
// 修改手机号
export const postUpdataPhone = function (mobile, smsCode) {
  return http.post('user/reset-mobile', {mobile: mobile, smsCode: smsCode})
}
// 修改密码
export const postUpdataPassword = function () {
  return http.post('user/week-rank-list')
}
// 我的粉丝
export const getMyfun = function () {
  return http.get('user/my-fans')
}
// 公告列表
export const getNatice = function () {
  return http.get('article/bulletin-list')
}
// 获得公告详情
export const getNaticeDetail = function (id) {
  return http.get('article/bulletin-detail', {id: id})
}

// 上传头像
export const postUpload = function (avatar) {
  return http.post('user/upload-avatar', {avatar: avatar})
}

// 公告列表
export const postbuyMine = function (id, amount) {
  return http.post('user/buy-mine', {id: id, amount: amount})
}
// 获取折线图
export const getMap = function () {
  return http.get('user/mine-line')
}
// HRH钱包
export const getMyincome = function () {
  return http.get('user/my-income')
}
// HRH钱包
export const getHRHWallet = function () {
  return http.get('user/wallet')
}
// 创建钱包
export const postSetWallet = function (payPassword, walletName) {
  return http.post('wallet/create', {pay_password: payPassword, wallet_name: walletName})
}

// 开关币种显示
export const postSwitch = function (coinName, status) {
  return http.post('wallet/switch', {coin_name: coinName, status: status})
}
// 开关币种状态显示
export const getSwitchList = function () {
  return http.get('wallet/switch-list')
}
// 转出费率百分比
export const getGiftService = function (coinName) {
  return http.get('wallet/service-fee', {coin_name: coinName})
}
// 转赠
export const postGift = function (coinName, amount, payPassword, payAddress, fee) {
  return http.post('user/apply-withdraw', {coin_name: coinName, amount: amount, pay_password: payPassword, pay_address: payAddress, fee: fee})
}
// 助记词返回
export const getHelpMemoryWord = function () {
  return http.get('wallet/create-words')
}
// 用户信息
export const getUserInfo = function () {
  return http.get('user/info')
}
// 助记词提交
export const postHelpMemoryWord = function (words) {
  return http.post('wallet/save-words', {words: words})
}
// 币种记录
export const getCurrencyRecord = function (coinName) {
  return http.get('wallet/detail', {coin_name: coinName})
}
// 币种兑换数据
export const getCurrencyExchangeData = function (coinName) {
  return http.get('wallet/exchange-info', {coin_name: coinName})
}
// 币种兑换
export const postCurrencyExchange = function (fromCoin, toCoin, amount, fee, payPassword) {
  return http.post('wallet/exchange', {from_coin: fromCoin, to_coin: toCoin, amount: amount, fee: fee, pay_password: payPassword})
}
// 二维码
export const getTwoCode = function () {
  return http.get('user/share')
}
// 充值记录
export const getRecharge = function () {
  return http.get('user/recharge-list')
}
// 充币支付
export const getChargePay = function () {
  return http.get('user/get-pay-address')
}
// 首页点击挖矿
export const getbubble = function (id, gainid) {
  return http.post('user/click-gain-bubble', {id: id, gain_id: gainid})
}
// 修改钱包密码
export const updataPayPassword = function (password, oldPassword) {
  return http.post('user/update-pay-password', {password: password, old_password: oldPassword})
}
// 修改登录密码
export const updataPassword = function (password, oldPassword) {
  return http.post('user/update-password', {password: password, old_password: oldPassword})
}
// 上传身份证
export const uploadIidcard = function () {
  return http.post('user/upload-idcard')
}
// 忘记钱包密码
export const walletPassword = function (password, words) {
  return http.post('wallet/word-password', {words: words, password: password})
}
