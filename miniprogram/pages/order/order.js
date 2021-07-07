var app = getApp();
console.log("xm",app);
// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentNav: 'gs',
    gsData: {
          currentPage: 1,
          pageItem: 10,
          data: [
              {
                  storeName: '闪迪官方旗舰店',
                  icon: '/resource/image/replace/SanDisk.jpg',
                  status: 'dg',
                  sum: 80,
                  detail: [
                      {
                          id:0,
                          goodsName: '移动的电脑',
                          price: 40,
                          count: 2,
                      },
                      {
                        id: 0,
                        goodsName: '超高速U盘',
                        price: 20,
                        count: 1,
                      },
                      {
                        id: 0,
                        goodsName: '新一代存储卡',
                        price: 23,
                        count: 2,
                      }
                  ]
              },
          ]
    },
    lsData: {

    }
  },
  altNav(e) {
    this.setData({
      currentNav: e.currentTarget.dataset.operation
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