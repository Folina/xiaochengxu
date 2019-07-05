var app = getApp();

Page({


  onLoad:function(event){

    var inThreatersUrl = app.globalData.doubanBase+'/v2/movie/in_theaters';
    var comingSoon = app.globalData.doubanBase +'/v2/movie/coming_soon';
    var top250 = app.globalData.doubanBase +'/v2/movie/top250';

    this.getMovieDataList(inThreatersUrl);
    this.getMovieDataList(comingSoon);
    this.getMovieDataList(top250);

   
  },
  getMovieDataList:function(url){
    var that =this;
    wx.request({
      //https://api.douban.com/v2/movie/top250 会报错
      url: url ,//仅为示例，并非真实的接口地址
      method:"GET",
      header: {
        'content-type': 'application/xml' //   application/json 会报400,'https://douban.uieee.com/v2/movie/top250',
      },
      success(res) {

        console.log(res.data)
        that.processMovieData(res.data)
      }
    })

  },

  processMovieData:function(moivesData){
    var movies =[];
    for(var idx in moivesData.subjects){
      var subject = moivesData.subjects[idx];
      var title = subject.title
      if(title.length>6){
        title =title.substring(0,6)+"..."
      };
      var temp={
        title:title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        movieId:subject.id
      }
      movies.push(temp)

      this.setData({
        movies:movies
      })

    }

  }
  
})
