// components/common/order-item/order-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
        data: {
            type:Object,
            value: null
        },
        
  },
  data: {
    sum: 0
  },
  lifetimes: {
    attached() {
          console.log("开始计算总价");
          var sum = 0;
          for(var i=0; i<this.data.data.detail.length ; i++) {
                console.log(i, this.data.data.detail[i]);
                sum += this.data.data.detail[i].price * this.data.data.detail[i].count;
          }
          console.log("得到的价格是：", sum);

          this.setData({
                sum: sum
          })
          console.log("存入,值为：", this.data.sum);
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
