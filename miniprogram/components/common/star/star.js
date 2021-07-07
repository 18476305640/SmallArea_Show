// components/common/star/star.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    score: {
        type:Number,
        value: null
    },
  },
  data: {
      scoreArr: []
  },
  lifetimes: {
        attached() {
          if (this.data.score>5) {
                console.warn("星星组件: 你传的值大于5，请处理后再传入！组件内部策略改变为5");
                this.setData({
                    score:5
                })
          }
          var newScore = Math.floor(this.data.score) + (this.data.score % 1==0?0:(this.data.score % 1 <= 0.5 ?0.5:1));
              var arr = [];
              for (var i = 0.5 ; i <= newScore ; newScore-- ) {
                    if(i < newScore ) {
                          //整星
                          arr.push(1);
                    }else {
                         //半星
                      arr.push(0.5);
                    }
              }
              var arrLenth = arr.length;
              for (var i = 0; i < (5 - arrLenth); i++ ) {
                  arr.push(0);
              }
              this.setData({
                  scoreArr:arr
              })
        },
        detached() {

        }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
