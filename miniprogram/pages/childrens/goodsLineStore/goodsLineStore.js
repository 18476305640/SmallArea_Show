// miniprogram/pages/childrens/goodsLineStore/goodsLineStore.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      pattern: 'type' , //search
      type_id: '',
      nav: 'goods', //store
      goods_page_number: 1,
      store_page_number: 1,
      item_number: 15,
      search: '', 
      type_data: {  
              goods: [

              ],
              store: [

              ]
      }
  },
  altNav(e) {
        console.log('触发了,',e.currentTarget.dataset.operation );
        this.getAppendToGoodsOrStore();
        this.setData({
            pattern: e.currentTarget.dataset.operation
        })
  },
  //触底事件
  lower:function(event){
    console.log("滚动到底部");
    this.getAppendToGoodsOrStore();
  },
  scroll: function() {
      console.log("滚动中");
  },
  getGoods() {
    var that = this;
    app.trigger.showLoading("加载中", function (stop) {
          app.api.getGoodsByGlobalTypeId(that.data.type_id,that.data.search,that.data.goods_page_number , that.data.item_number ,{
            success(res) {
                //将一个数据与另一个数据合并
                that.data.type_data.goods = that.data.type_data.goods.concat(res.data.data.goods);
              
                that.setData({
                  type_data:  that.data.type_data
                })
                if(res.data.data.goods[0] != null) {
                  that.data.goods_page_number++
                }
                stop(10);
                
            },
            failed(error) {
              console.log("b失败回调", error);
            }
        })
    })  
      
  },
  getAppendToGoodsOrStore() {
      //调用后，将自动根据当前nav获取商品或商家的下一页数据
      if(this.data.nav == 'goods' ) {
          //调用获取下一页商品的数据的函数
          this.getGoods();
      }else {
          //调用获取下一页商家的数据的函数

      }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
          console.log("已跳转，传的参数是：",options.id);
          this.setData({
            type_id: options.id
          })
          this.getAppendToGoodsOrStore();
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