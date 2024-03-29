---
title: iOS组件化之私有库
tags:
  - CocoaPods
  - git
categories: 组件化开发
abbrlink: 7c5c4661
date: 2018-08-29 16:36:20
image:
---



- 随着公司业务的不断发展，应用的代码体积将会越来越大，业务代码耦合也越来越多，代码量也是急剧增加
- 如果仅仅完成代码拆分还不足以解决业务之间的代码耦合，而组件化是一种能够解决代码耦合、业务工程能够独立运行的技术
- 这篇文章主要介绍远程私有库的创建和管理以及本地索引库的使用, 并且可参照[发布开源框架到CocoaPods入坑指南](https://www.titanjun.top/2018/06/29/%E5%8F%91%E5%B8%83%E5%BC%80%E6%BA%90%E6%A1%86%E6%9E%B6%E5%88%B0CocoaPods%E5%85%A5%E5%9D%91%E6%8C%87%E5%8D%97/)

<!--more-->


## 本地库方案


### 创建本地私有库
- 首先需要一个宿主工程`MainMoudle`和一个用于存放所有本地私有库的文件夹`AllMoudles`, 这两个文件夹在同一目录下
- 在`AllMoudles`文件夹中创建一个私有库`TitanFMBase`, 在子目录创建`Classes`用于存放所有的文件, 目录如下: `AllMoudles/TitanFMBase/Classes`
- 在`Classes`文件夹中添加文件, 并提交到本地`git`

```objc
//进入TitanFMBase文件夹
cd xxx/AllMoudles/TitanFMBase

//初始化git
git init

//将本地代码提交到本地仓库
git add .

// 提交修改到本地仓库
git commit -m '你的修改记录'

//创建spec文件
pod spec cteate TitanFMBase
```

最后打开`TitanFMBase`文件夹中的`TitanFMBase.podspec`, 修改对应的配置信息, 可[参考修改博客](https://www.titanjun.top/2018/06/29/%E5%8F%91%E5%B8%83%E5%BC%80%E6%BA%90%E6%A1%86%E6%9E%B6%E5%88%B0CocoaPods%E5%85%A5%E5%9D%91%E6%8C%87%E5%8D%97/)或可参考[官方文档](https://guides.cocoapods.org/syntax/podspec.html#specification)


```ruby
Pod::Spec.new do |s|
    s.name          = 'TitanModel' #项目名
    s.version       = '0.1.0' #相应的版本号
    s.summary       = 'A short description of YJDemoSDK.' #简述
    s.description   = <<‐ DESC #详细描述
    TODO: Add long description of the pod here.
                      DESC
    s.homepage      = 'https://github.com/CoderTitan/TitanModel' #项目主页
    s.license       = { :type => 'MIT', :file => 'LICENSE' } #开源协议
    s.author        = { 'CoderTitan' => 'quanjunt@163.com' } #作者
    s.platform      = :ios, '8.0' #支持的平台
    s.requires_arc  = true #arc和mrc选项
    s.libraries     = 'z', 'sqlite3' #表示依赖的系统类库，比如libz.dylib等
    s.frameworks    = 'UIKit','AVFoundation' #表示依赖系统的框架
    s.ios.vendored_frameworks = 'TKBase/TKBase.framework' # 依赖的第三方/自己的framework
    s.vendored_libraries = 'Library/Classes/libWeChatSDK.a' #表示依赖第三方/自己的静态库（比如libWeChatSDK.a）
    #依赖的第三方的或者自己的静态库文件必须以lib为前缀进行命名，否则会出现找不到的情况，这一点非常重要

    #平台信息
    s.platform      = :ios, '7.0'
    s.ios.deployment_target = '7.0'

    #文件配置项
    s.source        = { :git => 'https://github.com/CoderTitan/TitanModel.git', :tag => s.version.to_s }
    #配置项目的目标路径，如果不是本地开发，pod init/update会从这个路去拉去代码

    s.source_files = 'TitanModel/Classes/**/*' #你的源码位置
    s.resources     = ['TitanModel/Assets/*'] #资源，比如图片，音频文件等
    s.public_header_files = 'TitanModel/Classes/TitanModel.h'   #需要对外开放的头文件

    #依赖的项目内容 可以多个
    s.dependency 'MJExtension'
    s.dependency 'AFNetworking'

end
```


<div class="note warning"><p>注意点</p></div>

在`source`配置中, 本地库的git地址不需要填

```
s.source = { :git => "", :tag => "#{s.version}" }
```

### 使用本地私有库

- 安装和使用本地私有库和和远程私有库步骤一样, 不同的是:
  - 远程私有库不需要指明库的地址
  - 本地私有库需要制定库地址(相对路径即可)
- 使用`path`的形式添加框架依赖

```
pod 'TitanFMBase', :path => '../AllMoudles/TitanFMBase'
```

<div class="note warning"><p>注意点</p></div>

- 入伙时本地私有库, 不需要使用`pod lib lint`或者`pod spec lint`验证`spec`文件的正确性
- 因为有些字段只有远程私有库才需要设置, 只要保证本地私有库的路径正确, 并不影响使用



## 远程私有库


- 当我们在终端执行`pod search`命令时, 搜索的其实是本地缓存的`spec`文件, 当然第一次使用时需要先更新本地的`spec`文件
- 可在终端执行`pod repo`命令查看当前本地的索引库, 或者查看目录`~/.cocoapods/repos/master/Specs`
- 在组件化开发过程中, 为防止代码泄露, 我们必须要创建自己的本地索引库
- [发布开源框架到CocoaPods入坑指南](https://www.titanjun.top/2018/06/29/%E5%8F%91%E5%B8%83%E5%BC%80%E6%BA%90%E6%A1%86%E6%9E%B6%E5%88%B0CocoaPods%E5%85%A5%E5%9D%91%E6%8C%87%E5%8D%97/)文章中提到了一种创建方式
  - 但是上述提到的创建方式, 需要手动创建`podspec`文件
  - 需要手动进行git管理, 不能测试, 需要手动添加测试工程
- 执行`pod repo add TitanSpec http://xxxx`命令, 可创建一个新的本地索引库
- 创建远程索引库, [码市](https://coding.net/)
- 除图中红色箭头外, 其他地方不需要填写, 新建即可


![CreateSpec](http://upload-images.jianshu.io/upload_images/4122543-7cf6d111ae63b9f5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### 创建远程私有库

- `pod lib create xxx`
- 规范创建私有库, 执行上述命令, 可同时创建`spec`文件和测试工程等
- 根据提示创建不同的配置文件即可, 创建完成后, 将需要添加的私有库文件放到`xxx/xxx/Classes`文件夹下即可, 默认创建的.m文件可删除
- 最后需要打开`Example`目录下的测试工程, 并执行`pod install`命令, 将你的私有库文件安装到测试工程
- 最后修改`xxx`文件下的`xxx.podspec`文件中相关配置即可

![createLib](http://upload-images.jianshu.io/upload_images/4122543-dfc5111dd4b02a01.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


做完上述工作即可将项目所有文件提交到远程私有库了


```objc
// 将本地代码加入本地仓库里
git add .

// 提交修改到本地仓库
git commit -m '你的修改记录'

// 查看当前的远程连接
git remote
// 添加名称为origin的远程连接
git remote add origin '你的github项目地址'

// 在push之前, 查看spec是否配置有问题
// 验证本地spec文件是否有误
pod lib lint
// 验证远程spec文件是否有误
pod spec lint

// 推送master分支的代码到名称为origin的远程仓库
git push origin master
```


- 正常情况下本地验证一般没问题, 远程验证正常情况下会有问题
- 本地验证不会验证`s.source`后面的`tag`
- 远程验证会验证`tag`, 而至此我们的`tag`还没有设置, 所以验证不会通过, 需要打标签
- 设置好`tag`, 再次验证应该就是没问题的了


```objc
// 查看当前的tag值
git tag

// 设置tag值
git tag "0.0.1"  

// 上传提交tag
git push --tags


// 删除标签相关命令
// 先删除本地再删除远程标签, 删除后需要重新打标签
// 删除本地标签
git tag -d 0.0.1

// 删除远程标签
git push origin :0.0.1

```


### 提交私有的SpecRepo

向私有的`SpecRepo`中提交`podspec`: 

```
pod repo push SpecName XXX.podspec
```

<div class="note warning"><p>注意点</p></div>

- 提交`podspec`的过程中会有验证, 最好在提交之前先验证`spec`文件的配置是有问题`pod lib lint`
  - 警告可以使用`--allow-warings`忽略
  - 但是涉及到的错误信息一定要解决
- 提交过程中, 会提交信息到远程私有索引库


### 使用私有库

- 检索私有库: `pod search XXX`
  - 如果检索不到, 可以先到私有索引库内, 看看是否存在私有库
  - 如果存在还是检索不到, 则直接删除私有库索引文件, 重新配置
- 在`Podfile`文件中, 同事使用私有库和第三方库是需要指定对应的`source`源
- `pod repo`命令执行后的结果


```objc
master
- Type: git (master)
- URL:  'https://github.com/CocoaPods/Specs.git'
- Path: /Users/xxx/.cocoapods/repos/master

TitanFMSpec
- Type: git (master)
- URL:  'https://git.coding.net/CoderTitan/TitanFMSpec.git'
- Path: /Users/xxx/.cocoapods/repos/TitanFMSpec
```


`Podfile`文件中配置信息

```objc
// 远程私有库
source 'https://git.coding.net/CoderTitan/TitanFMSpec.git'
// 官方仓库
source 'https://github.com/CocoaPods/Specs.git'

platform :ios, '8.0'

target 'TitanjunFM' do
  use_frameworks!

pod 'TitanFMBase'
pod 'MJExtension'

end
```


## 更新私有库

### 更新远程私有库

1. 修改`xxx/xxx/Classes`文件夹下对应的库文件
2. 更新测试工程的`Pod`库文件: `pod update --no-repo-update`
3. 更新`xxx.podspec`文件的配置信息, 版本号一定要改
4. 提交代码到远程仓库: `git push origin master`
5. 更新`tag`标签: `git push --tags`
6. 更新远程和本地的私有索引库: `pod repo push SpecName XXX.podspec`


### 私有库依赖

#### 初步设计方案
- 在设计私有库的过程中难免可能会涉及到使用其他第三方库的情况, 又该如何解决这种问题
- 添加组件依赖: 在`podspec`文件配置中, 添加如下依赖代码

```objc
s.dependency 'AFNetworking'
s.dependency 'SDWebImage'
```

- 注意依赖, 以及框架头文件中, 不要直接导入依赖框架的头文件
- 也就是说, 上述涉及到的所依赖的第三方库, 在项目的`Podfile`文件中, 不会再导入该类库


#### 优化方案

> 上述方案存在的问题: 假如另外一个业务线, 仅仅需要依赖一些基础配置, 但是, 如果把整个库作为依赖, 便会导入一些不用的冗余代码


- 这样, 我们现在终端执行`pod search AFNetworking`, 看一下`AFNetworking`的搜索结果
- 会看到`Subspecs`中, 将`AFNetworking`分成了几个不同的部分, 这样我们就可以根据不同的功能需求导入不同部分的代码即可, 防止代码冗余


```
-> AFNetworking (3.2.1)
   A delightful iOS and OS X networking framework.
   pod 'AFNetworking', '~> 3.2.1'
   - Homepage: https://github.com/AFNetworking/AFNetworking
   - Source:   https://github.com/AFNetworking/AFNetworking.git
   - Versions: 3.2.1, ......,0.5.1 [master repo]
   - Subspecs:
     - AFNetworking/Serialization (3.2.1)
     - AFNetworking/Security (3.2.1)
     - AFNetworking/Reachability (3.2.1)
     - AFNetworking/NSURLSession (3.2.1)
     - AFNetworking/UIKit (3.2.1)
```


> 为解决将私有库中的代码分成不同的功能模块, 使用`subspec`语法配置`podspec`文件, 如下:


```objc
//格式:
s.subspec 'XXX' do |x|
    //需要导入的所有文件的相对路径
    x.source_files = '相对路径/**/*'
    //需要导入的.h头文件的相对路径
    x.public_header_files = '相对路径/**/*.h'
    //需要导入的资源文件的相对路径
    x.resource = "相对路径/**/*.{bundle,nib,xib}"
    //所依赖的其他的库
    x.dependency 'AFNetworking', '~> 1.0.0'
end

//示例:
s.subspec 'Network' do |n|
    n.source_files = 'XMGFMBase/Classes/Network/**/*'
    n.dependency 'AFNetworking'
end
```

- 将原来的`s.source_files`改成上述语法即可
- 外部使用时只需导入`pod 'AFNetworking/Reachability'`即可


## 私有库的资源引用

### `xib&storyboard`
- 所有私有库中的`xib`必须动态获取
- 私有库中引用图片资源或者`Xib`资源时, 又该如何引用呢?
- 都知道项目中引用`Xib`时, 通常方式是`[[NSBundle mainBundle] load]`方式, 但是这种方式在私有库中显然不适用
- 在私有库中加载私有库中的`XIb`, 使用方法`[NSBundle bundleForClass:self]`动态获取, 具体看一下


```objc
// MiddleView.m
    
NSBundle *mainBundle = [NSBundle mainBundle];
NSBundle *bundle = [NSBundle bundleForClass:self];
    
MiddleView *middleView = [[bundle loadNibNamed:@"MiddleView" owner:nil options:nil] firstObject];

// 打印一下上述两个bundle如下:
// mainBundle:
NSBundle </Users/xxx/Library/Developer/CoreSimulator/Devices/6B74958F-560F-4BF4-9BDF-9AD789379FC9/data/Containers/Bundle/Application/FC9747F0-8A82-4643-AC7E-BDC268190B8D/TitanFM.app>
// bundle:
NSBundle </Users/xxx/Library/Developer/CoreSimulator/Devices/6B74958F-560F-4BF4-9BDF-9AD789379FC9/data/Containers/Bundle/Application/FC9747F0-8A82-4643-AC7E-BDC268190B8D/TitanFM.app/Frameworks/TitanFMMain.framework>
```

- 从上述信息中可以看到, 项目中正常的`Xib`等资源文件是放在`TitanFM.app`中的
- 而私有库的`Xib`等资源文件是放在`TitanFM.app/Frameworks/TitanFMMain.framework`文件目录下的, 所以私有库中的资源文件加载, 要到对应的文件目录下
- 具体也可以到`TitanFM.app`中查看, 找到对应的`app`文件, 显示包内容, 即可层级查看


### 图片资源

#### 图片存放问题
- 正常项目中, 我们的图片一般都会放在类似后缀`.xcassets`的文件中
- 在设计私有库时, 在`Classes`的同级目录中会默认创建一个`Assets`的文件夹, 用于存放图片等资源
- 在`podspec`文件中, 同样修改加载文件资源的配置, 如下:

```objc
s.resource_bundles = {
   'MainMoudle' => ['MainMoudle/Assets/*']
}
```

> 修改完配置信息和图片记得执行`pod install`把资源文件导入到项目中


#### 私有库图片的使用

在`xib`中加载图片, 需要在图片前面加上组件的主`bundle`, 类似: `MainMoudle.bundle/tabbat_back`

![xibimage](http://upload-images.jianshu.io/upload_images/4122543-5602c779a1e54291.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


私有库中使用代码加载图片, 一定不能使用`imageNamed`方法

```objc
//1. 获取当前的bundleName
NSBundle *currentBundle = [NSBundle bundleForClass:[self class]];

//2. 根据图片名称, 在bundle中检索图片路径
NSString *path = [currentBundle pathForResource:@"tabbar_np_play@2x.png" ofType:nil inDirectory:@"MainMoudle.bundle"];

//获取图片
UIImage *image = [UIImage imageWithContentsOfFile:path];
```

<div class="note warning"><p>引用图片需要注意的的是</p></div>

- 图片引用过程中不会自动选择`@2x和@3x`的图片, 所以必须手动指定具体的图片名称包括图片后缀名
- 获取路径的方法`pathForResource`, 也要必须指明图片所在的`bundle`路径, 即`inDirectory`参数不可为空


<div class="note info"><p>提交本地的私有库索引</p></div>

- 当你的私有库中引用了其他的私有库框架, 比如`MainMoudle`中引用了`TitanFMBase/Category`部分
- 则切记不要进行本地和远程的`spec`验证, 否则可能回报错, 原因只是因为`spec`中默认的依赖库是共有的索引库, 私有库无法检索到, 错误信息如下图
- 提交本地索引的过程中遇到类似错误则可以, 直接忽略提交即可, 但是其他的错误信息, 切记需要修改好, 警告可以忽略, 但是错误信息不能忽略(依赖私有库的问题除外)


```objc
// 提交本地私有索引库需要忽略警告的命令
pod repo push TitanjunSpec MainMoudle.podspec --allow-warnings
```


![podspec](http://upload-images.jianshu.io/upload_images/4122543-aa9b20f9428c9fd8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### 相关参考
- [iOS组件化参考文章](http://www.cocoachina.com/ios/20180312/22536.html)


---




