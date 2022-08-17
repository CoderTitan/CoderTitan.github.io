---
title: NexT主题配置个性化设置
tags:
  - Hexo
  - NexT
categories: Hexo博客
abbrlink: 9eda55ce
date: 2022-08-18 15:03:13
---


- 最近基于`NexT`主题重新搭建了自己的[个人技术博客](https://www.titanjun.top/), 现在主要是总结分享关于`NexT(8.12.2)`主题的相关配置和优化
- 我现在用的是`NexT`主题, 这是作者提供的[NexT主题中文配置](http://theme-next.iissnan.com/)


<!-- more -->



## `NexT`常规配置

### PDF 显示

`NexT`默认支持`PDF`自定义标签, 更改`NexT`主题的配置文件 `themes/next/_config.yml`，修改以下配置，详见[官方文档](https://github.com/next-theme/theme-next-pdf)

```yaml
pdf:
  enable: true
  # Default height
  height: 550px

```


使用格式为

```
{% pdf https://www.titanjun.top/test.pdf %}
```


### 首页头像

更改`NexT`主题的配置文件`themes/next/_config.yml`

```yaml
avatar:
  url: /images/avatar.png      # 头像图片
  rounded: true                # 头像显示在圆里
  rotated: true                # 鼠标焦点落在头像时，是否转动头像
```


### 菜单显示中文

在博客的根目录里，找到`_config.yml`文件，然后设置以下的配置项，需要注意，这里的字体是 `zh-CN`，而不是`zh-Hans`

```
language: zh-CN
```


### 启用文章目录

更改`NexT`主题的配置文件`themes/next/_config.yml`，设置以下内容

```yaml
toc:
  enable: true
  number: false           # 自动添加目录编号
  wrap: true              # 每行目录字数超长自动换行
  expand_all: true        # 展开所有级别
  max_depth: 5            # 目录的最大深度
```


### 设置右上角`Github`图标

主题的配置文件`themes/next/_config.yml`，设置

```yaml
github_banner:
  enable: true
  permalink: https://https://github.com/CoderTitan
  title: Follow me on GitHub
```


### 修改上下篇文章顺序

在`NexT`主题中文章底部，有上下篇文章的链接, 默认的上一篇实在右侧, 下一篇是在左侧, 有点不太符合我们的阅读习惯, 可在主题的配置文件`themes/next/_config.yml`中修改

```yaml
# Show previous post and next post in post footer if exists
# Available values: left | right | false
# left: 上一篇在右, 下一篇在左
# right: 上一篇在左, 下一篇在右
# false: 不显示
post_navigation: right
```


### 设置侧栏阅读进度百分比

主题的配置文件`themes/next/_config.yml`，设置

```yaml
back2top:
  enable: true
  # 是否显示在边栏
  sidebar: true  
  # 点击是否回到顶部
  scrollpercent: true
```

### 配置`hexo`站点的`footer`信息

- 底部`footer`可以开关显示`hexo`信息、`theme`信息、建站时间等个性化配置：
- 主题的配置文件`themes/next/_config.yml`，设置



```yaml
footer:
  since: 2018        # 建站开始时间
  icon:
    name: user       # 设置 建站初始时间和至今时间中间的图标，默认是一个'小人像'，更改user为heart可以变成一个心
    animated: true
    color: "#808080" # 更改图标的颜色，红色为'#ff0000'
  powered: true      # 开启hexo驱动
```



### 启用文章打赏

主题的配置文件`themes/next/_config.yml`，设置以下内容，`themes/next/source/images` 文件夹下，图片目录路径也可自定义

```yaml
reward_settings:
  enable: true
  animation: false
  comment: 坚持原创技术分享，您的支持将鼓励我继续创作！

reward:
  wechatpay: /images/wechatpay.png
  alipay: /images/alipay.png
```


### 添加版权声明

主题的配置文件`themes/next/_config.yml`，设置

```yaml
creative_commons:
  license: by-nc-sa       # License类型： by | by-nc | by-nc-nd | by-nc-sa | by-nd | by-sa | zero
  sidebar: false          # 在侧边栏有一个版权的图片链接
  post: true              # 在每一篇文章末尾自动增加本文作者、本文链接、版权声明信息
  language: deed.zh       # 点击链接后显示的版权信息的语言
```

### 添加标签/分类页面

主题的配置文件`themes/next/_config.yml`，设置

```yaml
menu:
  home: / || fa fa-home
  archives: /archives/ || fa fa-archive
  categories: /categories/ || fa fa-th
  tags: /tags/ || fa fa-tags
  about: /about/ || fa fa-user
  #schedule: /schedule/ || fa fa-calendar
  #commonweal: /404/ || fa fa-heartbeat
  # search: /search/ || fa fa-globe

# Enable / Disable menu icons / item badges.
menu_settings:
  # 是否显示各个页面的图标
  icons: true
  # 是否显示分类/标签/归档页的内容量
  badges: true
```


通过`Hexo`创建一个标签/分类/关于页面

```yaml
# 进入博客的根目录
$ cd blog

# 创建标签页
$ hexo new page "about"
$ hexo new page "tags"
$ hexo new page "categories"

```

以上命令执行完毕后，在根目录`source`文件夹下会多了如下文件

- `tags/index.md`
- `categories\index.md`
- `about\index.md`

在对应的文件下分别添加对应内容, 必须使用`---`包裹配置内容，否则配置无效

```yaml
# tags/index.md
---
title: 关于
type: "about"
---

# about\index.md
---
title: 标签
type: "tags"
---

# categories\index.md
---
title: 分类
type: "categories"
---
```


### 启用不蒜子统计

主题的配置文件`themes/next/_config.yml`，设置

``` yaml
# Show Views / Visitors of the website / page with busuanzi.
# For more information: http://ibruce.info/2015/04/04/busuanzi/
busuanzi_count:
  enable: true
  total_visitors: true
  total_visitors_icon: fa fa-user
  total_views: true
  total_views_icon: fa fa-eye
  post_views: true
  post_views_icon: far fa-eye
```


### 修改网站底部图标

主题的配置文件`themes/next/_config.yml`，设置

```yaml
icon:
    name: fa fa-heart 
    animated: true 
    color: "#ff0000"
```


### 网站底部添加备案信息

主题的配置文件`themes/next/_config.yml`，设置

```yaml
beian:
  enable: true
  icp: '备案号'
```


### 文章评分功能

`NexT`主题中已经集成了`widgetpack` 的星级评分系统，用户无须再安装或引入插件脚本，只需在 [widgetpack](https://widgetpack.com/)中注册账号并修改主题配置即可

```yaml
# Star rating support to each article.
# To get your ID visit https://widgetpack.com
rating:
  enable: true
  id: #<app_id>
  color: #f79533
```

在控制台中点击左上角展开菜单，在`Rating` -> `Setting`中将 `Vote via`选项改为`Device(cookie)`以开启匿名评分，该选项将基于设备认证访问者身份，如果不开启这个选项，那么就需要登录才能评分




## `NexT`高级配置

### 添加站内搜索

`NexT`主题默认支持使用 [Hexo-Generator-Searchdb](https://github.com/theme-next/hexo-generator-searchdb) 插件来实现本地搜索

```yaml
# 进入博客的根目录
cd blog_rooot

# 安装搜索插件
npm install hexo-generator-searchdb --save
```


根目录配置文件`/_config.yml`，设置

```yaml
search:
  path: search.xml
  field: post
  content: true
  format: html
  limit: 100
```


主题的配置文件`themes/next/_config.yml`，设置

```yaml
local_search:
  enable: true
  # auto /  manual，auto 自动搜索、manual：按回车[enter ]键手动搜索
  trigger: auto
  top_n_per_article: 1
  unescape: false
  preload: false

```

### 添加RSS

`NexT`主题默认支持`RSS`订阅, 安装插件[hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed)

```yaml
# 进入博客的根目录
cd blog_rooot

# 安装RSS插件
npm install hexo-generator-feed --save
```


根目录配置文件`/_config.yml`，设置

```yaml
feed:
  enable: true
  type: atom
  path: atom.xml
  limit: 20
  hub:
  content:
  content_limit: 140
  content_limit_delim: ' '
  order_by: -date
  icon: icon.png
  autodiscovery: true
  template:
```


主题的配置文件`themes/next/_config.yml`，设置

```yaml
social:
  RSS: /atom.xml || fa fa-rss
```

### 设置博客文章永久链接

- `hexo`的默认永久链接是在`_config.yml`里配置的，其生成默认规则是`permalink: :year/:month/:day/:title/`，是按照年、月、日、标题来生成的。
- 这种默认配置有个很不能接受的缺点，当文件名为中文时，会导致`url`链接中也出现中文, 复制后的链接会编码，非常不利于阅读，也不简洁。
- [hexo-abbrlink](https://github.com/rozbo/hexo-abbrlink)支持使用不同的算法和进制生成文章的永久链接


```yaml
# 进入博客的根目录
cd blog_rooot

# 安装abbrlink插件
npm install hexo-abbrlink --save
```


根目录配置文件`/_config.yml`，设置

```yaml
#文章的永久链接, 如：http://localhost:4000/post/abaf7e89.html
permalink: post/:abbrlink.html
abbrlink:
  alg: crc32  # 算法：crc16(default) and crc32
  rep: hex    # 进制：dec(default) and hex
```


生成的链接将会是这样的(官方样例)：

| 算法 | 进制 | 生成链接样例 |
| --- | --- | --- |
| crc16 | hex | https://post.zz173.com/posts/66c8.html |
| crc16 | dec | https://post.zz173.com/posts/65535.html |
| crc32 | hex | https://post.zz173.com/posts/8ddf18fb.html |
| crc32 | dec | https://post.zz173.com/posts/1690090958.html |



安装完成后, 执行`hexo clean & hexo g & hexo s`查看效果


### 字数与阅读时长统计

`NexT`主题默认支持使用 [hexo-symbols-count-time](https://github.com/theme-next/hexo-symbols-count-time) 插件来统计文章字数和阅读时长


```yaml
# 进入博客的根目录
cd blog_rooot

# 安装hexo-symbols-count-time插件
npm install hexo-symbols-count-time --save
```


根目录配置文件`/_config.yml`，设置

```yaml
symbols_count_time:
  time: true                   # 文章阅读时长
  symbols: true                # 文章字数统计
  total_time: true             # 站点总阅读时长
  total_symbols: true          # 站点总字数统计
  exclude_codeblock: true      # 排除代码字数统计
```

主题的配置文件`themes/next/_config.yml`，设置

```yaml
symbols_count_time:
  separated_meta: false         # 是否另起一行显示（即不和发表时间等同一行显示）
  item_text_post: true          # 首页文章统计数量前是否显示文字描述（本文字数、阅读时长）
  item_text_total: false        # 页面底部统计数量前是否显示文字描述（站点总字数、站点阅读时长）
```


### 添加标签云

[hexo-tag-cloud](https://github.com/D0n9X1n/hexo-tag-cloud)标签云插件

```yaml
# 进入博客的根目录
cd blog_rooot

# 安装hexo-tag-cloud插件
npm install hexo-tag-cloud --save
```

根目录配置文件`/_config.yml`，设置

```yaml
# hexo-tag-cloud
tag_cloud:
  textFont: Trebuchet MS, Helvetica
  textColor: '#333'
  textHeight: 16
  outlineColor: '#E2E1D1'
  maxSpeed: 0.3
  pauseOnSelected: false # true 意味着当选中对应 tag 时,停止转动
```

更改 `NexT` 主题的源文件 `themes/next/layout/_macro/sidebar.njk`, 然后在最后添加如下内容

```
{% if site.tags.length > 1 %}
<script type="text/javascript" charset="utf-8" src="/js/tagcloud.js"></script>
<script type="text/javascript" charset="utf-8" src="/js/tagcanvas.js"></script>
<div class="widget-wrap">
    <h3 class="widget-title">标签云</h3>
    <div id="myCanvasContainer" class="widget tagcloud">
        <canvas width="250" height="250" id="resCanvas" style="width=100%">
            {{ list_tags() }}
        </canvas>
    </div>
</div>
{% endif %}
```

- 完成安装和显示，可以通过 `hexo clean && hexo g && hexo s` 来进行本地预览, `hexo clean` 为必须选项。
- PS:不要使用 `hexo g -d` 或者 `hexo d -g` 这类组合命令


### 添加豆瓣个人主页

[hexo-douban](https://github.com/mythsman/hexo-douban)插件支持在 `Hexo` 页面中嵌入豆瓣个人主页

```yaml
# 进入博客的根目录
cd blog_rooot

# 安装
npm install hexo-douban --save
```

根目录配置文件`/_config.yml`，设置

```yaml
douban:
  user: mythsman
  builtin: false
  book:
    title: 'This is my book title'
    quote: 'This is my book quote'
  movie:
    title: 'This is my movie title'
    quote: 'This is my movie quote'
  game:
    title: 'This is my game title'
    quote: 'This is my game quote'
  timeout: 10000 
```

- user: 你的豆瓣ID.打开豆瓣，登入账户，然后在右上角点击 "个人主页" ，这时候地址栏的URL大概是这样："https://www.douban.com/people/xxxxxx/" ，其中的"xxxxxx"就是你的个人ID了。
- builtin: 是否将生成页面的功能嵌入hexo s和hexo g中，默认是false,另一可选项为true(1.x.x版本新增配置项)。
- title: 该页面的标题.
- quote: 写在页面开头的一段话,支持html语法.
- timeout: 爬取数据的超时时间，默认是 10000ms ,如果在使用时发现报了超时的错(ETIMEOUT)可以把这个数据设置的大一点。
- 如果只想显示某一个页面(比如movie)，那就把其他的配置项注释掉即可。

### 启用sitemap功能

为了让博文被`google`或百度检索，需要使用`hexo`的`sitemap`功能

```yaml
# 进入博客的根目录
cd blog_rooot

# 安装
npm install hexo-generator-sitemap --save
npm install hexo-generator-baidu-sitemap --save
```

修改主题的配置文件`themes/next/_config.yml`

```yaml
menu:
  sitemap: /sitemap.xml || fa fa-sitemap
```

- 执行`hexo clean & hexo g`命令后即可访问站点地图
- 在`public`的静态文件根目录中会多出一个`sitemap.xml`文件，表示谷歌检索的`sitemap`安装成功


## `NexT`进阶设置


### 启用`Canvas Ribbon`背景

`NexT`主题默认支持`Canvas Ribbon`背景，官方配置教程可以看[这里](https://github.com/theme-next/theme-next-canvas-ribbon)，前提是需要下载指定的静态资源文件或者使用`CDN`静态资源文件

```
# 进入Next主题的目录
cd themes/next

# # 下载Canvas资源文件
git clone https://github.com/theme-next/theme-next-canvas-ribbon source/lib/canvas-ribbon
```

或者更改主题的配置文件`themes/next/_config.yml`，通过以下配置内容来指定`CDN`静态资源文件的`URL`

```yaml
vendors:
  canvas_ribbon: //cdn.jsdelivr.net/gh/theme-next/theme-next-canvas-ribbon@1/canvas-ribbon.js
```

主题的配置文件`themes/next/_config.yml`，设置

```yaml
canvas_ribbon:
  enable: true
  size: 300           # Ribbon的宽度
  alpha: 0.6          # Ribbon的透明度
  zIndex: -1          # Ribbon的显示级别
```


### 启用背景`3D`动画

`NexT`主题默认支持背景`3D`动画，官方配置教程可以看[这里](https://github.com/theme-next/theme-next-three)，前提是需要下载指定的静态资源文件或者使用`CDN`静态资源文件

```
# 进入Next主题的目录
cd themes/next

# 下载3D资源文件
git clone https://github.com/theme-next/theme-next-three source/lib/three
```

或者更改主题的配置文件`themes/next/_config.yml`，通过以下配置内容来指定`CDN`静态资源文件的`URL`

```yaml
vendors:
  three: //cdn.jsdelivr.net/gh/theme-next/theme-next-three@1/three.min.js
  three_waves: //cdn.jsdelivr.net/gh/theme-next/theme-next-three@latest/three-waves.min.js
  canvas_lines: //cdn.jsdelivr.net/gh/theme-next/theme-next-three@latest/canvas_lines.min.js
  canvas_sphere: //cdn.jsdelivr.net/gh/theme-next/theme-next-three@latest/canvas_sphere.min.js

```

主题的配置文件`themes/next/_config.yml`，设置

```yaml
three:
  enable: true
  three_waves: true           # 背景3D动画样式一
  canvas_lines: false         # 背景3D动画样式二
  canvas_sphere: false        # 背景3D动画样式三
```

### 启用`Pjax`

`Pjax`主要用于加速`Web`页面的切换速度，同时也可以用来解决`Aplayer`音频播发器切换页面后播放出现中断的问题

```
# 进入Next主题的目录
cd themes/next

# 下载资源文件
git clone https://github.com/theme-next/theme-next-pjax source/lib/pjax
```

主题的配置文件`themes/next/_config.yml`，设置

```
pjax: true
```


### 添加顶部加载进度条

```
# 进入Next主题的目录
cd themes/next

# 下载资源文件
git clone https://github.com/theme-next/theme-next-pace source/lib/pace
```

主题的配置文件`themes/next/_config.yml`，设置

```
pace:
  enable: true
  theme: minimal
```


### 添加页面顶部阅读进度条

```
# 进入Next主题的目录
cd themes/next

# 下载资源文件
git clone https://github.com/theme-next/theme-next-reading-progress source/lib/reading_progress
```

主题的配置文件`themes/next/_config.yml`，设置

```
reading_progress:
  enable: true
  position: top               # 进度条的位置：top | bottom
  color: "#37c6c0"            # 进度条的颜色
  height: 3px                 # 进度条的大小
```




## CSS样式修改

### 设置背景图片和透明度

主题的配置文件`themes/next/_config.yml`，设置

```yaml
custom_file_path:
  style: source/_data/styles.styl
```

在博客根目录下的`source`文件夹下新建`_data`文件夹并添加`styles.styl`文件

```css
// 添加背景图片
body {
  // 图片需放在根目录/source/images/background.jpg
  background: url(/images/background.jpg);//自己喜欢的图片地址
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: 50% 50%;
}

//博客内容透明化
//文章内容的透明度设置
.main-inner {
  opacity: 0.98;
}

//侧边框的透明度设置
.sidebar {
  opacity: 0.95;
}

//菜单栏的透明度设置
.header-inner {
  opacity: 0.95;
}

//搜索框（local-search）的透明度设置
.popup {
  opacity: 0.95;
}
```



### 设置页脚文字样式

在上述新添加的`source/_data/styles.styl`文件内添加如下代码

```css
//页脚文字
.footer, .footer a, .footer .with-love {
  color: #fff
}
```


### 鼠标点击特效

鼠标点击特效常用的有礼花特效、爆炸特效、浮出爱心、浮出文字，可以点击下方按钮下载对应的`js`文件, 并保存在`themes\next\source\js\cursor\` 目录下

{% btn https://titanjun.oss-cn-hangzhou.aliyuncs.com/hexo-next/finder/fireworks.js, 礼花特效, download fa-lg fa-fw %}

{% btn https://titanjun.oss-cn-hangzhou.aliyuncs.com/hexo-next/finder/explosion.js, 爆炸特效, download fa-lg fa-fw %}

{% btn https://titanjun.oss-cn-hangzhou.aliyuncs.com/hexo-next/finder/clicklove.js, 浮出爱心, download fa-lg fa-fw %}

{% btn https://titanjun.oss-cn-hangzhou.aliyuncs.com/hexo-next/finder/clicktext.js, 浮出文字, download fa-lg fa-fw %}


新建一个自定义样式文件`themes\next\layout\_custom\custom.njk` , 添加如下代码

```njk
{# 鼠标点击特效 #}
{% if theme.cursor_effect == "fireworks" %}
  <script async src="/js/cursor/fireworks.js"></script>
{% elseif theme.cursor_effect == "explosion" %}
  <canvas class="fireworks" style="position: fixed;left: 0;top: 0;z-index: 1; pointer-events: none;" ></canvas>
  <script src="//cdn.bootcss.com/animejs/2.2.0/anime.min.js"></script>
  <script async src="/js/cursor/explosion.min.js"></script>
{% elseif theme.cursor_effect == "love" %}
  <script async src="/js/cursor/love.min.js"></script>
{% elseif theme.cursor_effect == "text" %}
  <script async src="/js/cursor/text.js"></script>
{% endif %}
```


将新建的`custom.njk`引入到`themes\next\layout\_layout.njk`文件代码中

```
    ....
  <!-- 页面点击效果 -->
  {% include '_custom/custom.njk' %}

</body>
</html>
```

最后在主题配置文件中添加以下代码
```yaml
# mouse click effect: fireworks | explosion | love | text
cursor_effect: fireworks
```


### 站点运行时间设置

在`thems/next/layout/_partials/footer.njk`文件内, 搜索`theme.footer.powered`, 在此之前添加如下代码


```

<!-- 网站运行时间的设置 -->
<span id="timeDate">载入天数...</span>
<script>
    var now = new Date();
    function createtime() {
        var grt= new Date("07/01/2016 09:00:00");//此处修改你的建站时间或者网站上线时间
        now.setTime(now.getTime()+250);
        days = (now - grt ) / 1000 / 60 / 60 / 24; dnum = Math.floor(days);
        hours = (now - grt ) / 1000 / 60 / 60 - (24 * dnum); hnum = Math.floor(hours);
        if(String(hnum).length ==1 ){hnum = "0" + hnum;} minutes = (now - grt ) / 1000 /60 - (24 * 60 * dnum) - (60 * hnum);
        mnum = Math.floor(minutes); if(String(mnum).length ==1 ){mnum = "0" + mnum;}
        seconds = (now - grt ) / 1000 - (24 * 60 * 60 * dnum) - (60 * 60 * hnum) - (60 * mnum);
        snum = Math.round(seconds); if(String(snum).length ==1 ){snum = "0" + snum;}
        document.getElementById("timeDate").innerHTML = "本站已安全运行 "+dnum+" 天 "+hnum + " 小时 " + mnum + " 分 " + snum + " 秒";
    }
    setInterval("createtime()",250);
</script>

```


### 点击头像回到首页

修改侧边栏模板代码`thems/next/layout/_partials/site-overview.njk`

```
  {%- if theme.avatar.url %}
+    <a href="/">
        <img class="site-author-image" itemprop="image" alt="{{ author }}"
          src="{{ url_for(theme.avatar.url) }}">
+    </a>
  {%- endif %}
```


### 文章尾部添加本文结束标记


在主题的配置文件`themes/next/_config.yml`中设置

```yaml
custom_file_path:
  postBodyEnd: source/_data/post-body-end.njk
```

在博客根目录下的`source`文件夹下新建`_data`文件夹并添加`post-body-end.njk`文件, 并在文件中添加一下内容

```html

<div>
  <div style="text-align:center;color: #ccc;font-size:18px;">------------- 本文结束啦<i class="fa fa-paw"></i>感谢您的阅读 -------------</div>	
</div>
```





## 参考文章
- [hexo的next主题个性化配置教程](https://www.techgrow.cn/)
- [打造个性超赞博客Hexo+NexT+GithubPages的超深度优化](https://reuixiy.github.io/)
- [Hexo 优化 --- 支持邮件通知的评论 Valine 增强版](http://www.zhaojun.im/hexo-valine-modify/)


---
