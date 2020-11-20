/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/404.html","d42a6f182eb0c210e0d3654a8b07f8ea"],["/CSS基础知识总结.html","ed880e4634c757fcd1f16f736aef8e8c"],["/Flutter中App的主题和导航.html","5307ac7015faa92566ea0416217b078b"],["/Flutter中Widget的生命周期和渲染原理.html","196094cffdafc716db44ec6c1d6a3ecb"],["/Flutter之可滑动Widget.html","71cb6f2d6795894f7407a451216a1abe"],["/Flutter之基础Widget.html","050b0ae94e5755f6e85430d7eaa345be"],["/Flutter之基础Widget之TextField.html","9e266ff66d2720d415c9e0e64a5b1c5d"],["/Flutter之容器类Widget.html","01720ba367d0de5874ff3efe1ff1a55c"],["/Flutter之布局类Widget.html","745383a4b45ceea395ac26ef4652b080"],["/Flutter开发之Dart中的类和对象.html","2814c44da88bb39f6f90b793177025d9"],["/Flutter开发之Dart的数据类型01.html","757a15d441cc3acf12c814860990416d"],["/Flutter开发之Dart的数据类型02.html","6ce98ba70d8925c228020231d23a44cf"],["/Flutter开发之Dart语法基础.html","ea20b55126081b2319c1107591790285"],["/Flutter必备开源项目推荐.html","7d0dd59a74cb84ec41307c6a0e4cfdf3"],["/Flutter的安装和配置.html","d1724a6df8eaced7e38ffe7db73193bf"],["/HTML5基本介绍.html","29a220d3670f90d934fa5f414a1214aa"],["/HTML5学习笔记之基础标签.html","9cf252bdf7219ac9f0b5f7de1f8a512c"],["/HTML5学习笔记之表单标签.html","6aacd4a211741dde5e514b959d93bec3"],["/HTML5学习笔记之表格标签.html","4371d9cd0269b3c0bcd69ebca44cbe5c"],["/HTML5学习笔记之音视频标签.html","3f49fd00fdc5067dbc024af932608fbd"],["/Hexo博客不蒜子统计不显示.html","84de0310396b489628c4597806f587dd"],["/Hexo博客多台电脑设备同步管理.html","323cd1258589765b070e3dbad5d339f9"],["/JavaScript基本语法01.html","447c228114cb7baebaa5ef2f8c9bb731"],["/JavaScript基本语法03.html","eabb139ec78a2e363472889dfa2c728e"],["/Mac环境下MySQL的安装和基本命令的使用.html","20ee27b50888755ac50c8680e0dc733b"],["/Mac环境下Redis的安装和基本命令的使用.html","a636f1883aa0497c8e72851f17bdea24"],["/Mac破解版软件大全.html","ef645b6f31ade7cce9d5a417cb26242c"],["/MongoDB的安装及基本命令和pymongo的使用.html","24bfd9bf79c1b154f75f7f2c17f75beb"],["/NSMutableAttributedString富文本.html","a1e546b3a92005c05250b7d0f242ec66"],["/NSRunLoop底层原理详解.html","4debe7a321acb31c18215a11e677cb5f"],["/NexT主题如何提高文章颜值.html","68b93d70043db9699b8b411bacde8617"],["/NexT主题配置个性化设置.html","709a131abcd17768567a9213ec03d03f"],["/Node.js搭建Web服务器.html","d6634f55ccba6f39a150d99ad8b4a771"],["/Python中常用的模块.html","69d176d072c33e1b2abca1385883067b"],["/Python中模块的使用.html","cad363d64915709d1b6cc3a0efc24cfd"],["/Python中的运算符和条件循环语句.html","e4e2d2385d7f1b371f569b08584a1315"],["/Python之错误异常和文件处理.html","1ef474e4618c31ffdc92c07a0b116443"],["/Python之高阶函数.html","8d4d03c6dd7265fb2abc96cc88e879de"],["/Python数据类型详解01.html","edeb62157d658c23a1f77c72cf3ee76d"],["/Python数据类型详解02.html","099e2d0581c162ec1fd04223b95d06e0"],["/Python数据类型详解03.html","d8fe3f701632d77106c3da2e4600422f"],["/Python的面向对象和正则表达式.html","3902a098cbfe69b8b1e74d891aea8413"],["/Python编程之Tkinter的使用01.html","3f199de3d6fa89bd4195af82336e2ca6"],["/Python编程之Tkinter的使用02.html","6534c4cf09e0e230ca52f4defddb1cf9"],["/R.Swift高效引用资源文件.html","6c28cb3cfa199efcb0769564c02127a7"],["/React Native之导航组件NavigatorIOS和Navigator.html","75c907003031917267518af34f66bd24"],["/ReactNaive之CSS和Flex布局.html","21a6a734261abd84313798205848a401"],["/ReactNaive之ScrollView和ListView.html","e757a8b385d85e4b0c170997ebead25e"],["/ReactNative之AsyncStorage本地存储.html","6e32d4fcad2cf572dc5678a7d07d9392"],["/ReactNative之TabBariOS和TabNavigator.html","8a99a12343423aeb8111b848f587e6f0"],["/ReactNative之iOS原生和JavaScript的交互.html","0ada8580b37c50d51a2cab5171f299ef"],["/ReactNative之基本组件.html","b9c28fd3b6306721fc8698c03679c553"],["/ReactNative之基本组件02.html","67fa8fca7abd8deabb342f23e55fdd07"],["/ReactNative之手势识别.html","e7eba8804e353019c37c0c1f7fda0399"],["/ReactNative基本动画之Animated.html","990f4bb2b9f68445c88d9869ac600611"],["/ReactiveCocoa 的一些高级用法.html","78f21c90164aceff39384e863d506cec"],["/ReactiveCocoa之集合使用详解02.html","16762944872905c06578ed39b35951ea"],["/ReactiveCocoa使用详解01.html","b2a05d1c7d367def664c2ed3083cfc20"],["/Realm在iOS中的简单使用.html","12ea06e715cee3f19070eff2bef501af"],["/RxSwift+Moya网络请求之项目实战.html","570150099d90260e4b3f737efc13691f"],["/RxSwift的使用详解01.html","2d858536cc1f8b72fd3adf89a3708b75"],["/RxSwift的使用详解02.html","0c22d7a5fa8128600867e6f0a35d502d"],["/Sign In with Apple.html","a04d82fdcb52dba23b5431eff31835fc"],["/Socket搭建即时通讯服务器.html","408608a7768beea07a5a65c7de851933"],["/Swift 4.1 的新特性.html","abd11084664eec40e0f4530cc0cd2b0b"],["/Swift 4.2 新特性更新.html","ec40926cacf9f2d96a61ccc22a0197ba"],["/Swift 5.0新特性更新.html","4431d72969e4ef223b68b9e3c1abfc3b"],["/Swift4.0新特性之String和Array和Dictionary.html","e5b4b3412091d0c65d0c203e4095c95c"],["/SwiftLint代码规范属性说明01.html","4eba07a7fbf4e2b1655f892e27d66461"],["/SwiftLint代码规范属性说明02.html","df4c12dbd44336989b4f271c64d5a386"],["/SwiftLint代码规范属性说明03.html","abebd9322cd8da574eb806d0b9f2ba7d"],["/Swift之Facebook的POP动画使用和实战.html","090c65c3142c58b973d31c289fa86444"],["/Swift之Vision 图像识别框架.html","5452d780d4cce38f38481e90ed0e38b9"],["/Swift之二维码的生成、识别和扫描.html","762e8c0ec23747aa4669fb55a4494f81"],["/Swift之删除HTML5页面的广告.html","1975c5e3826cc9cf768b54d1c241215a"],["/Swift之微信朋友圈图片浏览器.html","16bc0b6ee20c42f853a38d3286951d26"],["/Swift仿网易新闻首页左右滑动切换页面.html","d486a61f04b7a9925509b08250b4c1e8"],["/Swift函数式编程之高级用法.html","4fd470aea50dd92fcb38c92746d36ed4"],["/Swift基本语法01.html","a39ef4bceb57cfc4f6a9a5d51e2a491d"],["/Swift基本语法02.html","d29b5f1adf6e05e9f5401d61bead3726"],["/Swift基本语法03.html","7b37044eaedc3de32de4b2d37a84b677"],["/Swift开发之3DTouch实用演练.html","90d6a7c4458a391db4ae4d026baa17ef"],["/Swift版-H5页面实现长按保存图片.html","77e29a9b1aa2497fc260b578d371e2a6"],["/Swift语音和文本的转换.html","6566d2bd9f02f78b4824d27ad888eb55"],["/Swift项目创建桥接文件.html","2a21a5756fa6c5eff80edfe25c1018a5"],["/Tkinter之组件布局和事件绑定.html","1bdb1a58578013d87d56aa1cd5d5baec"],["/Xcode代码规范之SwiftLint配置.html","6d005cc5bef7f8b371830f97b05c87e5"],["/about/index.html","fa42cf4f1d1c8524327250f506c89a46"],["/archives/2016/10/index.html","04682d84f7ffe7e9ed6b745b0fa8e228"],["/archives/2016/11/index.html","150ea736a8998dba439b04c9be01fd9a"],["/archives/2016/12/index.html","5ff4f175a12f469eb7340321b1e4a185"],["/archives/2016/index.html","0ec7fa2faf77eca829eb2b3f9f657cd8"],["/archives/2017/05/index.html","db82476ce276b275713e53e9df7237c3"],["/archives/2017/06/index.html","c30c59bc803963b7fdce64d34cc21ddb"],["/archives/2017/07/index.html","ffea09e64376e4121b289208f8f07259"],["/archives/2017/08/index.html","51281e10d7ffa85f607009f9b60d6546"],["/archives/2017/09/index.html","e22f77c6f819ea0f812a2a0d5da1df84"],["/archives/2017/10/index.html","35ba83aace62b8d027e23c81a31c2875"],["/archives/2017/11/index.html","1de632e5ba21aea295f18834072d9b34"],["/archives/2017/12/index.html","28c7f3c3981dd45b0906847f67f90ba1"],["/archives/2017/index.html","a260ec8527df5665368cf80ca17e7777"],["/archives/2017/page/2/index.html","a427e27816fbc345e98012a969e596c3"],["/archives/2018/01/index.html","828bb0a17b7a8e18ff4f32582df1f67f"],["/archives/2018/02/index.html","7613bc20c1fb0a4202b18166804e2362"],["/archives/2018/03/index.html","0f0d529bad0e00265b3dacadd8d155cc"],["/archives/2018/04/index.html","1037c005f19878089bd07e5c02e6f177"],["/archives/2018/05/index.html","ea0632357fe919e9415ef75e5279afdb"],["/archives/2018/06/index.html","d7da25c4618f3bd6cabef5e1095c7b84"],["/archives/2018/07/index.html","c195b1e23697a578d33e8dd7560baa46"],["/archives/2018/08/index.html","d3b160e0f5eeed70df3fdeeb0bdfbc66"],["/archives/2018/09/index.html","5eb4d699b35276a27c005382bc28eb1c"],["/archives/2018/10/index.html","e50fb38462264c78762ee556d742b04d"],["/archives/2018/11/index.html","09e362a5b0c1dd1548227edbd6cb3ae3"],["/archives/2018/12/index.html","03e0212f786dda0a3aba0a11ddd2eabf"],["/archives/2018/index.html","652b0f380cc2c09c0d7d49f6f571b8af"],["/archives/2018/page/2/index.html","48ab69415c196c465fc001717d13e0a1"],["/archives/2018/page/3/index.html","4d64da95786cb6f9357a2b724f5e54ad"],["/archives/2018/page/4/index.html","778166188dbdacd1548db7dd54607733"],["/archives/2019/01/index.html","ca63a21ff3c59820b18445f79062567d"],["/archives/2019/02/index.html","62e18b9d77c7e4876d28a3dcab1eb337"],["/archives/2019/03/index.html","ead9159e59766fd8cb9dcc64d9a1a96c"],["/archives/2019/04/index.html","4465229c8948e925d715ad565b8a6f9f"],["/archives/2019/05/index.html","a0c66fcf0a4a5aed80bf02ba7342f2f1"],["/archives/2019/06/index.html","ed23fa4d56e3d22021f853f6653d6220"],["/archives/2019/08/index.html","1e9e528d4ffe935456ec139192046f8d"],["/archives/2019/09/index.html","80c1b3bea08b5320d2097ed3ae494489"],["/archives/2019/12/index.html","62fbc41a949577f39e151c05631a9937"],["/archives/2019/index.html","06544a4100e5e3b767c181382fb1c3cd"],["/archives/2019/page/2/index.html","64de7b4bd2bc3fb600ae6d34606517ad"],["/archives/2020/01/index.html","249bd49c1c5397be31b956875bdc24b4"],["/archives/2020/05/index.html","edfc8a59893bccfcd136c0027e57144c"],["/archives/2020/11/index.html","cb3f7f5c6137b10af47271dfb95d0c20"],["/archives/2020/index.html","9928d6ee383daeae40fb6a02964da6bb"],["/archives/index.html","d05951d1de71818ebfc65f318452634f"],["/archives/page/2/index.html","9cbff4dcd506eb4a071ee2afb7edf978"],["/archives/page/3/index.html","80391c5e68cfd32cef730ec15aa09429"],["/archives/page/4/index.html","766a0cb5ef51f904bb425a0de61615d2"],["/archives/page/5/index.html","1f4eb3e6d8f6b3528088e46466592b99"],["/archives/page/6/index.html","180fb5691b0f9e52777882f859abb45e"],["/archives/page/7/index.html","c8d654bc9cbe010e8624af8b5df6809b"],["/archives/page/8/index.html","4040db1a5deff6d8b6e3be7da1ba32a4"],["/av-core-mini-0.6.4.js","fae9ab7d7e6b3cabcc17ddee575b92d7"],["/baidu_verify_BQasuiUrVi.html","8fc4036eea9d7f1295e73a55a2aa15da"],["/categories/Flutter笔记/index.html","202a79b538355bde325f8659712df1e8"],["/categories/HTML5/index.html","76bceee9f803321715e109ee2e54510c"],["/categories/Hexo博客/index.html","fad4a9d984b0c2964676e0c7d64fc504"],["/categories/JavaScript笔记/index.html","fa8f1910f953933241e09dcc2ec97127"],["/categories/Node-js笔记/index.html","6cb431d91a924107a43e9fb5835fe9d1"],["/categories/Python基础/index.html","c227d60182e3529b3af385cab58b533a"],["/categories/ReactNaive/index.html","3a06a3216c0bbde56451dafe0115bbe6"],["/categories/ReactiveCocoa/index.html","81445220d52a5cd0ca9379b9750734a0"],["/categories/RxSwift框架/index.html","e7cffd06bb6924d562db2d8c73803a85"],["/categories/Socket学习笔记/index.html","98159fa3a35ef9a27f52c55137ba662d"],["/categories/SwiftLint/index.html","1f159df26e2fa17b6fcd4bb03cf35720"],["/categories/Swift学习笔记/index.html","5acf24d34939bbb34b93be670cfa7de6"],["/categories/Swift高阶功能/index.html","20d1987a9331e2e3a17eefad0eb9a755"],["/categories/Swift黑科技/index.html","0dfc320ea79abf4547f64c5737d6f0e0"],["/categories/iOS动画/index.html","b024193b6807ffe9688d60eeaecb8af4"],["/categories/iOS底层原理/index.html","a5ab4b55754df3357dce17c3e1a1ef64"],["/categories/iOS进阶指南/index.html","5466550e4b34b1897bc870774fe7d721"],["/categories/index.html","a437053dffe5a0648ddf6b198e23b97c"],["/categories/入坑指南/index.html","78c3120984e40590d0324a0ea23ba3b4"],["/categories/数据库基础/index.html","a29c85b3bb7587d1cb233d914ba3261d"],["/categories/组件化开发/index.html","f2986c38ee05444db7b4da5727f31660"],["/categories/高级用法/index.html","cc75132d82c6a272e71422b52a63c4ba"],["/css/main.css","bf1c63a3227c538c37c3ca7c659da33d"],["/googlefc329f0e8f9212c6.html","69202fdc36945fb4ca53b2b6585893b6"],["/iOS13适配深色模式(Dark Mode).html","a5f31dc2abe0b285c548ae6702b59452"],["/iOS9之UIStackView的使用.html","4c38e57614d444758983cc29811c9cfb"],["/iOS之NSDate的Category.html","4e29c15c6192b9f1b7c61f7c443c918e"],["/iOS之Scanner字符串扫描类.html","2b57d683190c4dc9d7bfc82cb8e8c740"],["/iOS之UICollectionView自定义布局.html","08eecf0810880f082d59c5b0118819b5"],["/iOS之UIMenuController的简单使用.html","447d97c293bf5f1358cbe30f6b24226b"],["/iOS之UITableView设置全屏分隔线.html","721348677a508e4c34f12bdab9950e8f"],["/iOS出门必备之CoreAnimation(核心动画).html","ad9b5ad5567b30dafd77a97a298a75c6"],["/iOS的静态库和动态库.html","5e61cad49a260089a7a4fb780367b956"],["/iOS神技之动态更换APP的Icon图.html","3b3af39aa9c9a5924ddc19b72bba4b12"],["/iOS私有Api检测.html","2dff9137c8638e20c5439039cd1a7ee8"],["/iOS组件化之私有库.html","aacd53ec30705a3ad39cc26c00af33a6"],["/iOS黑科技之(AVFoundation)动态人脸识别(二).html","40a18154d94ac6a3565641bb9183bb20"],["/iOS黑科技之(CoreImage)静态人脸识别(一).html","e8078a63eca2a57fde4f6eefe2533a08"],["/images/algolia_logo.svg","fd40b88ac5370a5353a50b8175c1f367"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/avatar.gif","2bed513bc5f13733cf9a8a12c4e1a971"],["/images/avatar.jpg","8e538570515174c6f9f27f385ad5ec4e"],["/images/cc-by-nc-nd.svg","1c681acc4a150e7236254c464bb5a797"],["/images/cc-by-nc-sa.svg","12b4b29e8453be5b7828b524d3feabce"],["/images/cc-by-nc.svg","dd9cfe99ed839a4a548114f988d653f4"],["/images/cc-by-nd.svg","2d80546af20128215dc1e23ef42d06c2"],["/images/cc-by-sa.svg","c696b3db81cbbfba32f66c1dc88b909a"],["/images/cc-by.svg","6c4f8422b3725cb9f26b6c00e95fc88b"],["/images/cc-zero.svg","79deee77a07fcb79ff680ac0125eacb9"],["/images/favicon-16x16-next.png","b8975923a585dbaa8519a6068e364947"],["/images/favicon-32x32-next.png","5a029563fe3214c96f68b46556670ea1"],["/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/logo.svg","ddad9027e42111ccd5b466bc18188970"],["/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/quote-l.svg","1238a4baccd02c6025ec85b58f4282d4"],["/images/quote-r.svg","85787c6fa27965c81f7be70252b43bed"],["/images/searchicon.png","3d6b5c9d6d6c26a2b76a14b8fdf3438a"],["/images/wechat-qcode.jpg","f6d35f663d5ebc7326df57cdbf81bed8"],["/index.html","73db5907c220f6fa43deeb00d372a0c3"],["/js/src/Valine.min.js","3fa7b322b49d94daadc5b654fbb0480d"],["/js/src/affix.js","683c19859764baf0d17538897ea1eba2"],["/js/src/algolia-search.js","f5fa392318805997089ceb3a925979ba"],["/js/src/bootstrap.js","2a1083772854ae2663748e0a25c17285"],["/js/src/exturl.js","2b444179b3145e5007b4d371dac07cd3"],["/js/src/hook-duoshuo.js","45997b0c06abff3cd88efd901f614065"],["/js/src/instantclick.min.js","53a0bdbc01875e28d512e3d59d72f990"],["/js/src/js.cookie.js","6e9eb1f53afb135aedaf90739c867738"],["/js/src/motion.js","0f6add86607c451269d0b3d286c84d8b"],["/js/src/post-details.js","b8e8e27c27c697567879c52888ffc24c"],["/js/src/schemes/pisces.js","827b5ad25e1142277c1e7dfe0cacebe5"],["/js/src/scroll-cookie.js","890406ae3539e4721ef5f314542e5e46"],["/js/src/scrollspy.js","fafdd7ab6af233b701506c733910b7f5"],["/js/src/utils.js","24512c3455f976730b7bf75e1222c533"],["/lib/Han/dist/font/han-space.woff","b09f2dd7d3ad8ad07f3b8495133909d9"],["/lib/Han/dist/font/han.woff","e841c6b547bc06a06f60f4de52bf906e"],["/lib/Han/dist/han.css","cfcc552e7aebaef5e2f34aee030b956b"],["/lib/Han/dist/han.js","575b6c1667c01798730fbd972e959c9c"],["/lib/Han/dist/han.min.css","cab466d758269b437167422c4a16b364"],["/lib/Han/dist/han.min.js","96482c9c2b3c5ea9bf5a40db162c7f34"],["/lib/algolia-instant-search/instantsearch.min.css","029a13b44e6807955106ff3c075a02f9"],["/lib/algolia-instant-search/instantsearch.min.js","0db46eba0c8133693ee839507b1612f2"],["/lib/canvas-nest/canvas-nest.min.js","36e103d2a05bc706bac40f9ab8881eb7"],["/lib/canvas-ribbon/canvas-ribbon.js","16dc214240913551986593808c2efcfc"],["/lib/fancybox/source/blank.gif","325472601571f31e1bf00674c368d335"],["/lib/fancybox/source/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["/lib/fancybox/source/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["/lib/fancybox/source/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["/lib/fancybox/source/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["/lib/fancybox/source/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["/lib/fancybox/source/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.css","cac75538c2e3ddfadef839feaca8e356"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.js","f53c246661fb995a3f12e67fa38e0fa0"],["/lib/fancybox/source/helpers/jquery.fancybox-media.js","c017067f48d97ec4a077ccdf056e6a2e"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.css","52ddd84a9f42c1d4cd86d518a7f7e8bc"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.js","cf1fc1df534eede4cb460c5cbd71aba6"],["/lib/fancybox/source/jquery.fancybox.css","6c55951ce1e3115711f63f99b7501f3a"],["/lib/fancybox/source/jquery.fancybox.js","921e9cb04ad6e2559869ec845c5be39b"],["/lib/fancybox/source/jquery.fancybox.pack.js","cc9e759f24ba773aeef8a131889d3728"],["/lib/fastclick/README.html","7e33723f6b8a9f55a1ce3979e3d505ed"],["/lib/fastclick/lib/fastclick.js","6e9d3b0da74f2a4a7042b494cdaa7c2e"],["/lib/fastclick/lib/fastclick.min.js","a0fc6c24d1f3ff9ac281887c92b24acd"],["/lib/font-awesome/css/font-awesome.css","c495654869785bc3df60216616814ad1"],["/lib/font-awesome/css/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/lib/font-awesome/fonts/fontawesome-webfont.svg","912ec66d7572ff821749319396470bde"],["/lib/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/lib/jquery/index.js","32015dd42e9582a80a84736f5d9a44d7"],["/lib/jquery_lazyload/CONTRIBUTING.html","7287727950845c8a1010f3933691afef"],["/lib/jquery_lazyload/README.html","cffa5707f0d54c9f561715e0809487bd"],["/lib/jquery_lazyload/jquery.lazyload.js","8b427f9e86864ee3aaf1ae33e6e14263"],["/lib/jquery_lazyload/jquery.scrollstop.js","f163fd8f02361928853668a96f8a1249"],["/lib/needsharebutton/font-embedded.css","dd8861d10d1ed6b5e0c0011adfb39be9"],["/lib/needsharebutton/needsharebutton.css","30f2f800e13f7b6b83629a4cbd9749ef"],["/lib/needsharebutton/needsharebutton.js","6c6f855f7d50f4bc3c804f52b03bbfbb"],["/lib/pace/pace-theme-barber-shop.min.css","e8dc66cf2d88abc25fbc89b8a0529abb"],["/lib/pace/pace-theme-big-counter.min.css","db2b8fe31e60f19021545277d2f6e05e"],["/lib/pace/pace-theme-bounce.min.css","ad954aa0bace4b213eeb19d6e89a0bda"],["/lib/pace/pace-theme-center-atom.min.css","8f6bc803acefc6f93afc98fb38201456"],["/lib/pace/pace-theme-center-circle.min.css","93c72298781226a80a9c66b27b21a57d"],["/lib/pace/pace-theme-center-radar.min.css","f0099bdd1cd42e9476bd7abc417c0328"],["/lib/pace/pace-theme-center-simple.min.css","eddff4756dbf21dbbff1c543bd894dde"],["/lib/pace/pace-theme-corner-indicator.min.css","776826157cb28ac1ee5e78771292b9ba"],["/lib/pace/pace-theme-fill-left.min.css","965859b39001da08e1e92327fe3d8e12"],["/lib/pace/pace-theme-flash.min.css","aab39b436e1fa0fdc51df06f2d53c38a"],["/lib/pace/pace-theme-loading-bar.min.css","4e05877f1f9efb9c1e7dd75cb78c764f"],["/lib/pace/pace-theme-mac-osx.min.css","29ae030ceaa8158352c5472218375b91"],["/lib/pace/pace-theme-minimal.min.css","f48f04d370993b55a2745e548cc82743"],["/lib/pace/pace.min.js","24d2d5e3e331c4efa3cda1e1851b31a7"],["/lib/three/canvas_lines.min.js","1324174ae6190fbf63b7bf0ad0a8a5bd"],["/lib/three/canvas_sphere.min.js","5c6bc45b137448b5b9df152ccfb2659c"],["/lib/three/three-waves.min.js","41059bd5e5c7aa520b1b411919e5121f"],["/lib/three/three.min.js","3298078bce82bdb1afadf5b1a280915e"],["/lib/ua-parser-js/dist/ua-parser.min.js","a6e833266c4b41fabb9ba94a145322d8"],["/lib/ua-parser-js/dist/ua-parser.pack.js","6b627e4d61a7135952824bb9c1a4a134"],["/lib/velocity/velocity.js","0361fa6dcf4cf4d19c593cdab0937dd0"],["/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/lib/velocity/velocity.ui.js","f55d22cc592c9f8d4ffd3b41a6b90081"],["/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/navigation/index.html","778e3d5fe2cb97783f52d518fbb35fbf"],["/page/10/index.html","9a9318c1d7308c5cca0511023cbbd33b"],["/page/11/index.html","c46b8ff035e3cee429b742776fb09438"],["/page/2/index.html","6e51c09b94a6be64b9f1007a473009b0"],["/page/3/index.html","83d9fa487d1c58677aeeb77642055dc4"],["/page/4/index.html","2a9c569160681ab8aa2385d0a7c0fce5"],["/page/5/index.html","e03c4b3be3a753cc9d9fbf5eff4a57c5"],["/page/6/index.html","5bbaed255b981dca5b4f38bde58acebb"],["/page/7/index.html","f908ad43cc8d74a3ffc229b7f8b2524d"],["/page/8/index.html","d486f5f27db6b5252e0de50aa11b11bd"],["/page/9/index.html","2a9cd34450a5998045d14b13246ba2cd"],["/sw-register.js","99b6467fe836ab6a2cee546e50a2c17b"],["/tags/3DTouch/index.html","a554053df897655dd8bf4fdc00d22824"],["/tags/API/index.html","f4ab106315e98abcc19f271eb5d8b73a"],["/tags/APP/index.html","b72afd702a98344d62cf08c40db7e1e4"],["/tags/AVFoundation/index.html","8a9ca68bf567ff133f0f0dadff4233c6"],["/tags/Action/index.html","7aa8036182862b5ad3e64fa7a69e27be"],["/tags/Alert/index.html","689dc6d019d3e6ae5454a94fa96bee99"],["/tags/Android/index.html","13b266e33cf769800310e46228def69f"],["/tags/Animated/index.html","f75da17ae3efc2e54d6d8fe68970d7d4"],["/tags/AppIcon/index.html","6a37d06d957e7510ed3e8f0ede9a0537"],["/tags/Array/index.html","49b56dc0c403a842f02b97badae5b5d0"],["/tags/AsyncStorage/index.html","b54d7a07c9e43bf877643f47179aae25"],["/tags/Block/index.html","dad196aa456af0d280952ef3cb282e2f"],["/tags/CATransition/index.html","5055c273f800920981914fedb5753694"],["/tags/CFRunLoopRef/index.html","c823f354468f9f2781c1b98054526443"],["/tags/CIDetector/index.html","bce4511de3e7d18382ed4e896b238e23"],["/tags/CIFilter/index.html","54651168ab6bd51f29005c66e4105b19"],["/tags/CSS/index.html","900e7f6f4d6ae4f84ad0938dda4d9349"],["/tags/Calendar/index.html","09f1c53d9ed2ffdfb843dc14d37b106b"],["/tags/Category/index.html","297e068380642794a5cb66b26e5e7cb4"],["/tags/Cliboard/index.html","8d6955bdbe6586a33eb967355333ac05"],["/tags/CocoaPods/index.html","261299a30f18ab2fb62b28ab70a8b900"],["/tags/CoreAnimation/index.html","66a382290d6c6e89ba8f8a9425ce0fec"],["/tags/CoreImage/index.html","580e86367125e1dba5ccaf74b3f10c91"],["/tags/Dart/index.html","75c500f2b2335cd5e506dee7b3b6b6ea"],["/tags/Dictionary/index.html","228368a731aeecb0f5157215aa24fed8"],["/tags/Element/index.html","1ff7096287265acb64f938c1f3d6fb2e"],["/tags/Equatable/index.html","deb171536c96d023e869900aa046a3fe"],["/tags/Error/index.html","53ba066d82c4d05eb8261a7561ea0984"],["/tags/Express/index.html","5e398a2eebca11ac3f593e71c706d043"],["/tags/Facebook-POP/index.html","6f4e8c505b294f90ca4015c22df3eed2"],["/tags/Flex/index.html","0744c26ad05158b478247a8790a1d817"],["/tags/Flutter/index.html","38b88449295186070dbca525fabe7606"],["/tags/Github/index.html","62459e1e7ec7c24de9e13de967aef110"],["/tags/HTML5/index.html","1b7833b030d003b33360fd50f8b7f380"],["/tags/HTML5标签/index.html","30f03ec45d95e9781019e920ec97e401"],["/tags/HTTPS/index.html","7fa2fbcb1e3baa4c4dff69df55c80743"],["/tags/Hashable/index.html","ca6a5ec91a44b448d168b3094b9032ed"],["/tags/Hexo/index.html","ba72fe9eb458003be0eb107593efe00a"],["/tags/Homebrew/index.html","49fd6632dc7f8589285979e4062ad264"],["/tags/Image/index.html","4ad485f10a173fbb0fbe7b9c63a3ca3e"],["/tags/JavaScript/index.html","f76994f1edf688a06996d1f63bacc20f"],["/tags/KVC/index.html","e7d5363a529cee5f504c1f7bb5824136"],["/tags/KVO/index.html","e23497ea41f6990728db25d1d99a806d"],["/tags/Key/index.html","756b22db04bd1b779a64cdf9886327a2"],["/tags/LayoutAnimation/index.html","1489fe3c5cb4dcd67fb5f482c3526881"],["/tags/List/index.html","c6888bc478802a8d045167578e3a11ae"],["/tags/ListView/index.html","0ab106074df64692757499c958ebc6ab"],["/tags/Mac-工具/index.html","a98511472e2bcbe3ea8e42c3f6234895"],["/tags/MacOS/index.html","374697abeb0d184f0700a15c35d30a19"],["/tags/MongoDB/index.html","202f476506095ff63c46bf9675eac6a7"],["/tags/MySQL/index.html","084623bc581d525abc61ab5bbd922d07"],["/tags/NSRunLoop/index.html","279749c10d27fa4ca5565321fc07bbcd"],["/tags/Navigator/index.html","0ac7d4ece909222ac14319149ec8a945"],["/tags/NavigatorIOS/index.html","c53ecea153d09574be909f47b970baa0"],["/tags/NexT/index.html","acf7326863e3baccf8acbe6d6ea0b2bb"],["/tags/NoSQL/index.html","7b7e17bf522da3654953d23cad8f45df"],["/tags/Node-js/index.html","0d36a661cf56b432828ec54cfacaafb3"],["/tags/Objective-C/index.html","634b9e8160cc051fdc15ea68e4afc9d0"],["/tags/PanResponder/index.html","62c8dfc18c074ff48014308399cb0ae7"],["/tags/Pillow/index.html","fbc716de00ad97d868efe51f716c1e39"],["/tags/Property/index.html","95569af8cb9f3339c6906e052df94aa2"],["/tags/Python/index.html","d635b5e79b672f22d72439f0491a243c"],["/tags/R-Swift/index.html","c949ee65845b8bf3afa2c64394046321"],["/tags/RACSequence/index.html","1e14d80d3b2e45ac6e485e1fb0f7f2ce"],["/tags/RACSingle/index.html","be541622e26972e61e96cc709068d2a4"],["/tags/RACSubject/index.html","fc658795570f4a72fc5bbcbff3b67a32"],["/tags/RACTuple/index.html","a688ea82d77ecfd6818c34a10699320b"],["/tags/ReactNative/index.html","f4ef91e4de7eaa6a607a7e5e008fd435"],["/tags/Realm/index.html","714a92fc9663c76e2c97bc3740baa258"],["/tags/Redis/index.html","17b81ea7255524c5abafadcd150af044"],["/tags/RunLoop/index.html","1aabf2b6084fca1b931812c34416c805"],["/tags/RxSwift/index.html","4f1b0d80147c963cbcca994803afa6ca"],["/tags/Scanner/index.html","84210e78effad37a434536201a0a5ca8"],["/tags/ScrollView/index.html","e04e6df256ab4e910b89229e77023807"],["/tags/Socket-IO/index.html","081b940987cc90c640e5be2206e98d60"],["/tags/Socket/index.html","5923855a2df90dcedf8dce05a5376601"],["/tags/Speech/index.html","481406450ea74acfe317b6940775cf49"],["/tags/Swift/index.html","90eb2400a68a2a6cea3c4c1a94a6d195"],["/tags/Swift/page/2/index.html","df06bd1ec0f3f9429236388481e359fd"],["/tags/Swift3-0/index.html","296205465fd3d7affc3f381fdea2651c"],["/tags/Swift4-0/index.html","853f8073822716177f250e381836485b"],["/tags/Swift4-1/index.html","a3daeb3709d6b2119066adb4305bebb0"],["/tags/Swift4-2/index.html","a0a3f8741cee5f31f316dce3defeaec7"],["/tags/Swift5-0/index.html","0a729d8e7d5c50ac34621568fd0ab77a"],["/tags/Swift5-1-2/index.html","df26fe5fcff1975eb2f46fd8d05bf200"],["/tags/SwiftLint/index.html","2feb7eaeb6b12087d6d1f8229475ed6b"],["/tags/TabBariOS/index.html","627cd0d9d88468394f42035f6a5d2bc1"],["/tags/TabNavigator/index.html","05be1abfd651a2af8d3f5e3417023d9d"],["/tags/Text/index.html","79d8e4579c46770305ecc2b7f87778d6"],["/tags/TextField/index.html","92a50d2d10ae7ff06bb2919fbb57f9b5"],["/tags/Tkinter/index.html","5e4fe38d0cddb33ad59f5b1debee5eb3"],["/tags/Tuple/index.html","e914a27070812fd82b5bd09ceac6774e"],["/tags/UIBesizationv/index.html","0251f4e662d8d03f0c3ae7dddbd34a78"],["/tags/UICollectionView/index.html","9975abfb58060ad176895be656eb1c7c"],["/tags/UIMenuController/index.html","442b7f23f85516a91034f3604f89afd9"],["/tags/UIStackView/index.html","1d49797e854be021be0bf2c897617e0c"],["/tags/UITableView/index.html","ac46cc11b7976948a23dcd25555e6203"],["/tags/View/index.html","879bcaa58d2d1f2ce4a454fc77d5cb22"],["/tags/Vision/index.html","041406a22573cbd1c1b51ac2c89463de"],["/tags/Web/index.html","b6f1de584605e2140ca91e16a5d653db"],["/tags/WebSocket/index.html","973e0b665dbc9e982f17f94f1d6ab50a"],["/tags/WebStorm/index.html","5776c8cc37e1ab6bb5bda0cdac8a9b19"],["/tags/WebView/index.html","d748bb2894f50db2f0c8c5abc57e028c"],["/tags/Widget/index.html","d1ee6b41dc21b88d01dd9afd14ec08d5"],["/tags/Xcode11/index.html","bcc8482e76a7272b222bb99df1f5d5e1"],["/tags/busuanzi/index.html","2e2bf03c57f330bbe49664c1b9bc412d"],["/tags/dynamicCallable/index.html","26072cd5ff1105a8a51faad84623d315"],["/tags/fastlane/index.html","d0c4a162390dfb6a088ac8f2ed5cf1f4"],["/tags/filter/index.html","ea868da7567d37f689c1f48183b64a1c"],["/tags/framewoframework/index.html","4d972c94e25578f47306a2e097601e5a"],["/tags/git/index.html","354de6042fc7d3460d3a40dead20655b"],["/tags/iOS-10-3/index.html","0ed29574009427be2a6bff0006729562"],["/tags/iOS/index.html","a490d7fe9c0254a96a76f1c4f67d46a9"],["/tags/iOS13/index.html","571b191fddde093246ccc70d65e9f38f"],["/tags/iOS扫描器/index.html","54b42e1ef45f00fd386bb97d7f481768"],["/tags/index.html","5aee107a3d1f1d4f43aaae156457441e"],["/tags/ipa/index.html","eec796fbf56da3107788177119540ab3"],["/tags/lane/index.html","8d7c44a5707926060d2c7a06e69feb27"],["/tags/map/index.html","28f2abb0be7f859fd5ae21c8b5a288ad"],["/tags/onPress/index.html","ca6a17b957c970d2ff6052c25dcf3976"],["/tags/os/index.html","915432d3264415f221af29e1e6db6c25"],["/tags/pip3/index.html","2f2aa01c8b1b41bd7ea4050d30e26e7e"],["/tags/pod/index.html","155a6a87491976aa8c45e1ad3e52f2c4"],["/tags/pymongo/index.html","b26c8908f43688450a8a4f3953e6ca49"],["/tags/random/index.html","d9fba35f9e042eaef011675f917888f3"],["/tags/reduce/index.html","a986585bfc5cf682d1be093e1cc2ee53"],["/tags/spec/index.html","ef67f8f04be03a62d5e9f5177104fa75"],["/tags/string/index.html","8259db1f3f90bd9c9faeb967c924f54f"],["/tags/trunk/index.html","7b5f1cf28b3ee2949c75ca00e2042fad"],["/tags/unowned/index.html","7c2734ff8bb4fcdb81880491cce70ef7"],["/tags/weak/index.html","b6503e934376978447454d20833193fb"],["/tags/不蒜子/index.html","17d923024c69ed63c1f0c03ccd56b4c7"],["/tags/入坑/index.html","3f04416da1fd0754edc9caa7c54bb3b9"],["/tags/内存管理/index.html","d3878c08936763313695177724db5360"],["/tags/函数式/index.html","7324f8ab2747871d992d0274322c1e8f"],["/tags/判断语句/index.html","14a1bed12bddd031f1cf2086fe3faf28"],["/tags/动态库/index.html","0bbfeba7e6b4a0ca61fe9344fad45d2f"],["/tags/同步管理/index.html","4295bf68a40374d0620411d2086e3ea2"],["/tags/响应式/index.html","6d809dfe589ba3f9d473b5f6fbff8e4c"],["/tags/响应式编程/index.html","05193e35b38b01a7fe47689d66073a9a"],["/tags/多设备/index.html","6dae57be6923112073c65ae267ae93cd"],["/tags/富文本/index.html","80447eae0c0ac3f53c087fc4d31c85c0"],["/tags/属性/index.html","00975b04b1c12b19dff768a2cdca862c"],["/tags/数据类型/index.html","9eb97d0ca92fe2c996066d513ec77ada"],["/tags/文件/index.html","c13e4c928d6191bf72771a0d4ad8e094"],["/tags/框架/index.html","f471aca58647df1ffa6f884190c72370"],["/tags/桥接/index.html","3759530429b8d3b95767b1c14b74316e"],["/tags/正则表达式/index.html","f466e6654f8913c836af67d786c92fb4"],["/tags/自定义样式/index.html","8ceeba3acc63d8a39be8411f3d13ae7a"],["/tags/规则/index.html","92ae360eff6a4847430d1e71e3334380"],["/tags/语法/index.html","35342721d6553be1504ae7f1f9bbe79b"],["/tags/运算符/index.html","eacf6e6a01e3cea2e91d90fec778b9dc"],["/tags/错误异常/index.html","b38f3fae78dce2f1f738e332d392273d"],["/tags/静态库/index.html","3da6e99440f1b3ff79f0da56ba72d1f6"],["/tags/面向对象/index.html","5073ee2b20488016a0dd5defa387ed2d"],["/tags/高级用法/index.html","5388ce9c9deb0e71e654f4fa6b6f9861"],["/tags/高阶函数/index.html","73ae51e9b04db10d86d180cf9636fdc9"],["/top/index.html","b2bc163e173d069a1253bd3f90c6eb83"],["/uploads/avatar.jpg","8e538570515174c6f9f27f385ad5ec4e"],["/uploads/wechat-qcode.jpg","f6d35f663d5ebc7326df57cdbf81bed8"],["/升级Swift4.0遇到的坑.html","422c58a1d21bcec8ca611c2b02fe81b1"],["/发布开源框架到CocoaPods入坑指南.html","f04441a107a01ae11ddeaf5a45e70e3b"],["/基于GitHub和Hexo搭建个人博客.html","c567dd11c4cf67b36a2d9898ecf5cb20"],["/探索KVC和KVO的本质.html","a5131ccf067ecc4c61fc99dce8b8abc2"],["/浅谈OC中Block的本质.html","d727eee9d282c383a7a9878accbfe755"],["/浅谈Swift的内存管理.html","09d16af70f7b013160e04c5cce4cb044"],["/浅谈Swift的属性(Property).html","e7114a8adc3c49bf1f32a813ecf7b47c"],["/移动开发之Fastlane自动化.html","9c8000ed52f589a151f9fd51ac8e503a"],["/简析OC中对象占用内存的原理.html","ee15c576043a31c502d273bf6b5ee1ef"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });









/* eslint-enable */
