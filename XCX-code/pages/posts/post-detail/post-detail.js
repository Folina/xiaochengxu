var postsData =require("../../../datas/post-data/post-data.js")
var app=getApp();

Page({

 
  data: {
    isPlayingMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var postId = option.id;
    this.data.currentPostId=postId;
    var postData = postsData.postList[postId];
    // this.data.postData=postData;

    this.setData({
      //posts_key: post_content
      //定义一个对象postsData，把postsData的路径导进来，然后通过对象去获取这个postList的属性值
      // postData: postsData.postList
      postData:postData
    });

  //   wx.setStorageSync('key', "风暴英雄")
  // },
  // onCollectionTap:function(event){
  //   // 同步缓存
  //   var game = wx.getStorageSync('key')
  //   console.log(game)
    
   var postsCollected =wx.getStorageSync('posts_collected')
    if (postsCollected & postCollected){
     var postCollected =postsCollected[postId]
     this.setData({
       collected:postCollected
     })
   }
   else{
     var postsCollected ={};
     postsCollected[postId]=false;
     wx.setStorageSync('posts_collected', postsCollected);

   }

    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentPostId == postId){
      this.setData({

        isPlayingMusic:true
      })
    }
    this.onAudioMonitor()
  },
  onAudioMonitor:function(event){
    //监听音乐播放状态
    var that = this
    wx.onBackgroundAudioPlay(function () {
      that.setData(
        {
          isPlayingMusic: true
        }
      )
      //全局变量的g_isPlayingMusic赋值与局部变量的值相同
      app.globalData.g_isPlayingMusic=true,
      
      //音乐播放后，把g_currentPostId设置为空，这样点击下一个音乐时，状态为初始化状态
      app.globalData.g_currentPostId=null

    })
    //监听音乐暂停状态
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
    })
    app.globalData.g_isPlayingMusic = false


  },
  onCollectedTap:function(event){
    //获取缓存值
    var postsCollected = wx.getStorageSync('posts_collected')
    //获取当前界面的收藏值
    var postCollected = postsCollected[this.data.currentPostId];
    //收藏变成不收藏，不收藏变成收藏
    postCollected=!postCollected
    //状态变化之后重新把赋值，才能实现来回切换
    postsCollected[this.data.currentPostId]=postCollected;
    this.showModal(postCollected, postsCollected)
  
  },

  showModal: function (postCollected, postsCollected){
    var that = this
    wx.showModal({
      title: '收藏',
      content: postCollected?"收藏该文章":"取消收藏该文章",
      confirmColor: "#333",
      showCancel: "true",
      cancelText: "取消",
      confirmText: "确认",
      confirmColor: "#405f80",
      success:function(res){
        if(res.confirm){
          //跟新文章是否收藏的缓存值
            wx.setStorageSync('posts_collected', postsCollected);
            //更新数据绑定变量，从而实现图片切换
            //这里最容易写成this.data,就会报错，this.data is not a function
            that.setData({
              collected: postCollected
            })
        }
      }
    })
    
  },
  // showToast:function(){
  //   wx.setStorageSync('posts_collected', postsCollected)
  //   //更新数据绑定变量，从而实现图片切换
  //   //这里最容易写成this.data,就会报错，this.data is not a function
  //   this.setData({
  //     collected: postCollected
  //   })
  //   wx.showToast({
  //     title: postCollected ? "收藏成功" : "取消成功"
  //   })
    

  // }
  onShareTap:function(event){
    var itemList =[
      "分享到微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor:"#405f80",
      success:function(res){
        wx.showModal({
          title: '用户'+itemList[res.tapIndex],
          content: '用户'+res.cancle+"没有API调用"
        })
      }
    })

  },
  
  onMusicTap:function(event){
    var isPlayingMusic = this.data.isPlayingMusic;
    var currentPostId = this.data.currentPostId;
    var musicData=postsData.postList[currentPostId]
    if (isPlayingMusic){
      wx.pauseBackgroundAudio()
      //除了在onload里面做数据绑定时，用this.data=xxx;其余的都是用this.setData
      this.setData({
        isPlayingMusic:false
      })

    }
    else{
      wx.playBackgroundAudio({
        dataUrl:musicData.music.url,
        title:musicData.music.title
        
      })
      this.setData({
        isPlayingMusic: true
      })

    }
  

  }

})


