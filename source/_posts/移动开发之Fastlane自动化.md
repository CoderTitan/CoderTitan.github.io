---
title: 移动开发之Fastlane自动化
tags:
  - fastlane
categories: 组件化开发
abbrlink: d1078e95
date: 2018-09-10 13:36:20
image:
---



![fastlane_text](https://titanjun.oss-cn-hangzhou.aliyuncs.com/ios/fastlanetext.jpg?x-oss-process=style/titanjun)

<!--more-->


- 在组件化开发过程中, 提交一个私有库需要执行很多操作和命令, 详情可参考[iOS组件化之私有库](https://www.titanjun.top/2018/08/29/iOS%E7%BB%84%E4%BB%B6%E5%8C%96%E4%B9%8B%E7%A7%81%E6%9C%89%E5%BA%93/)
- 然而开发和更新私有库的大量操作却都是重复性的: 修改`spec`文件, 提交到远程仓库, 打标签等
- 所以有没有什么办法可以自动执行, 实现自动化管理呢?
- 何为自动化: 自动化就是通过一条简单的命令, 去执行一组固定的操作
  - 自动创建和维护`iOS`代码签名证书
  - 自动创建和打包`iOS`的`APP`
  - 上传屏幕截图、元数据和`App`到`APP`商店审核
  - .......
  
## `FastLane`介绍

### 简介
- [Fastlane官网](https://fastlane.tools/), 
- 用于配置`iOS`和`Android`的持续集成的神器
- `Fastlane`是一套工具，帮助你简化和自动化 App 发布或部署的过程，将之变成一条平直的工作流
- `Fastlane`是用`Ruby`语言编写的一套自动化工具集和框架，每一个工具实际都对应一个`Ruby`脚本，用来执行某一个特定的任务
- `Fastlane`核心框架则允许使用者通过类似配置文件的形式，将不同的工具有机而灵活的结合在一起，从而形成一个个完整的自动化流程
- `Fastlane`是一个ruby脚本集合，它可以按照我们指定的路线，在指定位置执行我们所要执行的操作。这里我们称这样的路线为「航道(lane)」，这样的操作称为`Action`
- 到目前为止，`Fastlane`的工具集大约包含170多个小工具，基本上涵盖了打包，签名，测试，部署，发布，库管理等等移动开发中涉及到的内容, 工具的描述和使用可参考: [Action官方文档](https://docs.fastlane.tools/actions/)和[Github源码](https://github.com/fastlane/fastlane/tree/master/fastlane/lib/fastlane/actions)
- 如果这些工具仍然没有符合你需求的，没有关系，得益于Fastlane本身强大的Action和Plugin机制，如果你恰好懂一些Ruby开发的话，可以很轻易的编写出自己想要的工具



### 安装

1. 确保ruby为最新版本


```
brew update
brew install ruby
```

2. 安装`fastlane`

```
sudo gem install -n /usr/local/bin fastlane
```

3. `fastlane`相关操作命令

```objc
// 查看当前fastlane版本
fastlane --version

// 查看所有action
fastlane actions

// fastlane初始化
fastlane init
```

4. 如果出现类似的错误, 则可能是`ruby`源问题, 可更换`ruby`源后重新安装

```
ERROR:  Could not find a valid gem 'fastlane' (>= 0), here is why:
          Unable to download data from https://gems.ruby-china.org/ - bad response Not Found 404 (https://gems.ruby-china.org/specs.4.8.gz)
```

<div class="note info"><p>更换`ruby`源</p></div>

```objc
// 官方https://gems.ruby-china.com/把org改成了com, 使用时注意替换
// 查看gem源
gem sources

// 删除默认的gem源
gem sources --remove https://gems.ruby-china.org/

// 增加gem源
gem sources -a https://gems.ruby-china.com/

// 查看当前的gem源
gem sources

// 清空源缓存
gem sources -c

// 更新源缓存
gem sources -u
```


## `fastlane`提交私有库

### 初始化`fastlane`

cd 到当前目录, 执行`fastlane init`命令

但是对于提交私有库来说这个过程会创建一些无用的文件, 包括双穿需要的`appleID`等, 有雨我们不涉及这些, 所以我们还可以直接创建所需文件

```objc
cd 根目录

// 创建一个fastlane文件夹
mkdir fastlane

// 进入fastlane目录
cd xxx/xxx/fastlane

// 创建一个Fastfile文件
touch Fastfile
```

接下来就是编写`Fastfile`文件内容


### 配置Fastfile`文件

#### 语法解析
`fastlane init`创建好文件后, 打开`Fastfile`文件, 默认内容如下

```ruby
default_platform(:ios)

platform :ios do
  desc "Description of what the lane does"
  lane :custom_lane do
    # add actions here: https://docs.fastlane.tools/actions
  end
end
```

- `platform`: 使用的平台
- `desc`: 描述航道的作用
- `lane`: 命名航道名称和相关`Action`
  - `custom_lane`: 即为航道名称, 可自定义
  - 如需外界传递参数, 可在do后面添加`|options|`
- 接受外界传递参数, 在添加`options`后, 可定义如下参数

```
tagName = options[:tag]
```

外部使用命令是, 即可通过`xxx tag: 0.0.1`进行传值


<div class="note warning"><p>`Fastfile`文件</p></div>

- `Fastfile`文件的作用就是把正常使用的命令转成`fastlane`的语法, 并在该文件中执行, 可在[官方文档](https://docs.fastlane.tools/actions/)中查找对应的语法
- 以==提交私有库到远程==为例, 就是把所有相关命令, 找到对应的`fastlane`命令写在`Fastfile`文件中执行


#### `Fastfile`文件配置

提交私有库时, 需要执行的命令如下

```objc
// 将本地库更像到测试项目
pod install

// 将本地代码加入本地仓库里
git add .

// 提交修改到本地仓库
git commit -m '你的修改记录'

// 添加名称为origin的远程连接
git remote add origin '你的github项目地址'

// 在push之前, 查看spec是否配置有问题
// 验证本地spec文件是否有误
pod lib lint

// 推送master分支的代码到名称为origin的远程仓库
git push origin master

// 设置tag值
git tag "0.0.1"  

// 上传提交tag
git push --tags
```

- 打开[官方文档](https://docs.fastlane.tools/actions/)搜索
- 例如: 搜索`pod install`, 对应的即为`cocoapods`, 如下

![fastlanepod](https://titanjun.oss-cn-hangzhou.aliyuncs.com/ios/fastlanepod.jpg?x-oss-process=style/titanjun)


`Fastfile`文件配置内容如下, 可做响应的参考

```ruby
default_platform(:ios)

platform :ios do
  desc "用于对私有库的升级维护和提交"
  lane :DownloadLane do |options|

    # 0. 需要外界传入的参数
    tagName = options[:tag]
	targetName = options[:target]


  	# 1. 将本地库更像到测试项目
	# pod install
	cocoapods(
  		clean: true,
  		# 该目录为执行Podfile未见的相对路径
  		podfile: "./Example/Podfile"
	)

	# 2. 将本地代码加入本地仓库里
	# git add .
	# path为需要提交的文件的路径, 这里是所有文件
	git_add(path: ".")

	# 3. 提交修改到本地仓库
	# git commit -m '你的修改记录'
	# message: 提交信息
	git_commit(path: ".", message: "这里是提交信息")

	# 4. 在push之前, 查看spec是否配置有问题
	#  验证本地spec文件是否有误
	# pod lib lint
	# allow_warnings: 允许警告的存在
	pod_lib_lint(allow_warnings: true)

	# 5. 推送master分支的代码到名称为origin的远程仓库
	# git push origin master
	push_to_git_remote  # 更多的信息可查看官网

    # 6. 判断标签是否存在, 重复添加标签会报错
	# if-else-end和if-end判断语句
	if git_tag_exists(tag: tagName)
		# UI.message: 打印信息
    	UI.message("发现tag:#{tagName} 该标签已经存在")
	end

	# 7. 设置tag值
	# git tag "0.0.1"  
	add_git_tag(
		tag: tagName
	)

	# 8. 上传提交tag
	# git push --tags
	push_git_tags

	# 9. 更新索引库
	# pod repo push XXXX xxx.podspec
	pod_push(path: "#{targetName}.podspec", repo: "TitanjunSpec", allow_warnings: true)

  end
end
```

- `Fastfile`文件编写完成, 需要检测文件语法是否有误, cd 进入根目录, 执行`fastlane lanes`
- 如果没问题, 执行命令`fastlane 航道名称 参数1:值1  参数2:值2`
- 示例: `fastlane DownloadLane tag:0.1.0 target:TKDownLoad`
- 正常情况下, 私有库已经被提交到远程仓库了, 并更新了对应的索引库


## 自定义Action
- 有的时候官方提供的所有的`Action`并不能满足我们的需求, 不过`fastlane`具有很好的扩展性, 支持自定义`Action`
- 找了半天才发现一个删除远程私有库标签的命令, [官方文档](https://docs.fastlane.tools/actions/)中没有提供
- 这里我们就自定义一个删除远程私有库标签的`Action`


### 创建`ruby`文件

- 首先打开终端, cd 进入`fastlane`文件夹所在的上级目录
- 执行`fastlane new_action`命令, 创建新的`Action`, 过程中会让你输入你自定义的`Action`名字
- 注意命令规范, 单词之间可用下划线连接
 

![fastlaneaction](https://titanjun.oss-cn-hangzhou.aliyuncs.com/ios/fastlaneaction.jpg?x-oss-process=style/titanjun)


之后`fastlane`文件内会多一个`actions`的文件件, 内有`delete_tag.rb`文件, 如下


![actionsName](https://titanjun.oss-cn-hangzhou.aliyuncs.com/ios/fastlanetag.jpg?x-oss-process=style/titanjun)


- 最后就是编辑该`rb`文件, 当然可能需要懂一些`ruby`语言的语法, 如果不懂也没关系, 到[Github源码](https://github.com/fastlane/fastlane/tree/master/fastlane/lib/fastlane/actions)找一个类似功能的`rb`文件, 照葫芦画瓢吧! 


下面把我自定义的`actions`的相关代码贴出来

```ruby
module Fastlane
  module Actions
    module SharedValues
      DELETE_TAG_CUSTOM_VALUE = :DELETE_TAG_CUSTOM_VALUE
    end

    class DeleteTagAction < Action
      def self.run(params)
        # 运行该action最终需要执行的代码, 在这里写
        tagName = params[:tag]
        isRemoveLocalTag = params[:rL]
        isRemoveRemoteTag = params[:rR]
        
        # 1. 先定义一个数组, 用来存储所有需要执行的命令
        cmds = []
        
        # 2. 往数组里面, 添加相应的命令
        # 删除本地标签
        # git tag -d 标签名称
        if isRemoveLocalTag
          cmds << "git tag -d #{tagName} "
        end
      
        # 删除远程标签
        # git push origin :标签名称
        if isRemoveRemoteTag
          cmds << " git push origin :#{tagName}"
        end

        #3. 执行数组里面的所有命令
        result = Actions.sh(cmds.join('&'));
        return result

      end

      def self.description
        # 间断的说明该Action的作用是什么, 不超过80个字符
        "删除标签"
      end

      def self.details
        # 详细的描述当前的Action
        "使用该action, 可删除本地或远程标签"
      end

      def self.available_options
        # 该action需要的参数, 使用同构数组进行分割的, 可以根据每一个参数, 确定其作用
        [
          # key: 参数名称, description: 参数描述或作用, optional: 是否是可选, is_string: 是否是string类型, default_value: 默认值, verify_block: 验证的block
          FastlaneCore::ConfigItem.new(key: :tag,
                                             description: "需要被删除的标签名称",
                                             optional: false,
                                             is_string: true),
          FastlaneCore::ConfigItem.new(key: :rL,
                                       description: "是否需要删除本地标签",
                                       optional: true,
                                       is_string: false,
                                       default_value: true),
          FastlaneCore::ConfigItem.new(key: :rR,
                                       description: "是否需要删除远程标签",
                                       optional: true,
                                       is_string: false,
                                       default_value: true)
        ]
      end

      def self.output
        # 表示输出的内容
      end

      def self.return_value
        # 返回值
        nil
      end

      def self.authors
        # 作者
        ["CoderTitan"]
      end

      def self.is_supported?(platform)
        # 支持的平台
        platform == :ios
      end
    end
  end
end

```

最后需要验证`rb`文件是否格式正确, 终端输入`fastlane action delete_tag`


![fastlaneTest](https://titanjun.oss-cn-hangzhou.aliyuncs.com/ios/fastlaneTest.jpg?x-oss-process=style/titanjun)


