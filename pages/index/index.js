//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    motto: '',
    userInfo: null
  },
  //进入游戏
  goGame: function() {
    wx.navigateTo({
      url: '../game/game'
    })
  },
  //进入排行榜
  goToRank: function() {
    wx.navigateTo({
      url: '../rank/rank'
    })
  },
  //处理emoji表情
  killEmoji: function(text) {
    return text.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
  },
  //设置用户信息
  setUserInfo: function(userInfo) {
    this.setData({
      userInfo: userInfo,
      motto: '欢迎您，' + userInfo.nickName
    });
    wx.setStorageSync('rankUserInfo', {
      name: userInfo.nickName,
      score: 10000
    });
  },
  //登陆
  onLoad: function() {
    var that = this;
    app.userInfoReadyCallback = res => {
      console.log('回调-获取用户信息成功');
      that.setUserInfo(res);
    };
    if (app.globalData.userInfo) {
      console.log('全局变量-获取用户信息成功');
      that.setUserInfo(app.globalData.userInfo);
    }
  },
  //用户点击授权
  bindGetUserInfo(e) {
    var that = this;
    console.log('主动授权-获取用户信息成功');
    that.setUserInfo(e.detail.userInfo);
  },
  //显示页面
  onShow: function () {
    var that = this;
    if (!that.data.userInfo && app.globalData.userInfo) {
      console.log('全局变量-通过排行榜授权获取用户信息成功');
      that.setUserInfo(app.globalData.userInfo);
    }
  },
})