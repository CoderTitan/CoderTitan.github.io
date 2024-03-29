---
title: 探索KVC和KVO的本质
tags:
  - Objective-C
categories: OC底层原理
abbrlink: 478f6c1
date: 2019-06-12 18:36:20
---




- 这篇文章主要介绍`KVO`和`KVC`, 机器底层是如何实现的
- `KVO`的全称是`Key-Value Observing`，俗称键值监听，可以用于监听某个对象属性值的改变
- `KVO`是使用获取其他对象的特定属性变化的通知机制,控制器层的绑定技术就是严重依赖键值观察获得模型层和控制器层的变化通知的
- 对于不依赖控制器层类的应用程序，键值观察提供了一种简化的方法来实现检查器并更新用户界面值
- `KVC`和`KVO`都是基于`OC`的动态特性和`Runtime`机制的


<!--more-->


## KVO

### 添加监听

如下所示, 我们为`person`对象添加一个监听


```objc
- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.person = [[Person alloc]init];
    self.person.age = 10;
    
    // 给person添加KVO监听
    NSKeyValueObservingOptions options = NSKeyValueObservingOptionNew | NSKeyValueObservingOptionOld;
    [self.person addObserver:self forKeyPath:@"age" options:options context:nil];
}

- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    self.person.age = 10;
}


// 当监听的对象发生改变时就会调用
- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSKeyValueChangeKey,id> *)change context:(void *)context {
    
}
```

上面添加监听的方法

```objc
addObserver:forKeyPath:options:context:
监听方法各个参数的作用分别是什么

[object addObserver: observer forKeyPath: @"frame" options: 0 context: nil];
/**
object： 被观察者
observer： 观察者
KeyPath: 被观察者索贝观察的属性
options： 有四个值
    1、NSKeyValueObservingOptionNew 把更改之前的值提供给处理方法
    2、NSKeyValueObservingOptionOld 把更改之后的值提供给处理方法
    3、NSKeyValueObservingOptionInitial 把初始化的值提供给处理方法，一旦注  册，立马就会调用一次。通常它会带有新值，而不会带有旧值。
    4、NSKeyValueObservingOptionPrior 分2次调用。在值改变之前和值改变之后。
context：上下文，可以带一些参数，任何类型都可以
*/
```

当被监听的对象的属性发生改变时就会调用下面的方法

```objc
- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSKeyValueChangeKey,id> *)change context:(void *)context {
    
}

/*
 1. keyPath: 被监听的属性
 2. object: 被监听的对象
 3. change 属性变化字典（新／旧）
 4. 上下文，与监听的时候传递的一致
 */
```

### KVO的本质

这里我们创建两个`pweson`对象, 但是只对`person1`实行监听

```objc
    self.person1 = [[Person alloc]init];
    self.person2 = [[Person alloc]init];
    self.person1.age = 10;
    self.person2.age = 10;
    
    // 给person添加KVO监听
    NSKeyValueObservingOptions options = NSKeyValueObservingOptionNew | NSKeyValueObservingOptionOld;
    [self.person1 addObserver:self forKeyPath:@"age" options:options context:nil];
```

下面我们可以在`touchesBegan`方法中分别添加断点打印两个对象的`isa`, 如下

![image](https://titanjun.oss-cn-hangzhou.aliyuncs.com/ios/kvo-isa.png)

- 从上面可以看出,未添加监听的`pweson2`对象的`isa`依然是`Person`, 但是添加`KVO`监听的`person1`的`isa`变成了`NSKVONotifying_Person`
- `NSKVONotifying_Person`这个类是由`Runtime`在运行状态下动态创建的一个类, 是`Person`的一个子类
- 当我们对`age`属性进行赋值操作的时候, 其实调用的是`Person`类的`setAge`方法
    - `person1`通过`isa`找到其对应的类对象`Person`类, 并调用`Person`类的`setAge`方法
    - `person2`通过`isa`找到其对应的类对象`NSKVONotifying_Person`类, 并调用`NSKVONotifying_Person`类的`setAge`方法
    - 两个类的`setAge`方法的实现是不一样的, 后面会详解
- `Person`和`NSKVONotifying_Person`对应的类对象如下所示

![image](https://titanjun.oss-cn-hangzhou.aliyuncs.com/ios/person_class.png)

使用了`KVO`监听的对象动态生成的`NSKVONotifying_Person`类

![image](https://titanjun.oss-cn-hangzhou.aliyuncs.com/ios/nskvo_class.png)


实际上`NSKVONotifying_Person`类中的`setAge:`方法内部是调用了`Foundation`的`_NSSetIntValueAndNotify`方法, 有兴趣的可以反编译一下`Foundation.framwork`的源码, 查看其伪代码, 大致的可以推出内部方法的实现, 代码大致如下

```objc
- (void)setAge:(int)age
{
    _NSSetIntValueAndNotify();
}

// 伪代码
void _NSSetIntValueAndNotify()
{
    [self willChangeValueForKey:@"age"];
    [super setAge:age];
    [self didChangeValueForKey:@"age"];
}

- (void)didChangeValueForKey:(NSString *)key
{
    // 通知监听器，某某属性值发生了改变
    [oberser observeValueForKeyPath:key ofObject:self change:nil context:nil];
}
```

- 从上面的代码可以看出`_NSSetIntValueAndNotify`其实重写了`willChangeValueForKey`和`didChangeValueForKey`两个方法
- 而且监听属性值变化的是在`didChangeValueForKey`方法中实现的
- 下面我们就来验证一下上述代码

> 首先我们在`Person`类内部重写`willChangeValueForKey`和`didChangeValueForKey`两个方法, 在运行的过程中分别加断点进行调试, 如下

```objc
- (void)setAge:(int)age{
    _age = age;
    
    NSLog(@"setAge:");
}

- (void)willChangeValueForKey:(NSString *)key{
    [super willChangeValueForKey:key];
    
    NSLog(@"willChangeValueForKey");
}

- (void)didChangeValueForKey:(NSString *)key{
    NSLog(@"didChangeValueForKey - begin");
    
    [super didChangeValueForKey:key];
    
    NSLog(@"didChangeValueForKey - end");
}
```

然后在如下代码中加断点

```objc
// 当监听对象的属性值发生改变时，就会调用
- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSKeyValueChangeKey,id> *)change context:(void *)context
{
    NSLog(@"监听到%@的%@属性值改变了 - %@ - %@", object, keyPath, change, context);
}
```

在输出结果中可以看到代码的执行顺序, 从下面的代码可以看出监听属性的改变其实是在`didChangeValueForKey`方法中实现的

```objc
setAge:

didChangeValueForKey - begin

监听到<MJPerson: 0x60000389b680>的age属性值改变了 

didChangeValueForKey - end
```


## KVC

- `KVC`全称是`Key Value Coding`（键值编码），是一个基于`NSKeyValueCoding`非正式协议实现的机制，它可以直接通过`key`值对对象的属性进行存取操作，而不需通过调用明确的存取方法
- 这样就可以在运行时动态在访问和修改对象的属性，而不是在编译时确定
- `KVC`提供了一种间接访问属性方法或成员变量的机制，可以通过字符串来访问对象的的属性方法或成员变量
- 相关常见的API有

```objc
// 通用的访问方法
- (id)valueForKey:(NSString *)key; 
- (void)setValue:(id)value forKey:(NSString *)key;
// 衍生的keyPath方法, 用来进行深层访问（key使用点语法)，也可单层访问：
- (void)setValue:(id)value forKeyPath:(NSString *)keyPath;
- (id)valueForKeyPath:(NSString *)keyPath;
```

通用访问方法使用示例

```objc
// 使用示例
Person *person = [[Person alloc] init];
 
 // 赋值
[person setValue:@"titan" forKey:@"name"];

// 取值
NSLog(@"-------name = %@",person.name);
NSLog(@"-------name = %@",[person valueForKey:@"name"]);
```

`keyPath`方法使用示例

```objc
//注意，这里要想使用keypath对adress的属性进行赋值，必须先给myself赋一个Address对象
Address *myAddress = [[Address alloc] init];
   
[myself setValue:myAddress forKey:@"address"];
   
//KeyPath为多级访问
[myself setValue:@"rizhao" forKeyPath:@"address.city"];
 
//取值
NSLog(@"-------city = %@",myself.address.city);
NSLog(@"-------city = %@",[myself valueForKeyPath:@"address.city"]);
```


### 底层原理

#### `setValue:forKey:`

![image](https://titanjun.oss-cn-hangzhou.aliyuncs.com/ios/setvalue.png)

**0. 我们先创建一个`Person`类, 并在`Person.h`文件中声明一个`age`属性, 如下**


```objc
#import <Foundation/Foundation.h>

@interface Person : NSObject

@property (assign, nonatomic) int age;

@end
```

下面我们在`ViewController.m`里面调用一下看看

```objc
- (void)viewDidLoad {
    [super viewDidLoad];
    
    Person *person = [[Person alloc]init];
    // 这种方式调用的是setAge方法
    person.age = 10;
    
    // 内部其实是调用的setAge方法
    [person setValue:@20 forKey:@"age"];
    NSLog(@"%d", person.age);
    // 打印结果20
}
```

- 如果在`Person.h`文件中没有声明`age`属性,也就是在`Person.m`文件中没有默认生成的`setAge`和`getAge`方法
- 那么调用`setValue`方法对`age`存值的时候就会导致程序崩溃, 并会报出`setValue:forUndefinedKey:]`的错误
- 如同上图中所示, `setValue:forKey:`的原理实际上就是先按照`setAge:`和`_setAge:`顺序查找方法, 如果找到了对应方法中的一个, 则代码可以执行成功, 下面我们就一个个验证一下吧


**1. 验证`setKey`和`_setKey`方法, 代码如下**

```objc
#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Person : NSObject

// .h文件中不添加age属性
//@property (assign, nonatomic) int age;

@end
```

在`.m`文件中分别添加一下两个方法, 侧其中一个方法的时候, 可以先注释掉另外一个方法

```objc
#import "Person.h"

@implementation Person


- (void)setAge:(int)age {

    NSLog(@"setAge--");
}

- (void)_setAge:(int)age {
    
    NSLog(@"_setAge--");
}
@end
```

然后在`ViewController.m`调用`setValue`方法的时候, 可以看到打印对应的输出, 当上述两个方法同事存在的时候, 则会默认执行`setAge`方法

```objc
[person setValue:@20 forKey:@"age"];
```


**2. 如果没有`setKey:`和`_setKey:`两个方法, 则会继续查找`Person.m`文件中是否有`accessInstanceVariablesDirectly`方法, 如果没有程序会奔溃**


```objc
#import "Person.h"

@implementation Person

+ (BOOL)accessInstanceVariablesDirectly {
    // 默认返回值是YES
    return YES;
}
@end
```

- `accessInstanceVariablesDirectly`方法默认是返回`YES`的, 如果`return NO`, 则程序同样会崩溃, 并抛出`NSUnknownKeyException`异常
- 在`return YES`的情况下, 会按照顺序查找`_key、_isKey、key、isKey`等成员变量, 如果找不到依然会抛出`NSUnknownKeyException`异常
- 下面在`Person.h`文件中, 分别声明四个变量

```objc
#import <Foundation/Foundation.h>

@interface Person : NSObject
{
    @public
    int age;
    int isAge;
    int _age;
    int _isAge;
}
@end
```

在`ViewController.m`中添加如下代码, 执行结果如下所示

```objc
- (void)viewDidLoad {
    [super viewDidLoad];
    
    Person *person = [[Person alloc]init];

    [person setValue:@20 forKey:@"age"];
    NSLog(@"-----------");
}
```

![image](https://titanjun.oss-cn-hangzhou.aliyuncs.com/ios/setvalueage.png)


- 当我们在`Person.h`中声明`age、isAge、_age、_isAge`四个变量的时候, 上述代码会默认赋值给`_age`变量
- 当我们不声明`_age`属性时, 则会默认赋值给`_isAge`属性, 以此类推依次是`age`和`isAge`变量, 有兴趣的可以亲自测试一番


#### `valueForKey`

![image](https://titanjun.oss-cn-hangzhou.aliyuncs.com/ios/getvalue.png)

`valueForKey`通过`key`进行取值的时候, 取值流程和`setValue`类似, 途中也比较清晰, 这里就不在赘述了




---





