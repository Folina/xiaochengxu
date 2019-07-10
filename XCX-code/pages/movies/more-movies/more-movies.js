// pages/movies/more-movies/more-movies.js
var app = getApp();
util =require('../../utils/util.js');
Page({
  data: {
    movies:{},
    navigationBarTitle:""
  },
  onLoad: function (options) {
   var category = options.category;
    this.data.navigationBarTitle = category;
    var dataUrl="";
    switch(category){
      case "正在热映":
        dataUrl = app.globalData.doubanBase +"/v2/movie/in_theaters"
      break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon"
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250"
        break;
    }
    util.http(dataUrl,this.callBack)
  },

  callBack:function(data){
    console.log(data)
  },


  processMovieData: function (moivesDouBan) {
    var movies = [];
    for (var idx in moivesDouBan.subjects) {
      var subject = moivesDouBan.subjects[idx];
      var title = subject.title
      if (title.length > 6) {
        title = title.substring(0, 6) + "..."
      };
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        // stars: subject.rating.stars,
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }

      movies.push(temp)
      this.setData({
        movies:movies
      })

    }
  },


  
  onReady:function(event){
    wx.setNavigationBarTitle({
      title: this.data.navigationBarTitle,
    })

  }
})