var request = require("/serviceJS/bash/request.js");
var bash64 = require("/serviceJS/bash/bash64.js");
var trigger = require("/serviceJS/bash/trigger.js");
var api = require("/serviceJS/api/api.js");
var loginService = require("/serviceJS/service/loginService.js");
var bus = require("/serviceJS/bash/bus.js").eventBus;
var asta = require("/serviceJS/bash/asta.js");

App({
  globalData: {
        token: null,
        user:null,
        isNewUser: false,
        loaded: false,

        
 },
  ... { trigger, bus, bash64 ,asta },  
  VSR( varname, type,  callback ) {
        this.bus.on(varname + '' + type, callback )
  },
  VSW(varname,type , newValue  ) {
        
        this.globalData[varname] = newValue
        this.bus.emit(varname + '' + type, this.globalData[varname]  );
  },




      
  //    var goodsarr = {...this.data.type};

  //   goodsarr.data.goods.push({
  //       id: '4',
  //       store_id: '1',
  //       name: '新添加',
  //       price: 20,
  //       cover: 'https://img.alicdn.com/imgextra/i2/113196123/O1CN01f2LaSX1v6NjKE4V4P_!!0-saturn_solar.jpg_468x468q75.jpg_.webp1'
  //  }) ;

  //   this.setData({
  //       type: goodsarr
  //   })
  // },

  //强大!  优雅地使用对象，且能使数据进行页面更新
  updateObject: function (that, name, callback   ) {
        //var targetObject = { ...that.data[name]};  //复制好
        var targetObject = that.data[name] ; 
        var altObject = callback(targetObject);
        that.setData({
            [name]: altObject
        }) 
  },
  //此时刚进入小程序
  onLaunch: function () {
      //初始化request,并将之挂载到app中
      this.request = request(this);
      //初始化api，并将之挂载到app中
      this.api = api(this);


      var app = this;
      this.trigger.showLoading("加载中", function (stop) {
      app.VSR("loaded", "update", function () {
          stop(10);
      });
    })  
    loginService.login(this);
    

  }
   
  
})
