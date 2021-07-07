module.exports = function(app) {
  var baseUrl = 'http://127.0.0.1'; 
      return {
          post (url, data , successfun , failfun ,x) {
            wx.request({
              url: baseUrl+url,
              method: 'POST',
              header: {
                'Authorization': 'Bearer ' + app.globalData.token,
                "Content-Type": "application/x-www-form-urlencoded" 
              },
              data: data,
              success(resource) {
                successfun(resource);
              },
              fail(error) {
                failfun(error)
              },
              ...x
            })

          },
          post_simple(url, data, successfun, failfun, x) {
            wx.request({
              url: baseUrl + url,
              method: 'POST',
              header: {
                'Authorization': 'Bearer ' + app.globalData.token
              },
              data: data,
              success(resource) {
                successfun(resource);
              },
              fail(error) {
                failfun(error)
              },
              ...x
            })

          },

          get (url, successfun, failfun, x) {
            wx.request({
              url: baseUrl+ url,
              method: 'GET',
              header: {
                'Authorization': 'Bearer  ' + app.globalData.token
              },
              success(resource) {
                console.log("get请求成功回调",resource);
                successfun(resource);
              },
              fail(error) {
                failfun(error)
              },
              ...x
          
            })  
          }
    }

}