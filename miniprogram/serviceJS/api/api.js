/**
 * 这是一个api请求的集中存放js,它将被挂载到app上，然后我们通过
 */


// function result ( state , data) {
//     return {
//         success: state=='success'?data:null,
//         failed: state=='failed'?data:null
//     }
// }
module.exports = function (app) {
    return {
        
        //goods: 根据分类id+搜索内容+分页信息获取数据
        getGoodsByGlobalTypeId (id, search, page_number,item_number,handle) {
            app.request.get("/product/getGoodsByGlobalTypeIdLime?id="+id+"&item_number="+item_number+"&page_number="+page_number+"&search="+search, res => {
                handle.success(res);
            },error => 
            { 
                handle.failed(error);
            })


        },
        getGoodsDetailById(goods_id, handle) {
            app.request.get("/product/getGoodsDetailById?goods_id="+goods_id,
            res => {
                handle.success(res);
            },error => {
                handle.failed(error);
            })
        },
        getMyCart( goods_id, handle) {
          app.request.get("/cart/getMyCart?goods_id=" + goods_id,
            res => {
                handle.success(res);
            },error => {
                handle.failed(error);
            })
        },
        //向后端请求商品的style
      getGoodsStyle(goods_id, handle ) {
        app.request.get("/product/getGoodsStyle?goods_id=" + goods_id,
                res => {
                  handle.success(res);
                }, error => {
                  handle.failed(error);
                })
        },
      addMyCart(goods_id, goods_style_id, handle) {
        app.request.get("/cart/addMyCart?goods_id=" + goods_id + "&goods_style_id=" + goods_style_id,
            res => {
              handle.success(res);
            }, error => {
              handle.failed(error);
            })
        },
        //获取指定goods_style的信息
        getGoodsStyleById( goods_style_id, handle) {
          app.request.get("/product/getGoodsStyleById?goods_style_id=" + goods_style_id,
            res => {
              handle.success(res);
            }, error => {
              handle.failed(error);
            })
        },
        //向购物车中添加商品
        addGoodsToCart(goods_style, handle) {
          app.request.post_simple("/cart/addGoodsToCart", goods_style,
            res => {
              handle.success(res);
            }, error => {
              handle.failed(error);
            })
        },
      //根据goods_id查询商店信息及用户与该商店的购物车信息
      getMyCartDetail(goods_id, handle) {
        app.request.get("/cart/getMyCartDetail?goods_id=" + goods_id ,
          res => {
            handle.success(res);
          }, error => {
            handle.failed(error);
          })
      },
      //修改指定Cart  item的数量
      altCartItemCount(cart_item_id, count ,  handle) {
        app.request.get("/cart/altCartItemCount?cart_item_id=" + cart_item_id + "&count=" + count,
          res => {
            handle.success(res);
          }, error => {
            handle.failed(error);
          })
      }
    
    }
}