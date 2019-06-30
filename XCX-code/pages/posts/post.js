
var postsData =require("../../datas/post-data/post-data.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //小程序总是会读取data对象来做数据绑定，这个动作我们称为动作A
    //而这个动作A的执行，是在onload 函数执行之后发生的
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      // this.data.postList= postsData.postList

    this.setData({
      //posts_key: post_content
      //定义一个对象postsData，把postsData的路径导进来，然后通过对象去获取这个postList的属性值
      posts_key: postsData.postList
    });
  },
  onLoadTap:function(event){
   var postId = event.currentTarget.dataset.postid
   console.log(postId)
   

    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId,
    })

  }
})