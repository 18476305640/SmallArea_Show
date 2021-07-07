// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
          swiperData:[
              {
                        id: 0,
                        image:  '/resource/image/carousel/carousel_1.jpg'
              },
            {
                  id: 0,
                  image: '/resource/image/carousel/carousel_2.jpg'
              },
            {
                  id: 0,
                  image: '/resource/image/carousel/carousel_1.jpg'
              }
          ],
          currentType: 'gs',  //ls,
          gs_data: {
              page_count: 1,
              page_item: 15,
              data:  [
                    {
                        id: 0,
                        title: '品牌',
                        icon: '/resource/image/replace/SanDisk.jpg',
                        name: '闪迪官方旗舰店',
                        introduce: '客户至上、服务优先',
                        star: 4,
                        sold: 12000,
                        goods: {  //goods.show_store
                          introduce: "U盘,硬盘,读卡器...",
                          show_goods: [
                               {
                                    id: 1,
                              cover: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.9RJGwyV05HJiNeciXT4n4AAAAA?w=289&h=180&c=7&o=5&dpr=1.25&pid=1.7',
                                    name:'超高速U盘',
                                    price: 20
                               },
                              {
                                id: 2,
                                cover: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.y0F-6MD-IogDgN8qKrRGVwHaHa?w=194&h=194&c=7&o=5&dpr=1.25&pid=1.7',
                                name: '新一代存储卡',
                                price: 23
                              },
                              {
                                id: 3,
                                cover: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.wnDgzLwHVJKgHIBQHzce-gHaE8?w=266&h=180&c=7&o=5&dpr=1.25&pid=1.7',
                                name: '移动的电脑',
                                price: 40
                              }
                          ]
                        }
                    },
                    {
                        id: 1,
                        title: '品牌',
                        icon: '/resource/image/replace/SanDisk.jpg',
                        name: '闪迪官方旗舰店',
                        introduce: '客户至上、服务优先',
                        star:  4.5,
                        sold: 12000,
                        goods: {
                          introduce: "U盘,硬盘,读卡器...",
                          show_goods: []
                        }
                      },
                      {
                        id: 2,
                        title: '品牌',
                        icon: '/resource/image/replace/SanDisk.jpg',
                        name: '闪迪官方旗舰店',
                        introduce: '客户至上、服务优先',
                        star: 1.2,
                        sold: 12000,
                        goods: {
                          introduce: "U盘,硬盘,读卡器...",
                          show_goods: []
                        }
                      },
                     
                      
                    

              ]
          }
  },
  change(e) {
        this.setData({
            currentType: e.currentTarget.dataset.operation
        }) 
  },
  onReachBottom: function () {
    console.log('上拉触底事件触发')
    this.getAppendToGoodsOrStore();
  },
  onPullDownRefresh: function () {
    console.log("下拉加载事件触发");
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