---
title: Flutter中Widget的生命周期和渲染原理
tags:
  - Flutter
  - Widget
  - Element
  - Key
categories: Flutter笔记
abbrlink: f26f2a71
date: 2020-05-21 00:00:00
image:
---



![widget](https://titanjun.oss-cn-hangzhou.aliyuncs.com/flutter/maxresdefault.png?x-oss-process=style/titanjun)


<!--more-->


- 原文博客地址: [Flutter中Widget的生命周期和渲染原理](https://www.titanjun.top/Flutter中Widget的生命周期和渲染原理.html)
- 之前的[`Flutter`系列文章](https://www.titanjun.top/categories/Flutter%E7%AC%94%E8%AE%B0/)中都有介绍一些常用的`Widget`这里就主要了解`Flutter`的渲染原理和`Widget`的生命周期


## `Flutter`中`Widget`的生命周期

- `StatelessWidget`是通过构造函数(`Constructor`)接收父`Widget`直接传入值，然后调用`build`方法来构建，整个过程非常简单
- 而`StatefulWidget`需要通过`State`来管理其数据，并且还要监控状态的改变决定是否重新`build`整个`Widget`
- 这里主要讨论`StatefulWidget`的生命周期，就是它从创建到显示再到更新最后到销毁的整个过程
- `StatefulWidget`本身由两个类组成的：`StatefulWidget`和`State`
- 在`StatefulWidget`中的相关方法主要就是
  - 执行`StatefulWidget`的构造函数（`Constructor`）来创建出`StatefulWidget`
  - 执行`StatefulWidget`的`createState`方法，来创建一个维护`StatefulWidget`的`State`对象
  - 所以我们探讨`StatefulWidget`的生命周期, 最终是探讨`State`的生命周期
- 那么为什么`Flutter`在设计的时候, `StatefulWidget`的`build`方法要放在`State`中而不是自身呢
  - 首先`build`出来的`Widget`是需要依赖`State`中的变量(数据/自定义的状态)的
  - `Flutter`在运行过程中, `Widget`是不断的创建和销毁的, 当我们自己的状态改变时, 我们只希望刷新当前`Widget`, 并不希望创建新的`State`


![图片来源网络](https://titanjun.oss-cn-hangzhou.aliyuncs.com/flutter/widget_life.jpg)





上面图片大概列出了`StatefulWidget`的简单的函数调用过程


### constructor

调用`createState`创建`State`对象时, 执行`State`类的构造方法（`Constructor`）来创建`State`对象


### initState


- `initState`是`StatefulWidget`创建完后调用的第一个方法，而且只执行一次
- 类似于`iOS`的`viewDidLoad`，所以在这里`View`并没有完成渲染
- 我们可以在这个方法中执行一些数据初始化的操作，或者发送网络请求


```dart
  @override
  void initState() {
    // 这里必须调用super的方法
    super.initState();
    print('4. 调用_HomeScreenState----initState');
  }
```


- 这个方法是重写父类的方法，必须调用`super`，因为父类中会进行一些其他操作
- 另一点在源码中, 会看到这个方法中有一个`mustCallSuper`的注解, 这里就限制了必须调用父类的方法


```dart
  @protected
  @mustCallSuper
  void initState() {
    assert(_debugLifecycleState == _StateLifecycle.created);
  }
```

### didChangeDependencies

- `didChangeDependencies`在整个过程中可能会被调用多次, 但是也只有下面两种情况下会被调用
1. 在`StatefulWidget`第一次创建的时候`didChangeDependencies`会被调用一次, 会在`initState`方法之后会被立即调用
2. 从其他对象中依赖一些数据发生改变时, 比如所依赖的`InheritedWidget`状态发生改变时, 也会被调用


### build

- `build`同样也会被调用多次
- 在上述`didChangeDependencies`方法被调用之后, 会重新调用`build`方法, 来看一下我们当前需要重新渲染哪些`Widget`
- 当每次所依赖的状态发生改变的时候`build`就会被调用, 所以一般不要将比较好使的操作放在` build`方法中执行


### didUpdateWidget

执行`didUpdateWidget`方法是在当父`Widget`触发重建时，系统会调用`didUpdateWidget`方法


### dispose

- 当前的`Widget`不再使用时，会调用`dispose`进行销毁
- 这时候就可以在`dispose`里做一些取消监听、动画的操作
- 到这里, 也就意味着整个生命周期的过程也就结束了


### setState

- `setState`方法可以修改在`State`中定义的变量
- 当我们手动调用`setState`方法，会根据最新的状态（数据）来重新调用`build`方法，构建对应的`Widgets`
- `setState`内部其实是通过调用`_element.markNeedsBuild();`实现更新`Widget`


整个过程的代码如下:


```dart
class HomeScreen extends StatefulWidget {
  HomeScreen() {
    print('1. 调用HomeScreen---constructor');
  }
  @override
  _HomeScreenState createState() {
    print('2. 调用的HomeScreen---createState');
    return _HomeScreenState();
  }
}

class _HomeScreenState extends State<HomeScreen> {

  int _counter = 0;

  _HomeScreenState() {
    print('3. 调用_HomeScreenState----constructor');
  }

  @override
  void initState() {
    // 这里必须调用super的方法
    super.initState();
    print('4. 调用_HomeScreenState----initState');
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    print('调用_HomeScreenState----didChangeDependencies');
  }
  
  @override
  Widget build(BuildContext context) {
    print('5. 调用_HomeScreenState----build');
    return Scaffold(
      appBar: AppBar(title: Text('生命周期', style: TextStyle(fontSize: 20))),
      body: Center(
        child: Column(
          children: <Widget>[
            Text('当前计数: $_counter', style: TextStyle(fontSize: 20),),
            RaisedButton(
              child: Text('点击增加计数', style: TextStyle(fontSize: 20),),
              onPressed: () {
                setState(() {
                  _counter++;
                });
              }
            )
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    super.dispose();

    print('6. 调用_HomeScreenState---dispose');
  }
}
```

打印结果如下: 


```dart
flutter: 1. 调用HomeScreen---constructor
flutter: 2. 调用的HomeScreen---createState
flutter: 3. 调用_HomeScreenState----constructor
flutter: 4. 调用_HomeScreenState----initState
flutter: 调用_HomeScreenState----didChangeDependencies
flutter: 5. 调用_HomeScreenState----build

// 每次调用setState, 都会执行build
flutter: 5. 调用_HomeScreenState----build
flutter: 5. 调用_HomeScreenState----build
```



## Flutter渲染原理

在`Flutter`中渲染过程是通过`Widget`, `Element`和`RenderObject`实现的, 下面是`FLutter`中的三种树结构


![Flutter](https://titanjun.oss-cn-hangzhou.aliyuncs.com/flutter/flutter_tree.png?x-oss-process=style/titanjun)



### Widget

这是`Flutter`官网对[`Widget`的说明](https://flutter.dev/docs/development/ui/widgets-intro)

> Flutter widgets are built using a modern framework that takes inspiration from React. The central idea is that you build your UI out of widgets. Widgets describe what their view should look like given their current configuration and state. When a widget’s state changes, the widget rebuilds its description, which the framework diffs against the previous description in order to determine the minimal changes needed in the underlying render tree to transition from one state to the next.

- `Flutter`的`Widgets`的灵感来自`React`，中心思想是使用这些`Widgets`来搭建自己的UI界面
- 通过当前`Widgets`的配置和状态描述这个页面应该展示成什么样子
- 当一个`Widget`发生改变时，`Widget`就会重新`build`它的描述,框架会和之前的描述进行对比，来决定使用最小的改变在渲染树中，从一个状态到另一个状态
- 从这段说明中大概意思也就是
  - `Widgets`只是页面描述层面的, 并不涉及渲染层面的东西, 而且如果所依赖的配置和状态发生变化的时候, 该`Widgets`会重新`build`
  - 而对于渲染对象来说, 只会使用最小的开销重新渲染发生改变的部分而不是全部重新渲染
- `Widget Tree`树结构
  - 在整个`Flutter`项目结构也是由很多个`Widget`构成的, 本质上就是一个`Widget Tree`
  - 在上面的类似`Widget Tree`结构中, 很可能会有大量的`Widget`在树结构中存在引用关系, 而且每个`Widget`所依赖的配置和状态发生改变的时候, `Widget`都会重新`build`, `Widget`会被不断的销毁和重建，那么意味着这棵树非常不稳定
  - 所以`Flutter Engin`也不可能直接把`Widget`渲染到界面上, 这事极其损耗性能的, 所以在渲染层面`Flutter`引用了另外一个树结构`RenderObject Tree`



### RenderObject

下面是`Flutter`官网对[`RenderObject`的说明](https://api.flutter.dev/flutter/rendering/RenderObject-class.html)


> An object in the render tree.

> The RenderObject class hierarchy is the core of the rendering library's reason for being.

> RenderObjects have a parent, and have a slot called parentData in which the parent RenderObject can store child-specific data, for example, the child position. The RenderObject class also implements the basic layout and paint protocols.


- 每一个`RenderObject`都是渲染树上的一个对象
- `RenderObject`层是渲染库的核心, 最终`Flutter Engin`是把`RenderObject`真正渲染到界面上的
- `RenderObject Tree`
  - 在渲染过程中, 最终都会把`Widget`转成`RenderObject`, `Flutter`最后在解析的时候解析的也是我们的`RenderObject Tree`, 但是并不是每一个`Widget`都会有一个与之对应的`RenderObject`
  - 因为很多的Widget都不是壳渲染的Widget, 而是类似于一个盒子的东西, 对其他Widget进行包装的作用



### Element

下面是`Flutter`官网对[`Element`的说明](https://api.flutter.dev/flutter/widgets/Element-class.html)

> An instantiation of a Widget at a particular location in the tree.

> Widgets describe how to configure a subtree but the same widget can be used to configure multiple subtrees simultaneously because widgets are immutable. An Element represents the use of a widget to configure a specific location in the tree. Over time, the widget associated with a given element can change, for example, if the parent widget rebuilds and creates a new widget for this location.

> Elements form a tree. Most elements have a unique child, but some widgets (e.g., subclasses of RenderObjectElement) can have multiple children.


- `Element`是`Widget`在树中具有特定位置的是实例化
- `Widget`描述如何配置子树和当前页面的展示样式, 每一个`Element`代表了在`Element Tree`中的特定位置
- 如果`Widget`所依赖的配置和状态发生改变的时候, 和`Element`关联的`Widget`是会发生改变的, 但是`Element`的特定位置是不会发生改变的
- `Element Tree`中的每一个`Element`是和`Widget Tree`中的每一个`Widget`一一对应的
  - `Element Tree`类似于`HTML`中的虚拟`DOM`, 用于判断和决定哪些`RenderObject`是需要更新的
  - 当`Widget Tree`所依赖的状态发生改变(更新或者重新创建`Widget`)的时候, `Element`根据拿到之前所保存的旧的`Widget`和新的`Widget`做一个对比, 判断两者的`Key`和类型是否是相同的, 相同的就不需要重新创建, 有需要的话, 只需要更新对应的属性即可



## 对象的创建过程

### Widget

- 在`Flutter`中`Widget`有可渲染的和不可渲染的(组件`Widget`)
  - 组件`Widget`: 类似`Container`....等等
  - 可渲染`Widget`: 类似`Padding`.....等等
- 下面我们先看一下组件`Widget`(`Container`)的实现过程和继承关系


```dart
// 继承关系Container --> StatelessWidget --> Widget
class Container extends StatelessWidget {
  @override
  Widget build(BuildContext context) {}
}

// 抽象类
abstract class StatelessWidget extends Widget {
  @override
  StatelessElement createElement() => StatelessElement(this);
  
  @protected
  Widget build(BuildContext context);
}
```

- 从上面的代码可以看到, 继承关系比较简单, 并没有创建`RenderObject`对象
- 我们经常使用`StatelessWidget`和`StatefulWidget`，这种`Widget`只是将其他的`Widget`在`build`方法中组装起来，并不是一个真正可以渲染的`Widget`



### RenderObject

这里来看一下可渲染`Widget`的继承关系和相关源代码, 这里以`Padding`为例


```dart
// 继承关系: Padding --> SingleChildRenderObjectWidget --> RenderObjectWidget --> Widget
class Padding extends SingleChildRenderObjectWidget {
  @override
  RenderPadding createRenderObject(BuildContext context) {
    return RenderPadding(
      padding: padding,
      textDirection: Directionality.of(context),
    );
  }

  @override
  void updateRenderObject(BuildContext context, RenderPadding renderObject) {
    renderObject
      ..padding = padding
      ..textDirection = Directionality.of(context);
  }
}

abstract class SingleChildRenderObjectWidget extends RenderObjectWidget {
  @override
  SingleChildRenderObjectElement createElement() => SingleChildRenderObjectElement(this);
}

abstract class RenderObjectWidget extends Widget {
  @override
  RenderObjectElement createElement();

  @protected
  RenderObject createRenderObject(BuildContext context);

  @protected
  void updateRenderObject(BuildContext context, covariant RenderObject renderObject) { }

  @protected
  void didUnmountRenderObject(covariant RenderObject renderObject) { }
}
```

- 在`Padding`的类中，我们找不到任何和渲染相关的代码，这是因为Padding仅仅作为一个配置信息，这个配置信息会随着我们设置的属性不同，频繁的销毁和创建
- 所以真正的渲染相关的代码那就只能在`RenderObject`里面了
- 上面代码中, 在`Padding`类里面有一个核心方法`createRenderObject`是用于创建一个`RenderObject`的
- 而且方法`createRenderObject`是来源于`RenderObjectWidget`这个抽象类里面的一个抽象方法
- 抽象方法是必须被子类实现的，但是它的子类`SingleChildRenderObjectWidget`也是一个抽象类，所以可以不实现父类的抽象方法
- 但是`Padding`不是一个抽象类，必须在这里实现对应的抽象方法，而它的实现就是下面的实现


```dart
// 这里目的是为了创建一个RenderPadding
RenderPadding createRenderObject(BuildContext context) {
    return RenderPadding(
      padding: padding,
      textDirection: Directionality.of(context),
    );
}
```

上面这段代码中, 最终是创建了一个`RenderPadding`, 而这个`RenderPadding`又是什么呢? 下面看看他的继承关系和相关源代码


```dart
// 继承关系: RenderPadding --> RenderShiftedBox --> RenderBox --> RenderObject
class RenderPadding extends RenderShiftedBox {}

abstract class RenderShiftedBox extends RenderBox with RenderObjectWithChildMixin<RenderBox> {}

abstract class RenderBox extends RenderObject {}
```

`RenderObject`又是如何实现布局和渲染的呢


```dart
// 当外面修改padding时
RenderPadding createRenderObject(BuildContext context) {
    return RenderPadding(
      padding: padding,
      textDirection: Directionality.of(context),
    );
}

// RenderPadding类里面会调用padding属性的set方法
set padding(EdgeInsetsGeometry value) {
    if (_padding == value)
      // 如果传过来的值和之前的一样, 就不会被重新渲染, 直接return
      return;
    _padding = value;
    _markNeedResolution();
}

// 内部会调用markNeedsLayout
void _markNeedResolution() {
    _resolvedPadding = null;
    markNeedsLayout();
}

// 这里是RenderObject里面的一些核心方法
abstract class RenderObject extends AbstractNode with DiagnosticableTreeMixin implements HitTestTarget {
  // markNeedsLayout是RenderObject类里面的方法
  // markNeedsLayout的目的就是标记在下一帧绘制时，需要重新布局performLayout
  void markNeedsLayout() {
    if (_needsLayout) {
      return;
    }
    
    if (_relayoutBoundary != this) {
      markParentNeedsLayout();
    } else {
      _needsLayout = true;
      if (owner != null) {
        owner._nodesNeedingLayout.add(this);
        owner.requestVisualUpdate();
      }
    }
  }

  // 
  void layout(Constraints constraints, { bool parentUsesSize = false }) {
    RenderObject relayoutBoundary;
    if (!parentUsesSize || sizedByParent || constraints.isTight || parent is! RenderObject) {
      relayoutBoundary = this;
    } else {
      relayoutBoundary = (parent as RenderObject)._relayoutBoundary;
    }
    if (!_needsLayout && constraints == _constraints && relayoutBoundary == _relayoutBoundary) {
      return;
    }
    _constraints = constraints;
    if (_relayoutBoundary != null && relayoutBoundary != _relayoutBoundary) {
      visitChildren(_cleanChildRelayoutBoundary);
    }
    _relayoutBoundary = relayoutBoundary;
    if (sizedByParent) {
      try {
        performResize();
      } catch (e, stack) {
        _debugReportException('performResize', e, stack);
      }
    }
    RenderObject debugPreviousActiveLayout;
    try {
      performLayout();
      markNeedsSemanticsUpdate();
    } catch (e, stack) {
      _debugReportException('performLayout', e, stack);
    }
    _needsLayout = false;
    markNeedsPaint();
  }
  
  // RenderObject还有一个可被子类重写的paint方法
  void paint(PaintingContext context, Offset offset) { }
}
```


### Element

- 在上面介绍`Widget`中提到过我们写的大量的`Widget`在树结构中存在引用关系，但是`Widget`会被不断的销毁和重建，那么意味着这棵树非常不稳定
- 如果`Widget`所依赖的配置和状态发生改变的时候, 和`Element`关联的`Widget`是会发生改变的, 但是`Element`的特定位置是不会发生改变的
- `Element`是`Widget`在树中具有特定位置的是实例化, 是维系整个`Flutter`应用程序的树形结构的稳定
- 接下来看下`Element`是如何被创建和引用的, 这里还是以`Container`和`Padding`为例


```dart
// 在Container的父类StatelessWidget中, 实例化了其父类的一个抽象方法
// 继承关系: StatelessElement --> ComponentElement --> Element
abstract class StatelessWidget extends Widget {
  // 实例化父类的抽象方法, 并把当前Widget作为参数传入了(this)
  @override
  StatelessElement createElement() => StatelessElement(this);
}

// 在Padding的父类SingleChildRenderObjectWidget中, 实例化了其父类的一个抽象方法
// 继承关系: SingleChildRenderObjectElement --> RenderObjectElement --> Element
abstract class SingleChildRenderObjectWidget extends RenderObjectWidget {
  
  // 实例化父类的抽象方法, 并把当前Widget作为参数传入了(this)
  @override
  SingleChildRenderObjectElement createElement() => SingleChildRenderObjectElement(this);
}
```

- 在每一次创建`Widget`的时候，会创建一个对应的`Element`，然后将该元素插入树中
- 上面代码`SingleChildRenderObjectWidget`实例化了父类的抽象方法`createElement`创建一个`Element`, 并把当前`Widget(this)`作为`SingleChildRenderObjectElement`构造方法的参数传入
- 这也就意味着创建出来的`Element`保存了对当前`Widget`的引用
- 在创建完一个`Element`之后，`Framework`会调用`mount`方法来将`Element`插入到树中具体的位置
- 这是在`Element`类中的`mount`方法, 这里主要的作用就是把自己做一个挂载操作

```dart
  /// Add this element to the tree in the given slot of the given parent.
  ///
  /// The framework calls this function when a newly created element is added to
  /// the tree for the first time. Use this method to initialize state that
  /// depends on having a parent. State that is independent of the parent can
  /// more easily be initialized in the constructor.
  ///
  /// This method transitions the element from the "initial" lifecycle state to
  /// the "active" lifecycle state.
  @mustCallSuper
  void mount(Element parent, dynamic newSlot) {
    _parent = parent;
    _slot = newSlot;
    _depth = _parent != null ? _parent.depth + 1 : 1;
    _active = true;
    if (parent != null) // Only assign ownership if the parent is non-null
      _owner = parent.owner;
    final Key key = widget.key;
    if (key is GlobalKey) {
      key._register(this);
    }
    _updateInheritance();
  }
```


### StatelessElement

`Container`创建出来的是`StatelessElement`, 下面我们探索一下`StatelessElement`创建完成后, `framework`调用`mount`方法的过程, 这里只留下了相关核心代码


```dart
abstract class ComponentElement extends Element {
  @override
  void mount(Element parent, dynamic newSlot) {
    super.mount(parent, newSlot);
    
    _firstBuild();
  }

  void _firstBuild() {
    rebuild();
  }
  
  @override
  void performRebuild() {
    if (!kReleaseMode && debugProfileBuildsEnabled)
      Timeline.startSync('${widget.runtimeType}',  arguments: timelineWhitelistArguments);

    Widget built;
    try {
      // 这里调用的build方法, 当前类也没有实现, 所以还是只能到调用者(子类里面找该方法的实现)
      built = build();
      debugWidgetBuilderValue(widget, built);
    } catch (e, stack) {
      _debugDoingBuild = false;
      
    } finally {
      _dirty = false;
    }
    try {
      _child = updateChild(_child, built, slot);
      
    } catch (e, stack) {
      
      _child = updateChild(null, built, slot);
    }

    if (!kReleaseMode && debugProfileBuildsEnabled)
      Timeline.finishSync();
  }

  @protected
  Widget build();
}


abstract class Element extends DiagnosticableTree implements BuildContext {
  // 构造方法, 接收一个widget参数
  Element(Widget widget)
    : assert(widget != null),
      _widget = widget;

  @override
  Widget get widget => _widget;
  Widget _widget;
  
  void rebuild() {
    if (!_active || !_dirty)
      return;
      
    Element debugPreviousBuildTarget;
    
    // 这里调用的performRebuild方法, 在当前类并没有实现, 只能去自己的类里面查找实现
    performRebuild();
  }

  /// Called by rebuild() after the appropriate checks have been made.
  @protected
  void performRebuild();
}


class StatelessElement extends ComponentElement {
  // 这里的widget就是之前StatelessWidget中调用createElement创建element时传过来的this(widget)
  StatelessElement(StatelessWidget widget) : super(widget);

  @override
  StatelessWidget get widget => super.widget as StatelessWidget;

  // 这里的build方法就是拿到当前的widget, 并且调用自己的build方法
  @override
  Widget build() => widget.build(this);
}
```


上面的代码看着有点乱, 下面就理一下

1. 这里我们创建的是`StatelessElement`, 在创建完一个`Element`之后，`Framework`会调用`mount`方法
2. 在`ComponentElement`类中重写了`mount`方法, 所以`framwork`会调用这里的`mount`方法
3. 在`mount`方法中直接调用的`_firstBuild`方法(第一次构建)
4. 在`_firstBuild`方法又是直接调用的`rebuild`方法(重新构建)
5. 然而在`ComponentElement`类中没有重写`rebuild`方法, 所以还是要调用父类的`rebuild`方法
6. 在`rebuild`方法会调用`performRebuild`方法, 而且是调用`ComponentElement`内重写的`performRebuild`方法
7. 在`performRebuild`方法内, 会调用`build`方法, 并用`Widget`类型的`build`接收返回值
8. 而这个`build`方法在`StatelessElement`中的实现如下
9. 也就是说, 在创建`Element`之后, 创建出来的`elment`会拿到传过来的`widget`, 然后调用`widget`自己的`build`方法, 这也就是为什么所有的`Widget`创建出来之后都会调用`build`方法的原因


```dart
Widget build() => widget.build(this);
```

> 所以在`StatelessElement`调用`mount`烦恼歌发最主要的作用就是挂在之后调用`_firstBuild`方法, 最终通过`widget`调用对应`widget`的`build`方法构建更多的东西



### RenderObjectElement

- 下面看一下可渲染的`Widget`又是如何创建`Element`的, 这里还是以`Padding`为例
- 之前有提到`Padding`是继承自`SingleChildRenderObjectWidget`的, 而`createElement`方法也是在这个类中被实现的


```dart
abstract class SingleChildRenderObjectWidget extends RenderObjectWidget {
  // 这里是创建了一个SingleChildRenderObjectElement对象
  @override
  SingleChildRenderObjectElement createElement() => SingleChildRenderObjectElement(this);
}
```

- 上面的代码中`Padding`是通过父类创建了一个`SingleChildRenderObjectElement`对象
- `SingleChildRenderObjectElement`是继承自`RenderObjectElement`
- `RenderObjectElement`继承自`Element`
- 接下来就是看一下`mount`方法的调用过程


```dart
/// 以下源码并不全, 这里只是拷贝了一些核心方法和相关源码
class SingleChildRenderObjectElement extends RenderObjectElement {
  // 同样构造函数接收一个widget参数
  SingleChildRenderObjectElement(SingleChildRenderObjectWidget widget) : super(widget);

  @override
  SingleChildRenderObjectWidget get widget => super.widget as SingleChildRenderObjectWidget;

  @override
  void mount(Element parent, dynamic newSlot) {
    super.mount(parent, newSlot);
    _child = updateChild(_child, widget.child, null);
  }
}


// RenderObjectElement类的相关实现
abstract class RenderObjectElement extends Element {
  // 构造函数接收一个widget参数
  RenderObjectElement(RenderObjectWidget widget) : super(widget);
  @override
  RenderObjectWidget get widget => super.widget as RenderObjectWidget;

  /// 创建一个RenderObject类型的变量
  @override
  RenderObject get renderObject => _renderObject;
  RenderObject _renderObject;


  @override
  void mount(Element parent, dynamic newSlot) {
    super.mount(parent, newSlot);
    
    // 在这里通过传过来的widget调用createRenderObject创建一个_renderObject
    _renderObject = widget.createRenderObject(this);
    _dirty = false;
  }
}
```

- 从上面的代码看`SingleChildRenderObjectElement`类中的`mount`方法核心是调用父类(`RenderObjectElement`)的`mount`方法
- 而`RenderObjectElement`中的`mount`方法, 主要就是通过`widget`调用它的`createRenderObject`方法创建一个`renderObject`
- 所以对于`RenderObjectElement`来说, `fromework`调用`mount`方法, 其目的就是为了创建`renderObject`
- 这也就意味着`Element`对`_renderObject`也会有一个引用
- 也就是说`Element`不但对`_widget`有一个引用, 对`_renderObject`也会有一个引用



### StatefulElement

- 上面提到`StatefulWidget`是由两部分构成的`StatefulWidget`的`State`
- 而`StatefulWidget`是通过`createState`方法，来创建一个维护`StatefulWidget`的`State`对象


```dart
class StatefulElement extends ComponentElement {
  /// 构造函数
  StatefulElement(StatefulWidget widget)
      : _state = widget.createState(),
        super(widget) {
    
    _state._element = this;
    
    _state._widget = widget;
  }

  State<StatefulWidget> get state => _state;
  State<StatefulWidget> _state;
}
```

- 在`StatefulElement`内定义了一个`_state`变量, 并且存在对`_widget`的引用
- 而在`StatefulElement`的构造方法中, 直接通过参数`widget`调用其内部的`createState`方法, 这个是`StatefulWidget`中的一个抽象方法(子类必须实现), 相信这个方法都比较熟悉


```dart
class HomeScreen extends StatefulWidget {
  HomeScreen() {
    print('1. 调用HomeScreen---constructor');
  }
  @override
  _HomeScreenState createState() {
    return _HomeScreenState();
  }
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Container()
  }
}
```

- `StatefulElement`创建完成之后, `fromework`就会调用`mount`方法挂载, 这个过程就和上面`StatelessElement`中的`mount`方法的调用过程基本一样了
- 两者不同的是:
  - `StatelessElement`中最后是通过`widget`调用`widget.build(this)`方法
  - `StatefulElement`中最后是通过`_state`调用`_state.build(this)`方法, 也就是上面`_HomeScreenState`的`build`方法


```dart
@override
Widget build() => _state.build(this);
```


### BuildContext

上面多次提到的`build`方法是有参数的, 而且不管是`StatelessWidget`还是`State`, 他们`build`方法的参数都是`BuildContext`


```dart
// StatelessWidget
abstract class StatelessWidget extends Widget {
  @protected
  Widget build(BuildContext context);
}

// State
@optionalTypeArgs
abstract class State<T extends StatefulWidget> with Diagnosticable {
  @protected
  Widget build(BuildContext context);
}
```

在`ComponentElement`创建完成之后, 会调用`mount`方法, 最终都会调用对应的`build`方法


```dart
class StatelessElement extends ComponentElement {
  @override
  Widget build() => widget.build(this);
}

class StatefulElement extends ComponentElement {
  @override
  Widget build() => _state.build(this);
}
```

- 上面的`build`方法传入的参数都是`Element`, 所以本质上`BuildContext`就是当前的`Element`
- `BuildContext`主要的作用就是知道我当前构建的这个`Widget`在这个`Element Tree`上面的位置信息, 之后就可以沿着这这个`Tree`喜爱那个上查找相关的信息
- 下面是两者的继承关系


```dart
abstract class Element extends DiagnosticableTree implements BuildContext {}
```

### 小总结

#### StatelessElement

- 在`Widget`创建出来之后, `Flutter`框架一定会根据这个`Widget`创建出一个对应的`Element`, 每一个`Widget`都有一个与之对应的`Element`
- `Element`对对当前`Widget`产生一个引用`_widget`
- `element`创建完成后, `fromework`会调用`mount`方法, 最终调用`_widget.build(this)`方法


#### StatefulElement

- 在`Widget`创建出来之后, `Flutter`框架一定会根据这个`Widget`创建出一个对应的`Element`, 每一个`Widget`都有一个与之对应的`Element`
- 在`StatefulElement`构造函数中会调用`widget.createState()`创建一个`_state`, 并引用`_state`
- 并且会把`widget`赋值给`_state`的一个引用`_widget`: `_state._widget = widget;`, 这样在`State`类中就可以通过`this.state`拿到当前的`Widget`
- `element`创建完成后, `fromework`会调用`mount`方法, 最终调用`_state.build(this)`方法


#### RenderObjectElement

- 在`Widget`创建出来之后, `Flutter`框架一定会根据这个`Widget`创建出一个对应的`Element`, 每一个`Widget`都有一个与之对应的`Element`
- `element`创建完成后, `fromework`会调用`mount`方法, 在`mount`方法中会通过`widget`调用`widget.createRenderObject(this)`创建一个`renderObject`, 并赋值给`_renderObject`
- 所以创建的`RenderObjectElement`对象也会对`RenderObject`产生一个引用


## Widget的key

我们之前创建的每一个`Widget`, 在其构造方法中我们都会看到一个参数`Key`, name这个`Key`到底有何作用又何时使用呢


```dart
const Scaffold({ Key key, ... })
const Container({ Key key, ... })
const Text({ Key key, ... })
```

我们先看一个示例需求代码如下: 希望每次点击删除按钮删除数组的元素后, `ListView`中其他`item`的展示信息不变(包括颜色和字体)


```dart
class _HomeScreenState extends State<HomeScreen> {

  List<String> names = ["111111", "222222", "333333"];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Key Demo"),
      ),
      body: ListView(
        children: names.map((name) {
          return ListItemLess(name);
        }).toList(),
      ),

      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.delete),
        onPressed: () {
          setState(() {
            names.removeAt(0);
          });
        }
      ),
    );
  }
}
```


我们吧`ListView`的`item`分别使用`StatelessWidget`和`StatefulWidget`实现, 看看两者区别


### StatelessWidget

我们先对`ListItem`使用一个`StatelessWidget`进行实现：


```dart
class ListItemLess extends StatelessWidget {
  final String name;
  final Color randomColor = Color.fromARGB(255, Random().nextInt(256), Random().nextInt(256), Random().nextInt(256));

  ListItemLess(this.name);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 60,
      child: Text(name, style: TextStyle(fontSize: 30, color: Colors.white)),
      color: randomColor,
    );
  }
}
```

- 通过实践很明显, 每次删除第一个元素后, 虽然也能删除第一个`ListItem`, 剩余的每一个`ListItem`展示的信息也是对的, 但是他们的颜色却是每次都会发生变化
- 这主要就是因为, 每次删除之后都会调用`setState`，也就会重新`build`，重新build`出来的新的`StatelessWidget`会重新生成一个新的随机颜色


### StatefulWidget

现在对`ListItem`使用`StatefulWidget`实现同样的功能


```dart
class ListItemFul extends StatefulWidget {
  final String name;
  ListItemFul(this.name): super();
  @override
  _ListItemFulState createState() => _ListItemFulState();
}

class _ListItemFulState extends State<ListItemFul> {
  final Color randomColor = Color.fromARGB(255, Random().nextInt(256), Random().nextInt(256), Random().nextInt(256));

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 60,
      child: Text(widget.name),
      color: randomColor,
    );
  }
}
```

- 我们发现一个很奇怪的现象, 信息展示正常(删除了第一条数据)，但是从颜色上看, 是删除了最后一条
- 在我们每次调用`setState`的时候, `Widget`都会调用一个`canUpdate`函数判断是否需要重建`element`


```dart
  static bool canUpdate(Widget oldWidget, Widget newWidget) {
    return oldWidget.runtimeType == newWidget.runtimeType
        && oldWidget.key == newWidget.key;
  }
```

- 在删除第一条数据的时候，`Widget`对应的`Element`并没有改变
- 而目前是没有设置`Key`的, 所以`Element`中对应的`State`引用也没有发生改变
- 在更新`Widget`的时候，`Widget`使用了没有改变的`Element`中的`State`, 也就是之前创建的三个`element`中的前两个
- 这也就是为什么删除之后, 从颜色上看, 删除的是最后一条


### 添加Key

在上面`ListItemFul`的基础上, 为每一个`ListItemFul`加上一个`key`


```dart
class ListItemFulKey extends StatefulWidget {
  final String name;
  ListItemFulKey(this.name, {Key key}): super(key: key);

  @override
  _ListItemFulKeyState createState() => _ListItemFulKeyState();
}


// 在上面使用的时候, 传入一个不同的key
ListItemFulKey(name, key: ValueKey(name))
```

- 最终这就是我们想要实现的效果了
- 上述代码中, 为每一个`ListItemFulKey`添加了一个`key`值, 而且每一个的`Key`值都是不一样的
- 在删除一个元素调用`setState`方法后, 会重新`build`的一个`Widget Tree`
- `Element`会拿到新的`Widget Tree`和原来保存的旧的`Widget Tree`做一个`diff`算法
- 根据`runtimeType`和`key`进行比对, 和新的`Widget Tree`相同的会被继续复用, 否则就会调用`unnmount`方法删除


### Key的分类

- `Key`本身是一个抽象，不过它也有一个工厂构造器，创建出来一个`ValueKey`
- 直接子类主要有：`LocalKey`和`GlobalKey`
  - `LocalKey`，它应用于具有相同父`Element`的`Widget`进行比较，也是`diff`算法的核心所在；
  - `GlobalKey`，通常我们会使用`GlobalKey`某个`Widget`对应的`Widget`或`State`或`Element`


```dart
@immutable
abstract class Key {
  /// 工厂构造函数
  const factory Key(String value) = ValueKey<String>;

  @protected
  const Key.empty();
}

abstract class LocalKey extends Key {
  /// Default constructor, used by subclasses.
  const LocalKey() : super.empty();
}

abstract class GlobalKey<T extends State<StatefulWidget>> extends Key { }
```

#### LocalKey

`LocalKey`有三个子类

`ValueKey`：
- `ValueKey`是当我们以特定的值作为`key`时使用，比如一个字符串、数字等等

`ObjectKey`：
- 如果两个学生，他们的名字一样，使用`name`作为他们的`key`就不合适了
- 我们可以创建出一个学生对象，使用对象来作为`key`
 
`UniqueKey`:
- 如果我们要确保`key`的唯一性，可以使用`UniqueKey`


```dart
class ValueKey<T> extends LocalKey {
  const ValueKey(this.value);
}

class ObjectKey extends LocalKey {
  const ObjectKey(this.value);
}

class UniqueKey extends LocalKey {
  UniqueKey();
}
```


#### GlobalKey

- `GlobalKey`可以帮助我们访问某个`Widget`的信息，包括`Widget`或`State`或`Element`等对象, 有点类似于`React`中的`ref`
- 比如我们想在`HomePage`中访问`HomeContenet`中的`widget`


```dart
class HomePage extends StatelessWidget {

  final GlobalKey<_HomeContentState> homeKey = GlobalKey();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("GlobalKey Demo"),
      ),
      body: HomeContent(key: homeKey),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.delete),
        onPressed: () {
          final message = homeKey.currentState.message;
          final name = homeKey.currentState.widget.name;
          print('message = $message, name = $name');
          homeKey.currentState.newPrint();

          final currentCtx = homeKey.currentContext;
          print('currentCtx = $currentCtx');
        }
      ),
    );
  }
}

class HomeContent extends StatefulWidget {

  final String name = 'homeContent';

  HomeContent({ Key key }): super(key: key);

  @override
  _HomeContentState createState() => _HomeContentState();
}

class _HomeContentState extends State<HomeContent> {

  final String message = 'message';

  void newPrint() {
    print('new---print');
  }

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
```




## 参考文档

- [State-class](https://api.flutter.dev/flutter/widgets/State-class.html)
- [Key-class](https://api.flutter.dev/flutter/foundation/Key-class.html)
