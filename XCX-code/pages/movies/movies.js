var app = getApp();

Page({


  onLoad:function(event){

    var inThreatersUrl = app.globalData.doubanBase+'/v2/movie/in_theaters'+"?start=0&count=3";
    var comingSoon = app.globalData.doubanBase + '/v2/movie/coming_soon'+"?start=0&count=3";
    var top250 = app.globalData.doubanBase + '/v2/movie/top250' + "?start=0&count=3";

   //传入url,并且传入Key值，方便确定调用的是哪一个 
    this.getMovieDataList(inThreatersUrl,"inThreater");
    this.getMovieDataList(comingSoon,"comingSoon");
    this.getMovieDataList(top250,"top250");

   
  },
  getMovieDataList: function (url, settledKey){
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
        that.processMovieData(res.data,settledKey)
      }
    })

  },

  processMovieData: function (moivesData, settledKey){
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

      //用动态的数据绑定
      var readyData={};
      readyData[settledKey]={
        movies:movies
      }
      this.setData(readyData)

    }

  }
  
})
