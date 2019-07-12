// pages/movies/more-movies/more-movies.js
var app = getApp();
var util =require('../../utils/util.js');
Page({
  data: {
    movies:{},
    navigationBarTitle:"",
    requestUrl:"",//为了能够在其他函数中调用，在data这里必须初始化
    totalCount:0,
    isEmpty:"true" //设置一个空值来判断这个电影加载的数据是否为空
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
   //为了其他函数能够调用，将目前请求的dataUrl 赋值给requestUrl
    this.data.requestUrl=dataUrl

    util.http(dataUrl, this.processMovieData)
  },

  onScollerLower:function(event){
     var nextUrl = this.data.requestUrl+"?start="+this.data.totalCount+"&count=20"
    util.http(nextUrl, this.processMovieData)
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
      //设置一个总电影数，假如数据不为空的话，之前的数据和现在的数据合并，
      //否则的话，就把现在加载的数据赋值给总数据，然后把当前的状态改成false
       var totalMovies={};
      if(!this.data.isEmpty){
        totalMovies=this.data.movies.concat(movies);
      }
      else{
        totalMovies=movies
        this.data.isEmpty=false
      }
      movies.push(temp)
      this.setData({
        movies: totalMovies
      })
      //每次获取完数据就加20条，实现递增
      this.data.totalCount += 20
      console.log(totalMovies)
    }
  },


  
  onReady:function(event){
    wx.setNavigationBarTitle({
      title: this.data.navigationBarTitle,
    })

  }
})