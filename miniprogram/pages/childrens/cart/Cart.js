// miniprogram/pages/childrens/cart/Cart.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
        store: null,
        cart_id: null,
        cart: null,
        store_star: null,
        loadCart: null,
        priceSum: null,
        hide: false
  },
  refrePriceSum() {
    //维护总价
          var that = this;
          var loadCart = that.data.loadCart;
          var sum = 0;
          for(var i = 0; i<loadCart.length; i++) {
              sum += loadCart[i].price * loadCart[i].count;
          }
          that.setData({
            priceSum: sum
          })
  },
  altCartItemCount(cart_item_id, newCount) {
        //给定一个数值，来修改cart  item的数量
    if (newCount>0) {
      app.api.altCartItemCount(cart_item_id, newCount ,{
            success(res) {
                  console.log("修改数量成功回调",res);
            },
            failed(error) {
                 console.log("修改数量成功失败",error);
            }

      });
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.goods_id);
    var that = this;
    //获取goods_id,向后端请求该goods_id对应商家与用户的购物车
    app.api.getMyCartDetail(options.goods_id, {
          success(res) {
                console.log("向后端请求的数据:",res);
                if( res.data.code == 20000 ) {
                      that.setData({
                            hide: true
                      })
                      //维护数据
                      that.setData({
                        cart_id: res.data.data.loadCart.id,
                        cart: res.data.data.loadCart.cartDetailList,
                        store: res.data.data.store,
                        store_star: res.data.data.store_star,
                        loadCart: res.data.data.loadCart.confirmationItems
                      })
                      that.refrePriceSum();
                      console.log("初始化总价：", that.data.priceSum);
                      console.log("向后端请求数据成功:loadCart=", res);
                }
                
          },
          failed(error) {
            console.log("向后端请求数据成失败loadCart", error);
          }
    });
  },
  //count自减函数
  reduce(e) {
    var that = this;
    var id = e.currentTarget.dataset.operation;
      console.log(e.currentTarget.dataset.operation,"自减" );
    var loadCart = that.data.loadCart;
    for (var i = 0; i < loadCart.length ;i++) {
      if (loadCart[i].id == id) {
        if (loadCart[i].count > 1) {
                //请求数据库更新cart item的信息
                loadCart[i].count--
              //保存到数据库中
              that.altCartItemCount(loadCart[i].id, loadCart[i].count);
            }
            that.setData({
                loadCart: that.data.loadCart
            })
      }
      that.refrePriceSum();
    }
  },
  //count自增函数
  increment(e) {
      
        var that = this;
        var id = e.currentTarget.dataset.operation;
        console.log(e.currentTarget.dataset.operation, "自增");
        var loadCart = that.data.loadCart;
        for (var i = 0; i < loadCart.length; i++) {
          if (loadCart[i].id == id) {
            loadCart[i].count++
            //保存到数据库中
            that.altCartItemCount(loadCart[i].id, loadCart[i].count);
            that.setData({
              loadCart: that.data.loadCart
            })
          }
        }
        that.refrePriceSum();
    
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