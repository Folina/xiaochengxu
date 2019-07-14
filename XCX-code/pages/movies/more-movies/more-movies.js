// pages/movies/more-movies/more-movies.js
var app = getApp();
var util =require('../../utils/util.js');
Page({
  data: {
    movies:[],
    navigationBarTitle:"",
    requestUrl:"",//为了能够在其他函数中调用，在data这里必须初始化
    totalCount:0,
    isEmpty:true //设置一个空值来判断这个电影加载的数据是否为空
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

  // onScrollerLower:function(event){
  //   var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20"
  //   util.http(nextUrl, this.processMovieData)
  //   wx.showNavigationBarLoading()
  // },
 
 //由于scroll-view跟下拉刷新不兼容，只能用这个onReachBottom函数，需要在json里面配置"onReachBottomDistance":50
  onReachBottom:function(event){
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20"
    util.http(nextUrl, this.processMovieData)
    wx.showNavigationBarLoading()
  },

//需要在json里面配置"enablePullDownRefresh":true
  onPullDownRefresh:function(event){
    var refreshUrl =this.data.requestUrl+"?start=0&count=20";
    this.data.movies={};
    this.data.isEmpty=true;
    util.http(refreshUrl, this.processMovieData)
    wx.showNavigationBarLoading()
  },

  processMovieData: function (moviesDouban) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      // [1,1,1,1,1] [1,1,1,0,0]
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }

    //之前出现重复的情况，是因为我把判断写在for 循环里面了
    var totalMovies = {}
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies);
    }
    else {
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    })
    wx.hideNavigationBarLoading();
    this.data.totalCount += 20;
    wx.stopPullDownRefresh() 
    
  },


  onReady:function(event){
    wx.setNavigationBarTitle({
      title: this.data.navigationBarTitle,
    })

  }
})