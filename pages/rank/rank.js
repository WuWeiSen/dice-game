//rank.js
var app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    rankLogs: []
  },
  //获取排行榜
  getRank: function() {
    var rankUserInfo = wx.getStorageSync('rankUserInfo');
    var rank = [];
    if (rankUserInfo) {
      rank.push(rankUserInfo);
    }
    return rank;
  },
  onLoad: function() {
    var rank = this.getRank();
    this.setData({
      rankLogs: rank
    })
  },
  bindGetUserInfo(e) {
    var that = this;
    console.log('主动授权-获取用户信息成功');
    app.globalData.userInfo = e.detail.userInfo;
    wx.setStorageSync('rankUserInfo', {
      name: e.detail.userInfo.nickName,
      score: 10000
    });
    this.setData({
      rankLogs: [{
        name: e.detail.userInfo.nickName,
        score: 10000
      }]
    });
  }
})