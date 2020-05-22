/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/404.html","d1b519db8fad75e84bef1635d529e199"],["/CSS基础知识总结.html","ba67f86e9691af02632fcf77ff40a830"],["/Flutter中App的主题和导航.html","e49a85b70fe2cdb336d52fc495bcbc6e"],["/Flutter之可滑动Widget.html","8131c6b408c826e539c957fbee270b2f"],["/Flutter之基础Widget.html","9c2c9fb73a1d40e1bed2be25587614dc"],["/Flutter之基础Widget之TextField.html","8d076da05800f5b2986eec3b87ba5566"],["/Flutter之容器类Widget.html","e451bc5b629c815e581872696b4f5d1b"],["/Flutter之布局类Widget.html","8b0ff5c2c240e5c168f77e41385b1596"],["/Flutter开发之Dart中的类和对象.html","0b235fa82bea81cd8701d64b79a1ae94"],["/Flutter开发之Dart的数据类型01.html","76fa1c167d0fed841f9a716bcc7ee8b0"],["/Flutter开发之Dart的数据类型02.html","053535d98c2214c177d7d7249fd95ea4"],["/Flutter开发之Dart语法基础.html","93d1abe9cd1a7a11440cdf8d41e6570f"],["/Flutter的安装和配置.html","cb9862e67e7a53409b48b65a5922d871"],["/HTML5基本介绍.html","3d780817a4051a4a1d1a30adcf13ba0d"],["/HTML5学习笔记之基础标签.html","09d23544d6ceb3f5143f789cd53de6c7"],["/HTML5学习笔记之表单标签.html","e7eb9ab7b5084f6808d0bf0554975f40"],["/HTML5学习笔记之表格标签.html","60be10554c5615d2d095697620507430"],["/HTML5学习笔记之音视频标签.html","11da086f197fdfd4323c89787e65dcd7"],["/Hexo博客不蒜子统计不显示.html","bb9394cc7c3a508c34b30573afbe847b"],["/Hexo博客多台电脑设备同步管理.html","62d2be10235dc712fdde079f9d2fd8b0"],["/JavaScript基本语法01.html","6ba1dd9edf51fd452c795f7087f6e8b2"],["/JavaScript基本语法03.html","7447b7d5fbfb01c2778fba256e17ea08"],["/Mac环境下MySQL的安装和基本命令的使用.html","d4e44de76bcb6ab0ea3867676465dede"],["/Mac环境下Redis的安装和基本命令的使用.html","4766f0317b0029c7bf0493321df7874a"],["/Mac破解版软件大全.html","2c868960acb3922e14b8148589f80fa1"],["/MongoDB的安装及基本命令和pymongo的使用.html","814913a23bc4c9aeb468568ff4298730"],["/NSMutableAttributedString富文本.html","ac91687a9bdffa8f2fd5e25d7a01d130"],["/NSRunLoop底层原理详解.html","655dfe1ac4dd9a9735ee405839c7174f"],["/NexT主题如何提高文章颜值.html","95f4249e788cbce72292f6053966f4af"],["/NexT主题配置个性化设置.html","e62226104286f0065e3f5b4c7b8c0651"],["/Node.js搭建Web服务器.html","83d9e232e7d2214efa0a772a7b0b7f72"],["/Python中常用的模块.html","fc568e706a855bcbd29f5c804fbcda2f"],["/Python中模块的使用.html","cc9eecb5d3aa0abb7cb696869dad60da"],["/Python中的运算符和条件循环语句.html","2b79a7ec518371ba040733d6b76d857a"],["/Python之错误异常和文件处理.html","d45b6fd68a8fb5f386b658e2c0424a7b"],["/Python之高阶函数.html","b74c07c8a4f802642cb35240a4a310b6"],["/Python数据类型详解01.html","e8f7e17f1d58c2563c4c888151bc47ea"],["/Python数据类型详解02.html","c2b9853fc9d0158b2d20f182f33dc39b"],["/Python数据类型详解03.html","8f3cddf473e671bb4e58f9c31fc744ee"],["/Python的面向对象和正则表达式.html","c0d1932902f9537550e4dd3d07cf7427"],["/Python编程之Tkinter的使用01.html","9f074f501a0ab1bde576aa33a2ead335"],["/Python编程之Tkinter的使用02.html","47c1d54b02ed3ddcee46a368d36c6df0"],["/R.Swift高效引用资源文件.html","4223afab4d009bf138ff2288d23cdacf"],["/React Native之导航组件NavigatorIOS和Navigator.html","f6c7f29bcb6d8964702715d8a6549b1f"],["/ReactNaive之CSS和Flex布局.html","66b26b5538089ab9b1e0d829e33e5257"],["/ReactNaive之ScrollView和ListView.html","5543a5e2e15818b0eb765f9a129cdc94"],["/ReactNative之AsyncStorage本地存储.html","aa8bbb1f2174e48bef6e83b255ec2a13"],["/ReactNative之TabBariOS和TabNavigator.html","050fe15ed93a7271e342fb0358b2bf31"],["/ReactNative之iOS原生和JavaScript的交互.html","bf7ede61a7fa31235508ee987bb5a013"],["/ReactNative之基本组件.html","6bcd75600eb960a45762a3e720c743fe"],["/ReactNative之基本组件02.html","b6213ee02f8e4cbe3c5ad097c806878c"],["/ReactNative之手势识别.html","63e4f778474ba3c891f48547fbfc8644"],["/ReactNative基本动画之Animated.html","95efd542b7e3347646e4b69d086423b0"],["/ReactiveCocoa 的一些高级用法.html","c66e474df3552697a67b232a43ce2b97"],["/ReactiveCocoa之集合使用详解02.html","8622def89c2e4275644efb5da1ec25bc"],["/ReactiveCocoa使用详解01.html","35c9ada9ec804c3766a17640d12be68f"],["/Realm在iOS中的简单使用.html","3b59dd9865f8ce7b8ee2594732d247e0"],["/RxSwift+Moya网络请求之项目实战.html","6862d49d8bd0d425cedccdcd4e3815cd"],["/RxSwift的使用详解01.html","bc6f5799bb8338a21d065871b6e0c709"],["/RxSwift的使用详解02.html","e8fbc9fd9b5b119da6de97c78022d490"],["/Sign In with Apple.html","4d402b6e4209ce8075ef040cc50029ee"],["/Socket搭建即时通讯服务器.html","6312e242ccf0f4af1aadfb99a885ccbf"],["/Swift 4.1 的新特性.html","438c4bd4811c3dbffe33d97a0fda66e8"],["/Swift 4.2 新特性更新.html","02b66dfdf254be67acddd5dec081647e"],["/Swift 5.0新特性更新.html","ca24ad1a8752b54bed95d2a8b4ab1403"],["/Swift4.0新特性之String和Array和Dictionary.html","94e31cd9b00d1bc09cb8d09d19b8c86d"],["/SwiftLint代码规范属性说明01.html","8fcc992c609dc8c849e50193371ea73a"],["/SwiftLint代码规范属性说明02.html","46574c7a13ee77c24492b5d2d16550a0"],["/SwiftLint代码规范属性说明03.html","9ce8b145c717ad14bf3319ffedb7a92b"],["/Swift之Facebook的POP动画使用和实战.html","ba3602f9b0a187962c4f511b3920fef5"],["/Swift之Vision 图像识别框架.html","740afbab90f3df1eb568431003c8d658"],["/Swift之二维码的生成、识别和扫描.html","8815f8c54a8b31eaba3ce7b272aec93e"],["/Swift之删除HTML5页面的广告.html","11d0954aba6e949dd1ed1c664422fe09"],["/Swift之微信朋友圈图片浏览器.html","45ed544a8c4ba746df679bab00ed2d52"],["/Swift仿网易新闻首页左右滑动切换页面.html","c5d8ac6bcaeabccd143d18555ce34a56"],["/Swift函数式编程之高级用法.html","20213025b47c0fae2099be48a2ce1e87"],["/Swift基本语法01.html","a6cc250c0c217024431b5d91ec1a4626"],["/Swift基本语法02.html","f1f88627452800d552b5a75982df3134"],["/Swift基本语法03.html","f13a825509a80e9c08b73d77b27c2f37"],["/Swift开发之3DTouch实用演练.html","f47be7e3e436f86639bd5df236f820b9"],["/Swift版-H5页面实现长按保存图片.html","d0592316c362dfac8524d42ac0db7f25"],["/Swift语音和文本的转换.html","2153d7fb0e3f7b3ba5d8e25f611faac6"],["/Swift项目创建桥接文件.html","82c1d82377c1ae3cefc588ecfaddf17b"],["/Tkinter之组件布局和事件绑定.html","b1fb8c7a3f146928b1429e13be1812cf"],["/Xcode代码规范之SwiftLint配置.html","42102406d6aeb5e36ff20c2256192d5b"],["/about/index.html","f693e21448c095c0b313b2816ab862b9"],["/archives/2016/10/index.html","5dfa165b2d592f56082552c1a0a9067a"],["/archives/2016/11/index.html","30def7a73b7a39d0d32b3cf59f6f4338"],["/archives/2016/12/index.html","1d52922eca3819d72f2c7c89ef5536d2"],["/archives/2016/index.html","22d1403b18c5954a508662fbe041421e"],["/archives/2017/05/index.html","ed4e01a487dca072554ec00ed44372db"],["/archives/2017/06/index.html","1b56d74d61cfaea24864eef4c64ac7ce"],["/archives/2017/07/index.html","9f4ae0e82d8ef65bb8a091bec91a3917"],["/archives/2017/08/index.html","e1c220f04a17a72ee92902ecdc7abb79"],["/archives/2017/09/index.html","a50e6f7d23b12fc404d2631ca773625c"],["/archives/2017/10/index.html","74aedf4f412fd16af51b05897c279e2a"],["/archives/2017/11/index.html","e325906abac7ffdf20f1828d2df82734"],["/archives/2017/12/index.html","3b367a94c541c4dd94b8a9c5c7522323"],["/archives/2017/index.html","3e68cd22b19075d5143d6609cc2cd4f5"],["/archives/2017/page/2/index.html","6d88d01e2e25131b1efce44f8f5a8602"],["/archives/2018/01/index.html","515b59ab9c08b5e08e6a670f48ecca8b"],["/archives/2018/02/index.html","d84c53e9fbd9ede6835790eceeaecaf9"],["/archives/2018/03/index.html","33fb1fc3150a78684340eb2b63b69dd1"],["/archives/2018/04/index.html","b7ee74b4fa2e48d79d0bfe5a4a1d445d"],["/archives/2018/05/index.html","9e8f9f539d5d0e4a42dd90f668e821d8"],["/archives/2018/06/index.html","e2226ee5518b7301f45bb934c16f33b6"],["/archives/2018/07/index.html","f517436c429b16cffe42da7f7391d0d8"],["/archives/2018/08/index.html","cc4d39dd6588cd25ebc81b2d9695bfc7"],["/archives/2018/09/index.html","6309f42f6b99e0fc80face5c5c4bfaed"],["/archives/2018/10/index.html","70e95f499dd37523e632e64feafea465"],["/archives/2018/11/index.html","e518849af168b7d4dbd164bd41c9881a"],["/archives/2018/12/index.html","7c23dbec9b7558242cb549c167c3e84e"],["/archives/2018/index.html","dbe47bbd64fdd0ad10a570441bbf2308"],["/archives/2018/page/2/index.html","8a8458ffd43aa142dd7a172c8ebe136c"],["/archives/2018/page/3/index.html","182d16c96e0149d337f9993581d707dd"],["/archives/2018/page/4/index.html","1e45bfd65bdc22caa7cac44b4119f9e6"],["/archives/2019/01/index.html","d9b210b767935b79dd52c52fa0a16f9a"],["/archives/2019/02/index.html","cf71de416cd17dfff1c280f63cca6e20"],["/archives/2019/03/index.html","4abc0cb3e19cbb5cf3f15d94272fd9cf"],["/archives/2019/04/index.html","5be79609194b5e62e04174dff78dc375"],["/archives/2019/05/index.html","bbe95f41dad19bd50e84e66420a95bc2"],["/archives/2019/06/index.html","d76a9a52836ea176bdfdc72348bb295f"],["/archives/2019/08/index.html","768b51fde9fd29e20b540aa7b51abd51"],["/archives/2019/09/index.html","796cf18c18828695616d1fb19b97c27f"],["/archives/2019/12/index.html","d0eea7c312717ad17bdc794f3d2374f4"],["/archives/2019/index.html","a39b92521a07672edfe777194fcaa702"],["/archives/2019/page/2/index.html","770373a11bb2eb2b7fb94df143c1d42f"],["/archives/2020/01/index.html","899b87ae45687388c39abaac87a1fdd5"],["/archives/2020/05/index.html","e771deb47872026fe70597a48307d53b"],["/archives/2020/index.html","877764224cf3b466dba8368c4d81386f"],["/archives/index.html","3a7c60b8849fa4de235f1fc4db8f06e5"],["/archives/page/2/index.html","b8087066e96fe0673b3fb6557b9b5c2b"],["/archives/page/3/index.html","2c91851ce15a42e2d731401363329670"],["/archives/page/4/index.html","00b05d068257682bb88a9996c7524935"],["/archives/page/5/index.html","dfd0b406cae119bc501ceeb3a058e8a1"],["/archives/page/6/index.html","a07066adc9f73d3727ebec4a7844670c"],["/archives/page/7/index.html","5b00bc28d121f878329f7fdbe201f9c0"],["/archives/page/8/index.html","a1d9978bd1d29fcfeae11ad3124251c6"],["/av-core-mini-0.6.4.js","fae9ab7d7e6b3cabcc17ddee575b92d7"],["/baidu_verify_BQasuiUrVi.html","8fc4036eea9d7f1295e73a55a2aa15da"],["/categories/Flutter笔记/index.html","cde1ef45ad36cb5fa831797bbde4b3f2"],["/categories/HTML5/index.html","159924736541399c9743fd9fe77ec6fa"],["/categories/Hexo博客/index.html","aaa1b7529468a445decbe6126f3517a3"],["/categories/JavaScript笔记/index.html","17902dfbb84d323ad151d2e9fef4accb"],["/categories/Node-js笔记/index.html","d72427aafbc953c589e91f94dabc08ba"],["/categories/Python基础/index.html","4ace89fe57f56aa832cae94217824632"],["/categories/ReactNaive/index.html","9fc5c3e5e9873010572fef3f987813f6"],["/categories/ReactiveCocoa/index.html","26aedfbf5430f0285ec6b372f1872f8f"],["/categories/RxSwift框架/index.html","3e06947d2f13d98e7b19932eef41bf16"],["/categories/Socket学习笔记/index.html","46d1656481ab248b24c6348ea0f8eff4"],["/categories/SwiftLint/index.html","64ea02a660d6d16720707f96535ace09"],["/categories/Swift学习笔记/index.html","18aeaaacdd947266e9e3e0c7f26f1576"],["/categories/Swift高阶功能/index.html","62e52b5d6b5f6c355b9d85031ebbf56e"],["/categories/Swift黑科技/index.html","9eb3dc34207324a62fbafe642c68a3f5"],["/categories/iOS动画/index.html","77340e465a478a772db21d9e92f2b3b2"],["/categories/iOS底层原理/index.html","7e716cbc69b705a39540c0ccc8a1584c"],["/categories/iOS进阶指南/index.html","37dd1495eb4fd97dec1e9e607a2ffdba"],["/categories/index.html","87385a556456d0043b892bf00242a757"],["/categories/入坑指南/index.html","ec3d808b83511acef096e071ca808714"],["/categories/数据库基础/index.html","ba0dda253431be9806320abe7dd9c123"],["/categories/组件化开发/index.html","4936fb812c2f8eba266dfa112aba78a3"],["/categories/高级用法/index.html","9a56eef75987df760975089063573000"],["/css/main.css","7bb8d7f9e63e6cae4574fddcfdc2f9e1"],["/googlefc329f0e8f9212c6.html","69202fdc36945fb4ca53b2b6585893b6"],["/iOS13适配深色模式(Dark Mode).html","ac6f942801773ac376c11cdda378d33f"],["/iOS9之UIStackView的使用.html","e87e9cc21431f9073d4c1996609112b8"],["/iOS之NSDate的Category.html","0ba875368fefafa372fe21544ff2d2c0"],["/iOS之Scanner字符串扫描类.html","d3adcd0ef2bd2b4018cecec2a0cb935a"],["/iOS之UICollectionView自定义布局.html","6832941c9003da249ec770ebe05609ba"],["/iOS之UIMenuController的简单使用.html","2fc7c3b7a780623c43a4a7b945e27d51"],["/iOS之UITableView设置全屏分隔线.html","952b59cc4525c45f97a4783871a5fac8"],["/iOS出门必备之CoreAnimation(核心动画).html","18cb2e6df82822103583e90c7eb4de37"],["/iOS的静态库和动态库.html","c706d508e9579eb6de18b2b9f468df2a"],["/iOS神技之动态更换APP的Icon图.html","7a06b0ec21f5d40cc1c7e65ae6c0be80"],["/iOS私有Api检测.html","786c7b481f54d0735b7db9fea9b349f1"],["/iOS组件化之私有库.html","37b751b09e53d62ae05fbe0274dd4176"],["/iOS黑科技之(AVFoundation)动态人脸识别(二).html","df0ea5c1416c48d4c9564229ec76cd9b"],["/iOS黑科技之(CoreImage)静态人脸识别(一).html","720931bb6105ab38f988bb5cde005bee"],["/images/algolia_logo.svg","fd40b88ac5370a5353a50b8175c1f367"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/avatar.gif","2bed513bc5f13733cf9a8a12c4e1a971"],["/images/avatar.jpg","8e538570515174c6f9f27f385ad5ec4e"],["/images/cc-by-nc-nd.svg","1c681acc4a150e7236254c464bb5a797"],["/images/cc-by-nc-sa.svg","12b4b29e8453be5b7828b524d3feabce"],["/images/cc-by-nc.svg","dd9cfe99ed839a4a548114f988d653f4"],["/images/cc-by-nd.svg","2d80546af20128215dc1e23ef42d06c2"],["/images/cc-by-sa.svg","c696b3db81cbbfba32f66c1dc88b909a"],["/images/cc-by.svg","6c4f8422b3725cb9f26b6c00e95fc88b"],["/images/cc-zero.svg","79deee77a07fcb79ff680ac0125eacb9"],["/images/favicon-16x16-next.png","b8975923a585dbaa8519a6068e364947"],["/images/favicon-32x32-next.png","5a029563fe3214c96f68b46556670ea1"],["/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/logo.svg","ddad9027e42111ccd5b466bc18188970"],["/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/quote-l.svg","1238a4baccd02c6025ec85b58f4282d4"],["/images/quote-r.svg","85787c6fa27965c81f7be70252b43bed"],["/images/searchicon.png","3d6b5c9d6d6c26a2b76a14b8fdf3438a"],["/images/wechat-qcode.jpg","f6d35f663d5ebc7326df57cdbf81bed8"],["/index.html","f1062cc18e8942f51e793a21213bac0b"],["/js/src/Valine.min.js","3fa7b322b49d94daadc5b654fbb0480d"],["/js/src/affix.js","683c19859764baf0d17538897ea1eba2"],["/js/src/algolia-search.js","f5fa392318805997089ceb3a925979ba"],["/js/src/bootstrap.js","2a1083772854ae2663748e0a25c17285"],["/js/src/exturl.js","2b444179b3145e5007b4d371dac07cd3"],["/js/src/hook-duoshuo.js","45997b0c06abff3cd88efd901f614065"],["/js/src/instantclick.min.js","53a0bdbc01875e28d512e3d59d72f990"],["/js/src/js.cookie.js","6e9eb1f53afb135aedaf90739c867738"],["/js/src/motion.js","0f6add86607c451269d0b3d286c84d8b"],["/js/src/post-details.js","b8e8e27c27c697567879c52888ffc24c"],["/js/src/schemes/pisces.js","827b5ad25e1142277c1e7dfe0cacebe5"],["/js/src/scroll-cookie.js","890406ae3539e4721ef5f314542e5e46"],["/js/src/scrollspy.js","fafdd7ab6af233b701506c733910b7f5"],["/js/src/utils.js","24512c3455f976730b7bf75e1222c533"],["/lib/Han/dist/font/han-space.woff","b09f2dd7d3ad8ad07f3b8495133909d9"],["/lib/Han/dist/font/han.woff","e841c6b547bc06a06f60f4de52bf906e"],["/lib/Han/dist/han.css","cfcc552e7aebaef5e2f34aee030b956b"],["/lib/Han/dist/han.js","575b6c1667c01798730fbd972e959c9c"],["/lib/Han/dist/han.min.css","cab466d758269b437167422c4a16b364"],["/lib/Han/dist/han.min.js","96482c9c2b3c5ea9bf5a40db162c7f34"],["/lib/algolia-instant-search/instantsearch.min.css","029a13b44e6807955106ff3c075a02f9"],["/lib/algolia-instant-search/instantsearch.min.js","0db46eba0c8133693ee839507b1612f2"],["/lib/canvas-nest/canvas-nest.min.js","36e103d2a05bc706bac40f9ab8881eb7"],["/lib/canvas-ribbon/canvas-ribbon.js","16dc214240913551986593808c2efcfc"],["/lib/fancybox/source/blank.gif","325472601571f31e1bf00674c368d335"],["/lib/fancybox/source/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["/lib/fancybox/source/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["/lib/fancybox/source/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["/lib/fancybox/source/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["/lib/fancybox/source/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["/lib/fancybox/source/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.css","cac75538c2e3ddfadef839feaca8e356"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.js","f53c246661fb995a3f12e67fa38e0fa0"],["/lib/fancybox/source/helpers/jquery.fancybox-media.js","c017067f48d97ec4a077ccdf056e6a2e"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.css","52ddd84a9f42c1d4cd86d518a7f7e8bc"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.js","cf1fc1df534eede4cb460c5cbd71aba6"],["/lib/fancybox/source/jquery.fancybox.css","6c55951ce1e3115711f63f99b7501f3a"],["/lib/fancybox/source/jquery.fancybox.js","921e9cb04ad6e2559869ec845c5be39b"],["/lib/fancybox/source/jquery.fancybox.pack.js","cc9e759f24ba773aeef8a131889d3728"],["/lib/fastclick/README.html","7e33723f6b8a9f55a1ce3979e3d505ed"],["/lib/fastclick/lib/fastclick.js","6e9d3b0da74f2a4a7042b494cdaa7c2e"],["/lib/fastclick/lib/fastclick.min.js","a0fc6c24d1f3ff9ac281887c92b24acd"],["/lib/font-awesome/css/font-awesome.css","c495654869785bc3df60216616814ad1"],["/lib/font-awesome/css/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/lib/font-awesome/fonts/fontawesome-webfont.svg","912ec66d7572ff821749319396470bde"],["/lib/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/lib/jquery/index.js","32015dd42e9582a80a84736f5d9a44d7"],["/lib/jquery_lazyload/CONTRIBUTING.html","7287727950845c8a1010f3933691afef"],["/lib/jquery_lazyload/README.html","cffa5707f0d54c9f561715e0809487bd"],["/lib/jquery_lazyload/jquery.lazyload.js","8b427f9e86864ee3aaf1ae33e6e14263"],["/lib/jquery_lazyload/jquery.scrollstop.js","f163fd8f02361928853668a96f8a1249"],["/lib/needsharebutton/font-embedded.css","dd8861d10d1ed6b5e0c0011adfb39be9"],["/lib/needsharebutton/needsharebutton.css","30f2f800e13f7b6b83629a4cbd9749ef"],["/lib/needsharebutton/needsharebutton.js","6c6f855f7d50f4bc3c804f52b03bbfbb"],["/lib/pace/pace-theme-barber-shop.min.css","e8dc66cf2d88abc25fbc89b8a0529abb"],["/lib/pace/pace-theme-big-counter.min.css","db2b8fe31e60f19021545277d2f6e05e"],["/lib/pace/pace-theme-bounce.min.css","ad954aa0bace4b213eeb19d6e89a0bda"],["/lib/pace/pace-theme-center-atom.min.css","8f6bc803acefc6f93afc98fb38201456"],["/lib/pace/pace-theme-center-circle.min.css","93c72298781226a80a9c66b27b21a57d"],["/lib/pace/pace-theme-center-radar.min.css","f0099bdd1cd42e9476bd7abc417c0328"],["/lib/pace/pace-theme-center-simple.min.css","eddff4756dbf21dbbff1c543bd894dde"],["/lib/pace/pace-theme-corner-indicator.min.css","776826157cb28ac1ee5e78771292b9ba"],["/lib/pace/pace-theme-fill-left.min.css","965859b39001da08e1e92327fe3d8e12"],["/lib/pace/pace-theme-flash.min.css","aab39b436e1fa0fdc51df06f2d53c38a"],["/lib/pace/pace-theme-loading-bar.min.css","4e05877f1f9efb9c1e7dd75cb78c764f"],["/lib/pace/pace-theme-mac-osx.min.css","29ae030ceaa8158352c5472218375b91"],["/lib/pace/pace-theme-minimal.min.css","f48f04d370993b55a2745e548cc82743"],["/lib/pace/pace.min.js","24d2d5e3e331c4efa3cda1e1851b31a7"],["/lib/three/canvas_lines.min.js","1324174ae6190fbf63b7bf0ad0a8a5bd"],["/lib/three/canvas_sphere.min.js","5c6bc45b137448b5b9df152ccfb2659c"],["/lib/three/three-waves.min.js","41059bd5e5c7aa520b1b411919e5121f"],["/lib/three/three.min.js","3298078bce82bdb1afadf5b1a280915e"],["/lib/ua-parser-js/dist/ua-parser.min.js","a6e833266c4b41fabb9ba94a145322d8"],["/lib/ua-parser-js/dist/ua-parser.pack.js","6b627e4d61a7135952824bb9c1a4a134"],["/lib/velocity/velocity.js","0361fa6dcf4cf4d19c593cdab0937dd0"],["/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/lib/velocity/velocity.ui.js","f55d22cc592c9f8d4ffd3b41a6b90081"],["/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/navigation/index.html","722d805b18a9645977efc0bc54025a53"],["/page/10/index.html","2daac1369e0b8990d6279d216d42e3bd"],["/page/11/index.html","618406348d7ba84d3e1ec573eea81780"],["/page/2/index.html","d190a5714ad854421180da6fdfa8a114"],["/page/3/index.html","ef81f1e646269096db1130839d538fb3"],["/page/4/index.html","dc7583a00e98a21bc8dc0e4d8aaebb70"],["/page/5/index.html","45279f43b32f0b606cbc8d4e42a977c7"],["/page/6/index.html","7450e82d8367419958ab73b3d4fb2553"],["/page/7/index.html","278e77f0b2835fe3cb6c8fe3e242a8bf"],["/page/8/index.html","51b27db416977ba13dfd554765fd5f99"],["/page/9/index.html","994a1c6fae0daf149373f518b31a7fe9"],["/sw-register.js","458ee22caad106dd14c7df726736e4f4"],["/tags/3DTouch/index.html","4c59ad33d357a01a51909ef694a9f2ad"],["/tags/API/index.html","c26aebe5d14be24d5d036709da6d7315"],["/tags/APP/index.html","69fd1fcf21d272f937d1beca3a4ac4a9"],["/tags/AVFoundation/index.html","f257bdceac8975c769f9872c8f6b8216"],["/tags/Action/index.html","774ea202d8285fbe916b481fabc0723d"],["/tags/Alert/index.html","4510ca49387b9b83d0a628fe1db8474a"],["/tags/Android/index.html","f23445e3bcfad4b69b5b9dbc4d4c0995"],["/tags/Animated/index.html","b79eee211b3758e81facf08f2c22ea19"],["/tags/AppIcon/index.html","8219f475057b0a237aeb0d37e6d951cb"],["/tags/Array/index.html","046c26497f1fdba0098bda910840ae9c"],["/tags/AsyncStorage/index.html","521d230e1d25369ca50f6ce0befc2eaa"],["/tags/Block/index.html","72923246c77ddfe72b806f2d3191267a"],["/tags/CATransition/index.html","fa15e65ed8973a9f33c151a2863d66a7"],["/tags/CFRunLoopRef/index.html","ed20871c88c469244104e7700a8ccaa8"],["/tags/CIDetector/index.html","f59f22a1dc1982c38b8403319fd92da5"],["/tags/CIFilter/index.html","6e3d7064b413f3a1f84838e8390c1ec2"],["/tags/CSS/index.html","3634f1e34283500da4b0fffcfe2bd049"],["/tags/Calendar/index.html","59b3f4271898abba86dbecb56bde0319"],["/tags/Category/index.html","f22114fa7b17f66fb80cdf39f6cb19ad"],["/tags/Cliboard/index.html","1f1300caaaa9d63bbfa515f16e66d629"],["/tags/CocoaPods/index.html","4a5abde36b45ad6562704e0ebc72daf7"],["/tags/CoreAnimation/index.html","77411b79501a110221bfbb6b67fd75d7"],["/tags/CoreImage/index.html","1bece6c9878590f2af9db8b7861c250f"],["/tags/Dart/index.html","6edfa02bebde0acabd5a40d7303577f4"],["/tags/Dictionary/index.html","3bdc68f29232aa00885815b75bdb4514"],["/tags/Equatable/index.html","6af9519b85a3f05700ec0f6f1b4b8170"],["/tags/Error/index.html","fd68edf0f6fcbd1320466fbe3d49050f"],["/tags/Express/index.html","6057eddc4806e32954c2e042ae729eb2"],["/tags/Facebook-POP/index.html","00404d4f342b4fb9b8ec7167cad0a415"],["/tags/Flex/index.html","dcc1dfb136d1189639411bc9a0fec5bb"],["/tags/Flutter/index.html","75c82ce54cd10aed9fb7b3af02e9061c"],["/tags/Github/index.html","af5ad3b84bfac8b23b5ce0dc552e229b"],["/tags/HTML5/index.html","7033c84ec5cf2e6dba743b1941ed739f"],["/tags/HTML5标签/index.html","6250f7f31b3211ed818f047b38618f10"],["/tags/HTTPS/index.html","e3335d0e2533ed95032bb4f23f63f2a7"],["/tags/Hashable/index.html","fcddb0ac2ea20a60ec1f635bfca31b94"],["/tags/Hexo/index.html","609ef314b18492e73277119abe0fd0f6"],["/tags/Homebrew/index.html","9cefa7261e41b98cbae5ace377db9464"],["/tags/Image/index.html","104db4a99fc0b220917ed689e48e5958"],["/tags/JavaScript/index.html","23551eb9c23b3c838de7f23d4f62de29"],["/tags/KVC/index.html","217c5897d49247b3341a77df6a4e7511"],["/tags/KVO/index.html","7a0e1ba00af131498cea3c3df0619c84"],["/tags/LayoutAnimation/index.html","54224ba51c2992dae133cc686a6841c7"],["/tags/List/index.html","5325542bfa1c0ab4d1415e6e4a08beac"],["/tags/ListView/index.html","87b9e07bf30385742a8d5ce20c471342"],["/tags/Mac-工具/index.html","17dec13c13d768facc42acbcbde58e65"],["/tags/MacOS/index.html","788fab0b960961b1a6a6c8c17ea78bf2"],["/tags/MongoDB/index.html","51d60eef916ffa3dd840f00b0ab6338b"],["/tags/MySQL/index.html","130b69f74622c224eae9dae880c1678b"],["/tags/NSRunLoop/index.html","c3968d1cda8f824f972e9bad2c8d5f28"],["/tags/Navigator/index.html","d59c5fb8beb8624548efb5615ebb432f"],["/tags/NavigatorIOS/index.html","ae6820a06fda33417f6878e425f50e29"],["/tags/NexT/index.html","326292c1d710cbafb2a87ba8061fc04a"],["/tags/NoSQL/index.html","4b6de2801843ea60f80026fb353ca3ce"],["/tags/Node-js/index.html","62b8fca57ebb255fd6f316adf1abf465"],["/tags/Objective-C/index.html","18cd4e2d55e30f387a4216cc864b91fa"],["/tags/PanResponder/index.html","7455124004e977425086c97a196fbdd1"],["/tags/Pillow/index.html","82218eccd5c0e5c997d262250f4a12b4"],["/tags/Property/index.html","fd53383b1ae534d186838785d096278a"],["/tags/Python/index.html","c6ca82c11416789234f145474be06a2f"],["/tags/R-Swift/index.html","32a31bfa5f9c93948388531a68edafc2"],["/tags/RACSequence/index.html","62e198ab6b256248da288e742b98e711"],["/tags/RACSingle/index.html","82b7eb70e8d61fa13420e7966e02dfd9"],["/tags/RACSubject/index.html","1cedb7a1e479694d0462ededbcc63345"],["/tags/RACTuple/index.html","274e59fb77371da69e19e8a7dd55b90b"],["/tags/ReactNative/index.html","f6c5b07834fa451832161eece6c66eb2"],["/tags/Realm/index.html","962eebe1b108d078b8d5db5aa0befa59"],["/tags/Redis/index.html","d650941de5c7c1251bb8bf417515efc3"],["/tags/RunLoop/index.html","b39f451f99b2613c4dcdfbe456bee5e9"],["/tags/RxSwift/index.html","0f78fa66d68d279c476d104c7576c067"],["/tags/Scanner/index.html","abe52343a7d00928ea8e074e98913da4"],["/tags/ScrollView/index.html","5e1eaea8bbe210af03b047c989ff0e6c"],["/tags/Socket-IO/index.html","5c024f9385c557f10f9e7c6fe9252087"],["/tags/Socket/index.html","73ddfa2fd9c2b218fa8d609bae3c88f2"],["/tags/Speech/index.html","54d2815990f4a7ff7a9693eb433449fa"],["/tags/Swift/index.html","15550907a18cd88d98a5332f65187f5f"],["/tags/Swift/page/2/index.html","4d2e2b2a538857f41af7ba5be19d7773"],["/tags/Swift3-0/index.html","89fab0329e45c2473b4d774e6594de41"],["/tags/Swift4-0/index.html","01dbdf3a5ffcfe8e5689a35342a5e8d7"],["/tags/Swift4-1/index.html","55afebc5ced8f7b34488ddc616632549"],["/tags/Swift4-2/index.html","4798f15500a93332fdce1541031a1e9b"],["/tags/Swift5-0/index.html","1dd35a61e6c502f792a534fdde4f65a3"],["/tags/Swift5-1-2/index.html","9f90bcca91ec47f1dc6f1d59dbb2c353"],["/tags/SwiftLint/index.html","a4137d2b5092a8ce1c16d5195fa91254"],["/tags/TabBariOS/index.html","733d88b328c1bc4760533877eaf934c1"],["/tags/TabNavigator/index.html","b79371fa2b1eb51a4d1c3c1f57696b1d"],["/tags/Text/index.html","3fd83a3a5e6a145b05e6035fe42a83a2"],["/tags/TextField/index.html","ef326b2e5b00249bb9e439e36bb63f2f"],["/tags/Tkinter/index.html","77de849613f17e987cc6a3f32f0ad5a8"],["/tags/Tuple/index.html","cc2cdc04cd41350cd06fb5f63b9961e2"],["/tags/UIBesizationv/index.html","df5bfb7c328d0d9ab02cf1733669e4a2"],["/tags/UICollectionView/index.html","f347dae500e4c7f3e5b1cb2e9913ffd7"],["/tags/UIMenuController/index.html","b821882eb4fb13f586bbe266de224c29"],["/tags/UIStackView/index.html","435170f6d42b4dff681c5133794cdc11"],["/tags/UITableView/index.html","8946e963df10b77d87a48c1adb48ffdd"],["/tags/View/index.html","01763e413272f6331bec7d318fe79786"],["/tags/Vision/index.html","e1ce28874cac78065a02dce58a9a8c47"],["/tags/Web/index.html","bf21425c0ea9355632f210f67a58149c"],["/tags/WebSocket/index.html","8240145f2fbef945b37e14d9bf117543"],["/tags/WebStorm/index.html","354218af2f1f0f580ad2d2fe8f8e4f95"],["/tags/WebView/index.html","f338a4aed4a533011c48dacecc07da8f"],["/tags/Widget/index.html","2703565bd998763de3a69ca4d5a7b0a3"],["/tags/Xcode11/index.html","b7d37b9d07833ac88b013d2c10809297"],["/tags/busuanzi/index.html","1fb8aa9a3ab0975b8dafa9cba45305d9"],["/tags/dynamicCallable/index.html","57b54760fbeb4007f64ead84396fa277"],["/tags/fastlane/index.html","3fa55b0f748d9d44d47048d51fda5cab"],["/tags/filter/index.html","bff69044c637ee821c55505c6fd0194b"],["/tags/framewoframework/index.html","06c5fe7379069367233096459dca60f3"],["/tags/git/index.html","a14902f398a631d4921a465f5a33c16b"],["/tags/iOS-10-3/index.html","20e4f1365b1c42b1b93ff54ce95a958f"],["/tags/iOS/index.html","6c21e58ab40f6f36f26bb741061e655a"],["/tags/iOS13/index.html","a293e78cd36c0e9c9b0f976b82039d14"],["/tags/iOS扫描器/index.html","4351dd880af36f58a0b42ddcd98353f5"],["/tags/index.html","efd4764e25e02fd9b9b4f10a08619633"],["/tags/ipa/index.html","7d4b9dc7ae907b27af04a146c2885cca"],["/tags/lane/index.html","7bd07631627da4da4953594df6b01fc8"],["/tags/map/index.html","a76c2d53d4f8c0aed467884ccdee3f2d"],["/tags/onPress/index.html","2d3ff64dbb40fe6d242b70bbc9a10245"],["/tags/os/index.html","3867723430d966d9df277b5afa5b2567"],["/tags/pip3/index.html","6133f129b125d51fa69d1fcc9a8a89fc"],["/tags/pod/index.html","1a9b0b4d24b5114c745c25a9b48f5ecb"],["/tags/pymongo/index.html","c6622442cc6a54ff088b47a461608085"],["/tags/random/index.html","972aec808fa762b8fd357899d8c26890"],["/tags/reduce/index.html","dbd250f1b0f48334066eed6cfed4cc21"],["/tags/spec/index.html","11764b4c45ceb7db0ceca992f73d123a"],["/tags/string/index.html","d6edb02cf82482778488e9f32085a9cd"],["/tags/trunk/index.html","40d84b832b6e3bbfa20459d78a8700db"],["/tags/unowned/index.html","f1713f82a61e1975ad3cf42b121ac5ed"],["/tags/weak/index.html","86f91ce13d707a2ef9bb13ae79282794"],["/tags/不蒜子/index.html","2a2e20050a115623f10a10c0abe9f527"],["/tags/入坑/index.html","c5e8c8e91f193289929816cdf6b30808"],["/tags/内存管理/index.html","3327c83bbb8e64003da4088e5be44a89"],["/tags/函数式/index.html","8deab9584caeb88670f57927ed9536bb"],["/tags/判断语句/index.html","cb860c1ef86670f0bef00d3266e17e37"],["/tags/动态库/index.html","69c4396989661c7ba5c2683703fd1617"],["/tags/同步管理/index.html","c6f7a751769a7cb7c098200fac347b09"],["/tags/响应式/index.html","ff06c31643ecd8191d178d25f4517e95"],["/tags/响应式编程/index.html","a1c51427b26bd01faa1b40a59257d7f9"],["/tags/多设备/index.html","5e9304f03deb10be3e8f00da4fc97f1c"],["/tags/富文本/index.html","2b86562cf3d9e44bd045b9479542c81b"],["/tags/属性/index.html","856c28792e7c179c2fb538e80a6e91e4"],["/tags/数据类型/index.html","68571db85dd77c5683616108259bd331"],["/tags/文件/index.html","89b9bdfcaa6dd9ab713d525f05f01260"],["/tags/框架/index.html","7e8548f5bf6b6610c29204fe4a420222"],["/tags/桥接/index.html","d0b9abaed7b7ac9b6b9c7e7bfe546582"],["/tags/正则表达式/index.html","14170864baaff76dfa510bf81f13c719"],["/tags/自定义样式/index.html","ac57f2d446dc0c765c88b2714ddbf786"],["/tags/规则/index.html","799c269c085ed6f6fa9c7e12395b62c5"],["/tags/语法/index.html","92e74a7d9648be4df713690ebda9d2ac"],["/tags/运算符/index.html","98dea4c583bd737014b3314c8200dd97"],["/tags/错误异常/index.html","6be5eaa883c8732e3a5a6a080b69d924"],["/tags/静态库/index.html","ad4d8dc9a1ece471622f730a1beb1348"],["/tags/面向对象/index.html","9749536e7b868c78ff9777a05d920de7"],["/tags/高级用法/index.html","e5ee9cf8060b46bc5a01c5c0358c140e"],["/tags/高阶函数/index.html","ac8906d97dda627b184998f8b38f75bf"],["/top/index.html","e9755b5d7da2748f77b3be4063f1b37f"],["/uploads/avatar.jpg","8e538570515174c6f9f27f385ad5ec4e"],["/uploads/wechat-qcode.jpg","f6d35f663d5ebc7326df57cdbf81bed8"],["/升级Swift4.0遇到的坑.html","4d1a3621fc7fcb8332d605d951f8220b"],["/发布开源框架到CocoaPods入坑指南.html","01c5784aad0f7603be469b1370b4e886"],["/基于GitHub和Hexo搭建个人博客.html","5ea390e7dec14d3015f60463cd109180"],["/探索KVC和KVO的本质.html","200590a37fc307eb28c645ab42a580f7"],["/浅谈OC中Block的本质.html","d5e452b6e6f36564f6033894fb225d42"],["/浅谈Swift的内存管理.html","622f4746d225267e51053773a889be44"],["/浅谈Swift的属性(Property).html","2a400901ba23df035f07bbddd74ac9e9"],["/移动开发之Fastlane自动化.html","ce678ca0d351d7ab6c472ae872c0f404"],["/简析OC中对象占用内存的原理.html","21abe904bb0f4b60a505806e569bcd13"]];
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
