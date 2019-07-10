function convertToStarsArray(stars) {  //把星级存到数组中  
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else {
      array.push(0);
    }
  }
  return array;
}

function http(url,callBack){
  wx.request({
    url: url,
    method: "GET",
    header: {
      'content-type': 'application/xml' //   application/json 会报400,'https://douban.uieee.com/v2/movie/top250',
    },
    success(res) {
      callBack(res.data)
    }
  })

}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http:http

}