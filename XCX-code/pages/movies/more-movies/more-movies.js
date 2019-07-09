// pages/movies/more-movies/more-movies.js
Page({
  data: {
    navigationBarTitle:""
  },
  onLoad: function (options) {
   var category = options.category;
    console.log(category);
    this.data.navigationBarTitle = category
  },

  //如何动态设置导航栏标题
  onReady:function(event){
    wx.setNavigationBarTitle({
      title: this.data.navigationBarTitle,
    })

  }
})