# imgPreload(srcs, opt)
> 图片预加载插件

### {opt}基本参数
| 参数名 | 解释 | 类型 | 默认值 | 
| :------: | :------: | :------: |:------: |
| timeout | 超时时间(ms) | Number | 5000 |
| onEach | 每加载一张图片执行的方法；提供index, value参数 | Function | null |
| onError | 图片加载错误执行的方法；提供index, value参数 | Function | null |
| onComplete | 所有图片加载完成/超时后执行的方法 | Function | null |


### 使用示例
```
let srcs = new Array()

Array.from(document.querySelectorAll('.img-preload-imgs')).forEach(
  (v, i) => {
    srcs[i] = v.src
  }
)

imgPreload(srcs, {
  timeout: 100000,
  onComplete: function() {
    document.querySelector('#img_loading').classList.add('hidden')
  }
})
```
