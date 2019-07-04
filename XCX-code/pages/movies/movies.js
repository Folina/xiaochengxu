Page({


  onLoad:function(event){
    wx.request({
      url: 'https://api.douban.com/v2/movie/top250', //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
  }
  
})
