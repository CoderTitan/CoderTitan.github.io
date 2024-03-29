---
title: Node.js搭建Web服务器
date: '2018-01-20 11:13'
tags:
  - Node
categories: Node.js
abbrlink: 51f133d4
image:
---

![Node.js](https://titanjun.oss-cn-hangzhou.aliyuncs.com/javascript/nodejs.png?x-oss-process=style/titanjun)


 
<!-- more -->


## Node.js介绍
- [Demo地址](https://github.com/CoderTitan/NodejsDemo)
- `Node.js`发布于2009年5月，由Ryan Dahl(瑞恩·达尔)在`GitHub`上发布了最初版本的部分`Node.js`包，随后几个月里，有人开始使用Node.js开发应用
- `Node.js`是一个基于`Chrome JavaScript`运行时建立的平台， 是一个`Javascript`运行环境
- Node 是一个服务器程序, 用Javascript这个语言开发服务器
- `Node.js`的实质是对`Chrome V8`引擎进行了封装
- `V8 JavaScript` 引擎是 `Google` 用于其 `Chrome` 浏览器的底层 JavaScript 引擎
- 传统意义上的`JavaScript`运行在浏览器上，这是因为浏览器内核实际上分为两个部分:渲染引擎和 `JavaScript` 引擎。前者负责渲染`HTML + CSS`，后者则负责运行`JavaScript`。Chrome 使用的`JavaScript` 引擎是 V8，它的速度非常快
- 参考[Node.js 究竟是什么？](https://www.ibm.com/developerworks/cn/opensource/os-nodejs/)和[Node.js的SDK文档](https://nodejs.org/dist/latest-v7.x/docs/api/)
 

### 不需要搭建`Apache`等服务器

为什么Node.js这个服务器语言不需要搭建`Apache`等服务器
- 因为`Node.js`是基于V8去封装，所以在下载`Node.js`的时候，就会自带V8，因此不需要在另外搭建。
- `Node.js`和`PHP`类似都是语言，是需要内核才需要跑起来的，`Node.js`依赖V8，PHP依赖`Apache`才能运行
- 比如OC就需要依赖`iPhone`手机内核才能跑起来


### Node.js的优缺点
- Node.js优点：
  - 采用事件驱动、异步编程，为网络服务而设计。其实`Javascript`的匿名函数和闭包特性非常适合事件驱动、异步编程。而且`JavaScript`也简单易学，很多前端设计人员可以很快上手做后端设计。
  - `Node.js`非阻塞模式的IO处理给`Node.js`带来在相对低系统资源耗用下的高性能与出众的负载能力，非常适合用作依赖其它IO资源的中间层服务。
  - `Node.js`轻量高效，可以认为是数据密集型分布式部署环境下的实时应用系统的完美解决方案。Node非常适合如下情况：在响应客户端之前，您预计可能有很高的流量，但所需的服务器端逻辑和处理不一定很多。
- Node.js缺点：
  - 可靠性低
  - 单进程，单线程，只支持单核CPU，不能充分的利用多核CPU服务器。
  - 一旦这个进程崩掉，那么整个web服务就崩掉了。

### Node.js工作原理

- 传统Web服务器原理(T):传统的网络服务技术，是每个新增一个连接（请求）便生成一个新的线程，这个新的线程会占用系统内存，最终会占掉所有的可用内存。
- `Node.js`工作原理(T)：只运行在一个单线程中，使用非阻塞的异步 I/O 调用，所有连接都由该线程处理，也就是一个新的连接，不会开启新的线程，仅仅一个线程去处理多个请求
- 那么问题来了: 既然`Node.js`是单线程的, 那么单线程怎么开启异步?怎么工作的？
- 这里我们将会引入一个事件驱动的概念:
  - 传统的`web server`多为基于线程模型: 你启动`Apache`或者什么`server`，它开始等待接受连接, 当收到一个连接，`server`保持连接直到事务请求完成,如果他需要花几微妙时间去读取磁盘或者访问数据库，`web server`就阻塞了IO操作（这也被称之为阻塞式IO),想提高这样的`web server`的性能就只有启动更多的线程。
  - `Node.Js`使用事件驱动模型，类似iOS的`Runloop`,把事件存放到一个循环中，然后取出来处理，当`web server`接收到请求，放入事件队列，然后去服务下一个web请求。当这个请求完成，从事件队列中取出来执行处理，将结果返回给用户。因为`webserver`一直接受请求而不等待任何读写操作。（这也被称之为非阻塞式IO或者事件驱动IO）



### Node.js使用介绍
- `Node.js`使用Module模块去划分不同的功能，以简化App开发，Module就是模块，跟组件化差不多，一个功能一个模块。
- `Node.js`内建了一个HTTP服务器，可以轻而易举的实现一个网站和服务器的组合，不像PHP那样，在使用PHP的时候，必须先搭建一个Apache之类的HTTP服务器，然后通过HTTP服务器的模块加载CGI调用，才能将PHP脚本的执行结果呈现给用户
- `require()` 函数，用于在当前模块中加载和使用其他模块；

## Express模块(框架)
- Express是Node.JS第三方库
- Express可以处理各种HTTP请求
- Express是目前最流行的基于Node.js的Web开发框架，
- Express框架建立在node.js内置的http模块上，可以快速地搭建一个Web服务器

### 安装Node.js
- 打开终端，输入node -v，先查看是否已经安装
- 如果没有安装，就需要安装node软件
- 参考[Node.js 安装配置](http://www.runoob.com/nodejs/nodejs-install-setup.html)

### 安装npm
- npm是随同`NodeJS`一起安装的包管理工具，用于下载`NodeJS`第三方库。
- 类似iOS开发中`cocoapods`，用于安装第三方框架
- 新版的`NodeJS`已经集成了npm，所以只要安装好Node.JS就好
### 下载第三方模块`Express`
- 首先先创建项目
  - 新建一个文件夹, 打开终端
  - cd到当前文件夹, 创建一个js文件, 如: `touch app.js`
- 安装`package.json`文件, 类似于CocoaPods中的`Podfile`   - cd到当前文件夹
  - 终端输入: `npm init`
- 最后安装express库 
  - 终端输入: `npm install express --save`

## 搭建简单的Http服务器

### 服务器种类
  - Web服务器: 处理`HTTP`请求的服务器
  - `Socket`服务器(即时通讯): 通过`socket`传输
    - 即时通讯(IM): 允许两人或多人使用网路即时的传递文字讯息、档案、语音与视频交流
  - 流媒体服务器: 音视频处理程序, 接受流媒体格式文件,`flv/ts`等


简单效果图

![请求返回结果.jpg](http://upload-images.jianshu.io/upload_images/4122543-be8bdfac135d99e8.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### 开始搭建Http服务器
- require加载模块
- 监听端口号和网址, 端口号不能使用已经占用的端口比如（80），每个服务器相当于一个app，都需要端口，才能找到入口

```objc
//创建HTTP服务器

//1. 加载http模块
var http = require('http');

//2. 创建http服务器
// 参数: 请求的回调, 当有人访问服务器的时候,就会自动调用回调函数
var server = http.createServer(function (request, response) {
    console.log('有人访问了服务器')

    //回调数据
    response.write('Hello, My Love')
    response.end()
})

//3. 绑定端口
server.listen(3030, '192.168.2.11')

//4. 执行
console.log('执行了3030')
```

### 开始运行服务器
- 那么还是要打开终端
- 输入: `node app.js`
  - `app.ja`为文件名

## express搭建服务器
### express框架的使用
- 引入express模块
- 创建express服务器
- get, post请求中: 
  - 参数一: 请求根路径,若传`'/'`, 则url为: `http://192.168.0.0:3030`
  - 若传`'/home'`, 则url为: `http://192.168.0.0:3030/home`
  - 参数二: 请求数据的回调函数
- 监听端口: 默认url为当前电脑的IP地址

```objc
/* express的服务器 */

//1. 导入express
var express = require('express')

//2. 创建express服务器
var server = express()

//3. 访问服务器(get或者post)
//参数一: 请求根路径
//3.1 get请求
server.get('/', function (request, response) {
    // console.log(request)
    response.send('get请求成功')
})

//3.2 post请求
server.post('/', function (request, response) {
    response.send('post请求成功')
})

//4. 绑定端口
server.listen(4040)
console.log('启动4040')
```

### 路由
- 路由:针对不同的URL有不同的处理方式，比如以后会有首页，发现模块，每个模块处理不一样。
- 添加url路径,根据不同路径，显示不同内容
- 路由句柄(索引):执行完一个函数，在执行下一个 ,因为有时候处理一个请求，需要做很多其他事情，写在一起业务逻辑不好分开,所以多弄几个行数
- 函数一定要添加next参数，一定要调用next(),才会进行下面操作，代码使一行一行执行，解释性语言
- 

```objc
/* express的路由 */

//1. 导入express
var express = require('express')

//2. 创建express服务器
var server = express()

//3. 访问服务器(get或者post)
//参数一: 请求根路径
//3.1 get请求
// next: 路由句柄
server.get('/home', function (request, response, next) {

    console.log('从据库获取数据')
    next()

}, function (request, response) {

    response.send('这是请求返回的数据')

})

//3. 绑定端口
server.listen(4040)
console.log('启动4040')
```

### 中间件
- 优化代码，使代码清晰可读
- 原理，发送一个请求给服务器的时候，会被中间件拦截，先由中间件处理，每个中间件都有一个回调函数作为参数,拦截到参数，就会自动执行回调函数。
- 注意：有中间件use，会先执行中间件的回调函数，然后才会调用get或者`post`的回调函数，也就是当监听到请求，先执行中间件，才会到get,post请求。
- use是`express`注册中间件的方法


```objc
/* express的中间件 */

//1. 导入express
var express = require('express')

//2. 创建express服务器
var server = express()

//3. 创建中间件:use
//截取请求, 拦截回调
server.use('/', function (request, response, next) {
    console.log('执行中间件')
    // console.log('获取数据库数据')
    console.log(request.query.page)
    next()
})

//4. 访问服务器(get或者post)
//参数一: 请求根路径
//4.1 get请求
server.get('/home', function (request, response) {
    // console.log(request)
    response.send('get参数请求成功')
})


//5. 绑定端口
server.listen(4040)
console.log('启动4040')
```

### get请求参数
- request.query会把请求参数包装成字典对象，直接通过点就能获取参数
- 这里的请求地址为: `http://192.168.2.11:4040/home?page=12`

```objc
/* express的中间件 */

//1. 导入express
var express = require('express')

//2. 创建express服务器
var server = express()

//4. 访问服务器(get或者post)
//参数一: 请求根路径
//4.1 get请求
server.get('/home', function (request, response) {
    // console.log(request)
    console.log(request.query.page)
    response.send('get参数请求成功')
})

//5. 绑定端口
server.listen(4040)
console.log('启动4040')
```

- 输出结果
-
```
启动4040
12
```

### post请求参数
- 这里先让我们看一下request的部分参数
- 

```objc
headers: 
   { 
   //请求头
     host: '192.168.2.11:4040/home',
     //保持长连接
     connection: 'keep-alive',
     'cache-control': 'max-age=0',
     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36',
     'upgrade-insecure-requests': '1',
     //可接受的数据解析方式
     accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
     'accept-encoding': 'gzip, deflate',
     'accept-language': 'zh-CN,zh;q=0.9',
     'if-none-match': 'W/"15-H7HlVCzzVfmRL56LAnLfNUaMM+8"' 
   }

```

- 使用http发送请求，需要设置`content-type`字段
- `content-type`字段
  - `application/x-www-form-urlencoded`(普通请求，默认一般使用这种)
  - `application/json`(带有json格式的参数，需要使用这个，比如参数是字典或者数组)
  - `multipart/form-data`(传输文件，文件上传使用这个)
- AFN框架中`AFHTTPRequestSerializer`使用的是`application/x-www-form-urlencoded`，`AFJSONRequestSerializer`使用的是`application/json`
- `Node.JS`需要使用`body-parser`模块,解析post请求参数
- 可以采用中间件的方式解析post请求参数
  - 注意`bodyParser.urlencoded`参数是一个字典，需要添加`{}``包装
  - extends必传参数，是否展开
- 完整代码示例

```objc
/**
 * 创建Post请求
 * */

//1. 导入express
var express = require('express')

//2. 加载模块
var bodyParse = require('body-parser')

//3. 创建服务器
var server = express()

//4. 生成解析器
// application/x-www-form-urlencoded
var urlencoded = bodyParse.urlencoded({ extends:true })

// application/json
var jsonParser = bodyParse.json()

//5. 中间件: 把请求体参数 存放到request.body
server.use('./home', jsonParser)

//6. 请求数据
// request:request请求头,请求体
server.post('./home', function (request, response) {
    //解析post请求参数
    console.log(request.body)
    response.send(request.body)
})

//7. 绑定端口
server.listen(5050)
```



<div class="note info"><p>[Demo地址](https://github.com/CoderTitan/WebServer)</p></div>

---
> 参考文章:
> 1. [Node.js优缺点](http://blog.csdn.net/kaosini/article/details/8089597)
> 2. [Node.js 究竟是什么？](https://www.ibm.com/developerworks/cn/opensource/os-nodejs/)
> 3. [Express 4.x API 中文手册](http://www.expressjs.com.cn/4x/api.html)
> 4. [JavaScript语言参考](https://msdn.microsoft.com/zh-cn/library/aa155110.aspx)
