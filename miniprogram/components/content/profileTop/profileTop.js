
// components/common/profileTop/profileTop.js
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
        user: {
            type:Object,
            value: null
        },
        tmpHeadimg: {
          type: String,
          value: null
        },
        tmpName: {
          type: String,
          value: null
        }

  },

  lifetimes: {
    attached: function () {

          if ( ! app.globalData.loaded) {
                app.trigger.showLoading("加载中", function(stop) {
                      app.VSR("loaded","update", function() {
                           stop(10);
                      });
                })  
          }
          var time = 200;
          function updateUserData(box)  {
            console.log("进入了目标函数");
            if (app.globalData.user == null) {
                  console.log("用户数据为空");
                  setTimeout(function() {
                      updateUserData();
                      time+=50;
                  },time);
            }else {
                  console.log("用户数据正常");
                  box.setData({
                      user: app.globalData.user
                  })
            }
            
            }
            //调用以维护数据显示的健全
            updateUserData(this);
     
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的初始数据
   */
  data: {

  },
    /**
   * 启用插槽
   */
  options: {
    multipleSlots: true
  },
  /**
   * 组件的方法列表
   */
  methods: {
        updatex() {
          if (this.data.user.headimg == null && this.data.tmpHeadimg == null ) {
                    app.trigger.getWxBase("用于完善用户资料",
                    res => {
                          //当前的显示
                          app.globalData.user.headimg = res.userInfo.avatarUrl
                          app.globalData.user.fullname = res.userInfo.nickName
                          app.VSW("user", "update", app.globalData.user );
                          this.setData({
                            tmpHeadimg: res.userInfo.avatarUrl,
                            tmpName: res.userInfo.nickName
                          })

                          wx.clearStorage();
                          //将信息固定到数据库
                          app.request.post("/user/updateUser",this.data.user , 
                                  res=> {
                                      console.log("数据更新成功回调", res);
                                  },
                                  error => {
                                        console.log("数据更新失败", error);
                                  },
                                  {
                                      'Authorization': 'Bearer  ' + app.globalData.token,
                                  }
                          );
                      },
                    error => {
                           console.log("用户拒绝", error);
                    })
                   
          }
        }
  }
})
