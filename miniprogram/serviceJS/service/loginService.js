
//1、确保token存在
function StorageLineGlobal(app) {
  let global = app.globalData;
  //数据激活
  let token = wx.getStorageSync('token')
  let user = wx.getStorageSync('user')
  if (!token || ! user) {
      login(global,app); 
  }else {
    console.log("token=",token);
    app.request.post("/uaa/oauth/check_token?token="+token,{} ,res => {
          console.log("检验成功回调");
          if(res.data.user_name) {
              console.log( res.data.user_name);
              app.VSW("token", "update", token);
              app.VSW("user", "update", user);
              app.VSW("loaded", "update", true);
          }else {
              console.log("过期,验证失败需要登录");
              login(global, app); 
          }
    },error => {
          console.log("token=", token);
          console.log("检验失败回调：", error);
          login(global, app); 
    })

    
      
  }
}

//2、此函数用于登录，登录成功后，会更新全局及缓存中的token
function login(global,app) {
      console.log("正在登录...");
      wx.login({  success: res => {
          //面向我们封装的请求
          console.log("code=",res.code);
          app.request.post("/uaa/wxLogin", 
          {
              code: res.code
          }, res => 
          {
              
              console.log("成功", res);
              //判断是不是新用户
              app.VSW("isNewUser", res.data.data.userData.headimg == null  );
              app.VSW("token", "update", res.data.data.tokenData.access_token);
              app.VSW("user", "update", res.data.data.userData );
              app.VSW("loaded", "update", true);
              wx.setStorage({
                  key: 'token',
                  data: res.data.data.tokenData.access_token
              })

              wx.setStorage({
                  key: 'user',
                  data: res.data.data.userData
              })


          },error => 
          {  //登录失败，问题很大
                console.log(error);
          },{ //添加请求头，才能请求到token
              // head: {
              //   "Content-Type": "application/x-www-form-urlencoded" 
              // }
          })
        }
      })
}

module.exports={
  login: StorageLineGlobal

}