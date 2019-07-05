var app = getApp();

Page({


  onLoad:function(event){

    var inThreatersUrl = app.globalData.doubanBase+'/v2/movie/inTheaters';
    var comingSoon = app.globalData.doubanBase +'/v2/movie/comingSoon';
    var top250 = app.globalData.doubanBase +'v2/movie/top250';

    this.getMovieDataList(inThreatersUrl);
    this.getMovieDataList(comingSoon);
    this.getMovieDataList(top250);

   
  },
  getMovieDataList:function(url){
    wx.request({
      //https://api.douban.com/v2/movie/top250 会报错
      url: url ,//仅为示例，并非真实的接口地址
      method:"GET",
      header: {
        'content-type': 'application/xml' //   application/json 会报400,'https://douban.uieee.com/v2/movie/top250',
      },
      success(res) {
        console.log(res.data)
      }
    })

  }
  
})
