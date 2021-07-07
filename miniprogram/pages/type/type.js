// pages/type/type.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
        currentType: 0,
        typeData: [ ]

  },
  altType(e) {
      this.setData({
              currentType: e.currentTarget.dataset.operation
      })
  },
  toGoodsLineStore(e) {
      //用户点击后的回调，能获取到分类id，从而跳转
      var type_id = e.currentTarget.dataset.operation;
      wx.navigateTo({
        url: '/pages/childrens/goodsLineStore/goodsLineStore?id=' + type_id

      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    

    console.log("target="+app.globalData.token);
    app.request.get("/product/getGlobalType" ,
    res => {
        console.log("获取分类信息成功：", res.data.data.TypeDescs);
          this.setData({
            typeData: res.data.data.TypeDescs
          
        })
    },
    error => {
        console.log("获取分类信息失败：",error);
        
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})