var app = getApp();
// miniprogram/pages/childrens/goodsDetail/goodsDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      commentNumber:0,
      goodsFollowNumber:0,
      goodsLineDetails: {},
      goodsPraisePercentage:0,
      user_follow_goods:false,
      goods_total_style: [], //商品规格
      fullback_carousel:[
        {
          carousel_item: "https://th.bing.com/th/id/Rd9faaa0d915a986dcce995c08738f8a6?rik=mc3evNrhSi32iw&riu=http%3a%2f%2fpicture.ik123.com%2fuploads%2fallimg%2f161115%2f3-161115100Z2.jpg&ehk=AiH7iigsG38XJTSApycXesA8U8%2bDYaVR1IDWGkQ77HA%3d&risl=&pid=ImgRaw"
        }
      ],
      isloaded:false,
      //加入购物车data控制
      //cart: [],  //请求数据库的购物车数据

      is_add_cart: false,  //在页面加载时，将请求数据库，初始化该变量
      loadCart: {},
      goods_id: null,
      goods_style: null,
      show_style_window:false,  //决定是否显示商品的style
      cart_between: {    //即将加入到购物车中的数据 {goods_id,}
          goods_id: "",
          goods_style_id: "",
          count: 1
      },
      current_style_data: {
          // name: null,
          // price: null,
          // cover: null

      }
      



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        var that = this;
        console.log("已跳转到了商品详情页,商品id是：",options.id);
        this.setData({
              goods_id: options.id
        })
        app.api.getGoodsDetailById(options.id, {
            success(res){
                console.log("获取商品页信息成功回调：",res);
                var gd = res.data.data.goodsLineDetails;
                if(gd.carousel != "" && gd.carousel != null ) {
                    var carousel = app.asta(app.bash64.decode(gd.carousel));
                    gd.carousel = carousel;
                }
                // goodsLineDetails:res.data.goodsLineDetails
                
                
                if(gd.params != "" && gd.params != null ) {
                    var params = app.asta(app.bash64.decode(gd.params));
                    gd.params = params;
                }
                

                // that.setData({
                //   goodsLineDetails:gd
                // })

                that.setData({
                  commentNumber:res.data.data.commentNumber,
                  goodsFollowNumber:res.data.data.goodsFollowNumber,
                  goodsPraisePercentage:res.data.data.goodsPraisePercentage,
                  user_follow_goods:res.data.data.user_follow_goods,
                  goodsLineDetails:gd,
                  isloaded: true
                })

                //根据goods_id获取我与商店的购物车
              app.api.getMyCart(that.data.goodsLineDetails.id, {
                  success(res) {
                       console.log("获取购物车成功回调", res);
                       that.setData({
                         loadCart: res.data.data.loadCart.cartDetailList
                       })
                       //判断购物车中是否有当前这个商品
                        for (var i = 0; i < that.data.loadCart.length; i++) {
                              if (that.data.loadCart[i].goodsId == that.data.goods_id ) {
                                  that.setData({
                                    is_add_cart: true
                                  })
                              }
                        }


                    console.log("购物车：", that.data.loadCart);
                  },
                  failed(error) {
                    console.log("获取购物车失败回调", error);
                  }

              } );
              


            },
            failed(error) {
              console.log("获取商品页信息失败回调：",res);
            }
            
        });
       
  },  

  addCart() {
        var that = this;
        if (this.data.show_style_window == false && that.data.is_add_cart == false ) {
            if (that.data.goods_style == null) {
                        //向后端请求goods_style的信息
                      app.api.getGoodsStyle(that.data.goods_id, {
                          success(res) {
                              //将style数据设置到data中
                              that.setData({
                                  goods_style : res.data.data.goodsStyles,
                                  show_style_window: true
                              })
                            console.log("弹窗的数据:", that.data.goods_style, that.data.goodsLineDetails);
                               
                               
                          },
                          failed(error) {
                            console.log("style失败回调:", error);
                          }
                        })
              }else {
                      that.setData({
                          show_style_window: true
                      })
              }
             

        }else {
             console.log("已为你加入购物车!或已在购物车,正在深入判断!");
             if(that.data.current_style_data.name == null) {
                  return;
             }
          if (that.data.is_add_cart != true) {
                //正在加入购物车
                that.setData({
                  is_add_cart:true
                })
                //向购物车数据库添加商品
                app.api.addGoodsToCart(that.data.cart_between, {
                    success(res) {
                        if(res.data.code == 20000) {
                              //成功添加到购物车,将更新的购物车信息
                              console.log("添加到购物车成功回调:",res);
                              that.setData({
                                loadCart: res.data.data.loadCart
                              })
                          console.log("现在loadcart是:", that.data.loadCart);
                        }
                        
                    },
                    failed(error) {
                      console.log("向数据库添加商品失败回调:", error);
                    }

                })
                // that.data.cart.push(...that.data.current_style_data)
                // that.setData({
                //       cart: that.data.cart
                // })
          }else {
                //已加入购物车,正在为你跳转到商家
                console.log("正在去往商家...");
                wx.navigateTo({
                  url: '/pages/childrens/store/Store?goods_id=' + that.data.goodsLineDetails.storeId
                })
          }
             this.setData({
                 show_style_window:false
             })

        }
  },
  no_back() { console.log("防冒泡函数"); },
  goPlay() {
        console.log("添加到购物车");
        this.setData({
          is_add_cart: true
        })

        //向购物车中添加商品！！！！
        // app.api.addMyCart(this.goods_id, {
        //     success(res) {
        //         console.log("向后端请求向购物车中添加商品,成功回调:",res);
        //     },
        //     failed(error) {
        //       console.log("向后端请求向购物车中添加商品,失败回调:", error);
        //     }
        // })
  },
  //改变当前商品选中的style_id
  changStyleId(e) {
    var id = e.currentTarget.dataset.operation;
    this.data.cart_between.goods_style_id=id;
    var that = this;
    this.setData({
      cart_between: that.data.cart_between
    })
    console.log("商品style更改为:", this.data.cart_between);
    var that = this;
    app.api.getGoodsStyleById(this.data.cart_between.goods_style_id ,{
          success(res) {
              console.log("请求到了goods_style的数据:",res);
              that.setData({
                    current_style_data: res.data.data.one_goods_style
              })
          },
          failed(error) {
            console.log("请求goods_style失败:", res);
          }
    });
  },
  hiddenWindow() {
    console.log("隐藏goods_style_window");
      //隐藏goods_style_window
      this.setData({
          show_style_window: false
      })
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