let imgPreload = function(srcs, opts) {
  if (!(this instanceof imgPreload)) {
    return new imgPreload(srcs, opts)
  }

  let self = this
  if (!(Object.prototype.toString.call(srcs) === '[object Array]')) {
    return
  }

  //修改：以前想传过来的是img对象。后来想了想（如果事先img对象不存在呢？），所以方便一点还是传src数组吧。
  self.srcs = srcs
  self.opts = Object.assign({}, imgPreload.defaultOpts, opts)

  // 数量为0时，直接执行onComplete函数并返回
  if (!self.srcs.length) {
    self.opts.onComplete()
    return
  }

  // 超出响应时间时，直接执行onComplete函数并返回
  setTimeout(() => {
    // console.log(this.opts.method)
    self.opts.onComplete()
    return
  }, self.opts.timeout)

  self.order = function() {
    let srcs = self.srcs
    let count = 0
    let This = self

    ;(function orderload() {
      if (Object.prototype.toString.call(srcs[count]) != '[object String]') {
        return
      }
      let oImg = new Image()
      oImg.onload = function() {
        This.opts.onEach(count, srcs[count])
        count++
        if (count >= srcs.length - 1) {
          This.opts.onComplete()
        } else {
          orderload()
        }
      }
      oImg.onerror = function() {
        This.opts.onError(count, srcs[count])
        count++
        if (count >= srcs.length - 1) {
          This.opts.onComplete()
        } else {
          orderload()
        }
      }
      oImg.src = srcs[count]
    })()
  }

  self.order()
}

imgPreload.defaultOpts = {
  // 超时时间，默认为5000
  timeout: 5000,
  // 每加载一张图片执行的方法 提供index, value参数
  onEach: function(i, v) {},
  // 所有图片加载完执行的方法
  onComplete: function() {},
  // 图片加载错误执行的方法 提供index, value参数
  onError: function(i, v) {
    console.log('error')
  }
}

module.exports = imgPreload
