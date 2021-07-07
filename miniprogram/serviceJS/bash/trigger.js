function getWxBase (applyMession, successfun,failfun ,x ) {
      wx.getUserProfile({
        desc: applyMession ,
        success: res => {
           successfun(res)
        },
        fail: error => {
          failfun(error)
        },
        ...x
      })
}


function showModal(title, content, successFun ,failFun) {
      wx.showModal({
        title: title,
        content: content,
        success(res) {
             successFun(res)
        },
        fail(error) {
           failFun(error)
        }
      })

}

/**
 * 使用示例：
 *     trigger.showLoading("加载中",function(stop) {
         stop(2000);
    });
 * 
 */
function showLoading(title, outFun) {
  function stop(time) {
        setTimeout(function () {
          wx.hideLoading()
        }, time)

  }
  if(! title) {title = "加载中"}
  wx.showLoading({
    title: title,
  })
  outFun(stop);
}





module.exports = {
  getWxBase: getWxBase,
  showLoading: showLoading,
  showModal: showModal

}

