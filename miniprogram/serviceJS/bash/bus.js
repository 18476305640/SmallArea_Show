//事件总线的使用
//准备工作：将此js挂载到app.js中
// var eventBus = require('utils/bus.js'); //第app.js第一行加入

// this.globalData = { //App({})根下加入
//   bus: eventBus.eventBus
// }
//使用：
//不管发送方还是接收方都要加入机器人，，js第一行！
// var app = getApp()
// var bus = app.globalData.bus

//使用：发送方
// playing(e) {
//   bus.emit('playing',e); 
// },

//使用：接收方
// bus.on('playing', (data) => {
//   //监听事件总线的改变
//   console.log(data)
// })


//创建EventBus对象
let EventBus = function () {
  console.log("eventbus init...");
};
//准备数组容器
var objBus = [], arrbus = [];
//添加方法
EventBus.prototype = {
  obj: {
    set: function (key, action) {
      if (key && action) {
        var map = {};
        map.k = key;
        map.v = action;
        //如果存在，则删除之前添加的事件
        for (var i = 0, busLength = objBus.length; i < busLength; i++) {
          var tempMap = objBus[i];
          if (tempMap.k == key) {
            objBus.splice(i, 1);
          }
        }
        objBus.push(map);
      }
    },
    get: function (key) {
      if (key) {
        for (var i = 0, busLength = objBus.length; i < busLength; i++) {
          var map = objBus[i];
          if (map.k == key) {
            return map.v();
          }
        }
      }
    }
  },
  emit: function (key, data) {
    if (key) {
      for (var i = 0, busLength = arrbus.length; i < busLength; i++) {
        var map = arrbus[i];
        if (map.k == key) {
          return map.v(data);
        }
      }
    }
    return new Promise((resolve, reject) => { resolve() })
  },
  on: function (key, action) {
    if (key && action) {
      var map = {};
      map.k = key;
      map.v = action;
      arrbus.push(map);
    }
  },
  arr: {
    push: function (key, action) {
      if (key && action) {
        var map = {};
        map.k = key;
        map.v = action;
        arrbus.push(map);
      }
    },
    pop: function (key) {
      if (key) {
        for (var i = 0, busLength = arrbus.length; i < busLength; i++) {
          var map = arrbus[i];
          if (map.k == key) {
            map.v();
          }
        }
      }
    }
  }
}
var eventBus = new EventBus()
module.exports = {
  eventBus: eventBus
}