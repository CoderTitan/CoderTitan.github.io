---
title: Realm在iOS中的简单使用
tags:
  - iOS
  - Realm
categories: 数据库基础
abbrlink: a0131d49
date: 2018-08-10 10:46:40
image:
---


- [Realm](https://docs.realm.io/platform/)是由美国`YCombinator`孵化的创业团队历时几年打造，第一个专门针对移动平台设计的数据库
- [Realm](https://docs.realm.io/platform/)是一个跨平台的移动数据库引擎，目前支持`iOS`、`Android`平台，同时支持`Objective-C`、`Swift`、`Java`、`React Native`、`Xamarin`等多种编程语言
- `Realm`并不是对`SQLite`或者`CoreData`的简单封装, 是由核心数据引擎`C++`打造，是拥有独立的数据库存储引擎，可以方便、高效的完成数据库的各种操作

<!-- more -->



## `Realm`简单介绍

### `Realm`的优势与亮点

- 开源。`Realm`移动端数据库相关代码已全部开源。数千开发者在`GitHub`上参与了相关工作。另外还有几百个`Realm`数据库相关的扩展。
- 简单易用：`Core Data`、`SQLite`庞大的学习量和繁杂的代码足以吓退绝大多数刚入门的开发者，而换用`Realm`，则可以极大地减少学习代价和学习时间，让应用及早用上数据存储功能
- 跨平台：现在绝大多数的应用开发并不仅仅只在`iOS`平台上进行开发，还要兼顾到`Android`平台的开发。为两个平台设计不同的数据库是不明智的，而使用`Realm`数据库，`iOS`和`Android`无需考虑内部数据的架构，调用`Realm`提供的`API`就可以完成数据的交换
- 线程安全。程序员无需对在不同线程中，对数据库的读取一致性做任何考虑，`Realm`会保证每次读取都得到一致的数据



### 可视化工具`Realm Browser`

为了配合`Realm`的使用，`Realm`还提供了一个轻量级的数据库查看工具`Realm Browser`，借助这个工具，开发者可以查看数据库当中的内容，并执行简单的插入和删除操作。`Realm Browser`可以在`App Store`中下载安装


![Realm Browser](https://user-gold-cdn.xitu.io/2018/8/10/16521ebc65be0257?w=1017&h=828&f=png&s=624540)


<div class="note warning"><p>需要注意的是</p></div>

如果需要调试, 可以通过`NSHomeDirectory()`打印出`Realm`数据库地址, 找到对应的`Realm`文件, 然后用`Realm Browser`可视化工具打开即可


## `Realm`的安装

[Realm的Github地址](https://github.com/realm/realm-cocoa)

### 手动安装

当使用手工方式安装Realm时，可以按照如下步骤进行

- 登录[Realm官方网站](https://realm.io/docs/objc/latest/#getting-started)或者[Github](https://github.com/realm/realm-cocoa)，下载`Realm`的最新版本并解压
- 将`Realm.framework`从`ios/static/`文件夹拖曳到您`Xcode`项目中的文件导航器当中, 确保`Copy items if needed`选中然后单击`Finish`
- 在`Xcode`文件导航器中选择您的项目，然后选择您的应用目标，进入到`Build Phases`选项卡中。在`Link Binary with Libraries`中单击 `+` 号然后添加`libc++.tbd`以及`libz.tbd`


![RealmResource](http://upload-images.jianshu.io/upload_images/4122543-be0044738ece664b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 使用`CocoaPods`安装

当使用`CocoaPods`方式安装`Realm`时，以`Objective-C`为例

- `CocoaPods`版本要求是`1.1.0`及以上版本
- 在`Podfile`中，添加`pod 'Realm'`，如有需要, 添加`pod 'Realm/Headers'`到测试项目中
- 在终端运行`pod install`即可安装
- 在`Swift`中需要输入`pod 'RealmSwift'`才可以安装
- 如果是混编项目，就需要安装OC的`Realm`, 然后要把 [Swift/RLMSupport.swift](https://github.com/realm/realm-cocoa/blob/master/Realm/Swift/RLMSupport.swift)文件一同编译进去


<div class="note info"><p>`RLMSupport.swift`</p></div>

`RLMSupport.swift`这个文件为`Objective-C`版本的`Realm`集合类型中引入了`Sequence`一致性，并且重新暴露了一些不能够从`Swift `中进行原生访问的`Objective-C`方法，例如可变参数`variadic arguments`等, 更加详细的说明见[官方文档](https://realm.io/docs/objc/latest/#getting-started)


### Xcode插件

- `Realm`提供了一个`Xcode`插件，来方便的创建`RLMObject`类，这需要我们首先安装相关的插件
- 打开`Realm`文件夹中的`plugin/RealmPlugin.xcodeproj`并进行编译，重启`Xcode`之后插件即可生效
- 当需要新建`RLMObject`类时，在新建类的选项中选择`Realm Model Object`即可


![Realm Model](http://upload-images.jianshu.io/upload_images/4122543-4275bdc87fc5e24a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



## `Realm`的类定义说明


在`Realm`框架中，定义了二十个核心类、常量、枚举类型、协议等，常用的如：`RLMRealm`类、`RLMObject`类、`RLMResults`类等, 我们可以从`Realm`的[官方网站](https://realm.io/docs/objc/latest/api/Constants.html)上查看所有的定义以及使用说明


### RLMRealm类

- 一个`RLMRealm`类的对象可以认为是一个`Realm`的数据库。`Realm`数据库既可以存储在硬盘上，同时也可以存储在内存中
- `Realm`是框架的核心所在，是我们构建数据库的访问点，就如同`Core Data`的管理对象上下文`managed object context`一样
- `RLMRealm`类中，常用的属性或方法如下

```objc
// 获取默认的Realm数据库
+ (instancetype)defaultRealm;


//实例化一个RLMRealm类的对象
//根据配置参数获得RLMRealm
+ (nullable instancetype)realmWithConfiguration:(RLMRealmConfiguration *)configuration error:(NSError **)error;

//根据指定持久化文件路径获得RLMRealm
+ (instancetype)realmWithPath:(NSString *)path;


//对Realm数据库进行读写操作
//在Realm上开始写入事务, 每个Realm文件一次只能打开一个写事务
- (void)beginWriteTransaction;

//在当前写入事务中提交所有写入操作，并结束事务
- (void)commitWriteTransaction;
//没有足够的磁盘空间来保存写入或由于意外的I / O错误，此方法可能会失败, 并返回error信息
- (BOOL)commitWriteTransaction:(NSError **)error;
// 在当前写入事务中提交所有写入操作，而不收到此写入事件的特定通知
- (BOOL)commitWriteTransactionWithoutNotifying:(NSArray<RLMNotificationToken *> *)tokens error:(NSError **)error;

// 回滚在当前写入事务期间进行的所有写入并结束事务
- (void)cancelWriteTransaction;

//执行写入事务内给定块中包含的操作
- (void)transactionWithBlock:(__attribute__((noescape)) void(^)(void))block;
//执行写入事务内给定块中包含的操作, 如果发生错误，则返回时包含NSError描述问题的对象
- (BOOL)transactionWithBlock:(__attribute__((noescape)) void(^)(void))block error:(NSError **)error;


//添加或更新一个对象
- (void)addObject:(RLMObject *)object;
//将现有对象添加或更新到Realm中, 有则更新没有则插入
- (void)addOrUpdateObject:(RLMObject *)object;
//添加或更新多个对象
- (void)addObjects:(id<NSFastEnumeration>)objects;
- (void)addOrUpdateObjects:(id<NSFastEnumeration>)objects;


//删除对象
- (void)deleteObject:(RLMObject *)object;
- (void)deleteObjects:(id)array;
- (void)deleteAllObjects;
```


### RLMObject类

- 在`Realm`数据库中存储的都是`RMObject`对象，`RLMObject`类是所有可以存储在`Realm`数据库中的对象的根类
- 凡是可以存储在`Realm`数据库中的对象都是`RLMObject`类或`RLMObject`类的子类
- 要创建一个数据模型，我们只需要继承`RLMObject`，然后设计我们想要存储的属性即可
- 在`RLMObject`类中，我们可以添加属性，添加的属性类型可以支持如下类型：
  - `NSString`：字符串
  - `NSInteger`, `int`, `long`, `float`, `double`：数字型，注意没有`CGFloat`
  - `BOOL/bool`：布尔型
  - `NSDate`：日期型
  - `NSData`：二进制字符型
  - `NSNumber<X>`: 其中`X`必须`RLMInt`, `RLMFloat`, `RLMDouble`或 `RLMBool`类型
  - `RLMArray<X>`: 其中`X`必须是`RLMObject`类的子类, 用于建模多对多关系
  - `RLMObject`的子类，用于建模多对一关系
- `RLMObject`类中，比较常用如下方法：


```objc
//创建Realm对象, 传入一个NSArray或NSDictionary实例来设置对象属性的值
- (nonnull instancetype)initWithValue:(nonnull id)value;

//在Realm数据库中，获取该RLMObject类的所有对象
+ (RLMResults *)allObjects;

//根据查询条件返回满足条件的所有RLMObject类的对象
+ (RLMResults *)objectsWhere:(NSString *)predicateFormat, ...;

//使用默认Realm中的给定主键检索此对象类型的单个实例
+ (nullable instancetype)objectForPrimaryKey:(nullable id)primaryKey;

//从指定的Realm返回此对象类型的所有对象
+ (nonnull RLMResults *)allObjectsInRealm:(nonnull RLMRealm *)realm;

//返回与指定Realm中给定谓词匹配的此对象类型的所有对象
+ (nonnull RLMResults *)objectsInRealm:(nonnull RLMRealm *)realm where:(nonnull NSString *)predicateFormat, ...;
```


### RLMResults类

- 当我们执行一个查询操作后，查询出满足条件的`RLMObject`对象会存放在一个`RLMResults`对象中
- `RLMResults`类是一个数组类型的数据结构，因此在其类定义中，提供了很多与数组类似的属性和方法


<div class="note info"><p>相关属性</p></div>

```objc
//结果集合中的对象个数
@property (readonly, assign, nonatomic) NSUInteger count;

//结果集合中对象的类型
@property (readonly, assign, nonatomic) RLMPropertyType type;

//管理此结果集合的Realm对象
@property (readonly, nonatomic) RLMRealm *_Nonnull realm;

//结果集合中包含的对象的类名称
@property (readonly, copy, nonatomic, nullable) NSString *objectClassName;
```


<div class="note info"><p>相关方法</p></div>


```objc
//返回结果集合中的第一个对象
- (nullable RLMObjectType)firstObject;

//返回结果集合中的最后一个对象
- (nullable RLMObjectType)lastObject;

//根据索引index获取其中的某个对象
- (RLMObjectType)objectAtIndex:(NSUInteger)index;

//根据对象返回其索引
- (NSUInteger)indexOfObject:(RLMObjectArgument)object;

//返回与谓词匹配的结果集合中第一个对象的索引
- (NSUInteger)indexOfObjectWhere:(nonnull NSString *)predicateFormat, ...;

//返回与结果集合中给定谓词匹配的所有对象
- (RLMResults<RLMObjectType> *)objectsWhere:(NSString *)predicateFormat, ...;

//返回RLMResults从现有结果集合中排序的内容
- (RLMResults<RLMObjectType> *)sortedResultsUsingKeyPath:(NSString *)keyPath ascending:(BOOL)ascending;

//返回RLMResults与现有结果集合不同的内容
- (nonnull RLMResults<RLMObjectType> *)distinctResultsUsingKeyPaths:(nonnull NSArray<NSString *> *)keyPaths;
```


<div class="note warning"><p>更多相关类及其属性和方法, 可参考官方文档</p></div>

https://realm.io/docs/objc/latest/api/Classes.html



## `Realm`的使用

`Realm`中一些常用的类及其类的属性和方法上面已经介绍了, 下面我们就介绍`Realm`的使用方法


### 创建RLMObject类

我们首先创建一个`Student`类，该类是`RLMObject`类的一个子类, 下图就是按照之前安装的`Xcode`插件创建的

![image](http://upload-images.jianshu.io/upload_images/4122543-7318cedc2fa2df2f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


- 在`Student`添加两个属性, `RLMObject`官方建议在`RLMObject`类中添加的属性，是不需要指定属性关键字的，完全交由`Realm`处理
- 假如设置了，这些`attributes`会一直生效直到`RLMObject`被写入`realm`数据库
- `RLM_ARRAY_TYPE`宏创建了一个协议，从而允许 `RLMArray<Car>`语法的使用
- 如果`RLM_ARRAY_TYPE`宏没有放置在模型接口的底部的话，您或许需要提前声明该模型类


```objc
@interface Student : RLMObject

@property int num;
@property NSString *name;

@end
RLM_ARRAY_TYPE(Student)
```



### 存储操作

- 对于`RLMObject`类型的对象，我们可以直接对创建的对象进行存储
- 第一步, 初始化对象


```objc
// 方式一: 接受一个数组对象
Student *stu1 = [[Student alloc]initWithValue:@[@1, @"jun"]];

//方式二: 接受一个字典对象
Student *stu2 = [[Student alloc]initWithValue:@{@"num": @2, @"name":@"titan"}];

//方式三: 属性赋值
Student *stu3 = [[Student alloc]init];
stu3.num = 3;
stu3.name = @"titanjun";
```


第二步就是把`RLMObject`对象写入`Realm`数据库, 同样有三种方式

```objc
//方式一: 提交事务处理
//获取Realm对象
RLMRealm *realm = [RLMRealm defaultRealm];
//开始写入事务
[realm beginWriteTransaction];
//添加模型对象
[realm addObject:stu1];
//提交写入事务
[realm commitWriteTransaction];


//方式二: 在事务中调用addObject:方法
RLMRealm *realm = [RLMRealm defaultRealm];
[realm transactionWithBlock:^{
    [realm addObject:webSite1];
    [realm addObject:webSite2];
}];


//方式三: 在十五中创建新的对象并添加
[realm transactionWithBlock:^{
    //添加模型
    [Student createInRealm:realm withValue:@{@"num": @3, @"name":@"coder"}];
}];

```


<div class="note warning"><p>一定要注意的是</p></div>

- 所有的必需属性都必须在对象添加到`Realm`前被赋值
- 如果在进程中存在多个写入操作的话，那么单个写入操作将会阻塞其余的写入操作，并且还会锁定该操作所在的当前线程
  - 建议常规的最佳做法：将写入操作转移到一个独立的线程中执行
  - 官方给出的建议：由于`Realm`采用了`MVCC`设计架构，读取操作并不会因为写入事务正在进行而受到影响
  - 除非您需要立即使用多个线程来同时执行写入操作，不然您应当采用批量化的写入事务，而不是采用多次少量的写入事务
  - 下面的代码就是把写事务放到子线程中去处理


```objc
dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        
    RLMRealm *realm = [RLMRealm defaultRealm];
    [realm transactionWithBlock:^{
        [realm addObject: stu4];
    }];
});
```


### 查询操作

- `Realm`中也提供了功能强大的数据查询能力，如果会使用`SQL`语言的话，上手的难度更低
- 在`Realm`的查询功能中，也可以像`SQL`一样使用各种条件查询关键字，查询的结果会保存在一个`RLMResults`类的数组中
- 全量查询, 通过调用`allObjects`方法, 得到该表中的所有数据
- 条件查询，设置一些查询条件，从而查询出符合条件的对象
  - `Realm`的查询条件可以使用==、<=、<、>=、>、!=、BETWEEN、CONTAINS 以及 ENDSWITH等多种操作符

> 全量查询

```objc
//1. 获取所有数据
RLMResults *resArr = [Student allObjects];
NSLog(@"%@", resArr);

//2. 添加一条数据
RLMRealm *realm = [RLMRealm defaultRealm];
Student *stu = [[Student alloc]initWithValue:@[@10, @"coder"]];
[realm transactionWithBlock:^{
    [realm addObject:stu];
}];

//3. 一旦检索执行之后, RLMResults 将随时保持更新
NSLog(@"%@", resArr);
```


> 条件查询

```objc
//条件查询
RLMResults *stuArr = [Student objectsWhere:@"num > 7"];
NSLog(@"%@", stuArr);

//排序
//排序不会对原数组进行操作, 会返回一个新的数组
RLMResults *stuArr2 = [stuArr sortedResultsUsingKeyPath:@"name" ascending:YES];
NSLog(@"%@", stuArr2);


//链式查询
RLMResults *stuArr3 = [stuArr2 objectsWhere:@"num > 8"];
//可以不断的根据上一个查询结果进行查询
RLMResults *stuArr4 = [stuArr3 objectsWhere:@"num > 9"];
NSLog(@"%@", stuArr4);
```



### 更新操作

- 需要修改的模型一定是被`Realm`所管理的模型, 而且已经和磁盘上的对象进行地址映射
- 对新添加的模型进行更新

```objc
//获取Realm对象
RLMRealm *realm = [RLMRealm defaultRealm];
Student *stu4 = [[Student alloc]initWithValue:@{@"num": @4, @"name":@"titan4"}];
//添加数据
// 这个模型stu, 已经被realm 所管理, 而且, 已经和磁盘上的对象, 进行的地址映射
[realm transactionWithBlock:^{
    //添加模型
    [realm addObject:stu4];
}];

// 这里修改的模型, 一定是被realm所管理的模型
[realm transactionWithBlock:^{
    stu4.name = @"coder4";
}];
```


- 根据查询到的数据更新指定属性的数据

```objc
//条件查询
RLMResults *results = [Student objectsWhere:@"num = 4"];
Student *stu = results.firstObject;

//更新指定属性的数据
[realm transactionWithBlock:^{
    stu.name = @"titanking";
}];
```


- 当有主键的情况下, 使用`Update`方法
- `addOrUpdateObject`会去先查找有没有传入的`Student`相同的主键，如果有，就更新该条数据
- 这里需要注意，`addOrUpdateObject`这个方法不是增量更新，所有的值都必须有，如果有哪几个值是`null`，那么就会覆盖原来已经有的值，这样就会出现数据丢失的问题
- `createOrUpdateInRealm:withValue`这个方法是增量更新的，后面传一个字典，使用这个方法的前提是有主键
- 方法会先去主键里面找有没有字典里面传入的主键的记录，如果有，就只更新字典里面的子集;如果没有，就新建一条记录


```objc
//获取Realm对象
RLMRealm *realm = [RLMRealm defaultRealm];
Student *stu2 = [[Student alloc]initWithValue:@{@"num": @12, @"name":@"titan"}];

//addOrUpdateObject方式
[realm transactionWithBlock:^{
    [realm addOrUpdateObject:stu2];
}];

//createOrUpdateInRealm方式
[realm transactionWithBlock:^{
    [Student createOrUpdateInRealm:realm withValue:@{@"num": @11, @"name":@"titan11"}];
}];
```


### 删除操作

- 删除的模型, 一定要求是被`realm`所管理的已经存在的模型
- 当需要在`Realm`中删除某些对象时，需要注意的是，该方法的执行需要在一个事务中进行


```objc
//获取Realm对象
RLMRealm *realm = [RLMRealm defaultRealm];

//根据条件删除一条数据 
RLMResults *results = [Student objectsWhere:@"name = 'titanking'"];
Student *titan1 = results.firstObject;

// 删除单条记录
[realm transactionWithBlock:^{
    [realm deleteObject:titan1];
}];



//删除所有符合条件的数据
RLMResults *results = [Student objectsWhere:@"name = 'coder'"];
for (Student *stu in results) {
    [realm transactionWithBlock:^{
        [realm deleteObject:stu];
    }];
}



//删除表中所有的数据
[realm transactionWithBlock:^{
    [realm deleteAllObjects];
}];



/*场景, 根据主键删除一个模型*/
 // 1. 根据主键, 查询到这个模型(这个模型, 就是被realm数据库管理的模型)
Student *res = [Student objectInRealm:realm forPrimaryKey:@4];

//2. 删除该模型
[realm transactionWithBlock:^{
    [realm deleteObject:res];
}];
```


### `Realm`数据库机制

- 上面用到的获取`realm`对象的方式都是通过`defaultRealm`来获取默认配置的`realm`对象
- 当我们需要创建不同的`realm`表格时又该如何操作呢? 
- 下面我们来看一下


```objc
- (void)setDefaultRealmForUser:(NSString *)username {
    //先获取默认配置
    RLMRealmConfiguration *config = [RLMRealmConfiguration defaultConfiguration];
    
    //设置只读数据库
    //config.readOnly = YES;
    
    // 使用默认的目录，但是使用用户名来替换默认的文件名
    config.fileURL = [[[config.fileURL URLByDeletingLastPathComponent]
                       URLByAppendingPathComponent:username]
                      URLByAppendingPathExtension:@"realm"];
    // 将这个配置应用到默认的 Realm 数据库当中
    [RLMRealmConfiguration setDefaultConfiguration:config];
}
```

做好上述配置之后, 便可创建不同的数据库了

```objc
// 不同的用户, 使用不同的数据库
[self setDefaultRealmForUser:@"zhangsan"];

//这里也只需要调用默认配置即可
RLMRealm *realm = [RLMRealm defaultRealm];
```


### 通知

- `Realm`实例将会在每次写入事务提交后，给其他线程上的`Realm`实例发送通知
- 一般控制器如果想一直持有这个通知，就需要申请一个属性, 强引用该属性，`strong`持有这个通知
- 集合通知是异步触发的，首先它会在初始结果出现的时候触发，随后当某个写入事务改变了集合中的所有或者某个对象的时候，通知都会再次触发


```objc
//强引用属性
@property (nonatomic, strong) RLMNotificationToken *token;


- (void)setUp {
    [super setUp];

    RLMRealm *realm = [RLMRealm defaultRealm];
    // 获取 Realm 通知
    self.token = [realm addNotificationBlock:^(RLMNotification  _Nonnull notification, RLMRealm * _Nonnull realm) {
        NSLog(@"接收到变更通知--%@", notification);
    }];

    //结束该通知
    [self.token stop];
}


- (void)testExample {
    NoticeModel *noticeM = [[NoticeModel alloc] initWithValue:@{@"num": @1, @"name": @"sz"}];

    //添加数据, 数据操作之后便会通知上述通知中心执行相应操作
    RLMRealm *realm = [RLMRealm defaultRealm];
    [realm transactionWithBlock:^{
        [realm addObject:noticeM];
    }];
}
```


### 数据库迁移

- 数据库存储方面的增删改查应该都没有什么大问题，比较蛋疼的应该就是数据迁移了
- 在版本迭代过程中，很可能会发生表的新增，删除，或者表结构的变化，如果新版本中不做数据迁移，用户升级到新版，很可能就直接crash了
- 数据迁移一直是困扰各类型数据库的一大问题, 但是对于`Realm`来说, 却方便很多, 这也是`Realm`的优点之一
  - 新增删除表，`Realm`不需要做迁移
  - 新增删除字段，`Realm`不需要做迁移; `Realm`会自行检测新增和需要移除的属性，然后自动更新硬盘上的数据库架构


```objc
//需要在以下方法中进行配置
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // 获取默认配置, 迁移数据结构
    RLMRealmConfiguration *config = [RLMRealmConfiguration defaultConfiguration];

    // 1. 设置新的架构版本。这个版本号必须高于之前所用的版本号（如果您之前从未设置过架构版本，那么这个版本号设置为 0）
    int newVersion = 4;
    config.schemaVersion = newVersion;

    // 2. 设置闭包，这个闭包将会在打开低于上面所设置版本号的 Realm 数据库的时候被自动调用
    [config setMigrationBlock:^(RLMMigration *migration, uint64_t oldSchemaVersion){
        if (oldSchemaVersion < newVersion) {

            NSLog(@"数据结构会自动迁移");

            // enumerateObjects:block: 遍历了存储在 Realm 文件中的每一个“Person”对象
            [migration enumerateObjects:@"DataMigration" block:^(RLMObject * _Nullable oldObject, RLMObject * _Nullable newObject) {
                // 只有当 Realm 数据库的架构版本为 0 的时候，才添加 “fullName” 属性
                if (oldSchemaVersion < 1) {
                    newObject[@"fullName"] = [NSString stringWithFormat:@"%@ %@", oldObject[@"firstName"], oldObject[@"lastName"]];
                }
                // 只有当 Realm 数据库的架构版本为 0 或者 1 的时候，才添加“email”属性
                if (oldSchemaVersion < 2) {
                    newObject[@"email"] = @"";
                }
                // 替换属性名(原字段重命名)
                if (oldSchemaVersion < 3) { // 重命名操作应该在调用 `enumerateObjects:` 之外完成
                    [migration renamePropertyForClass:Person.className oldName:@"yearsSinceBirth" newName:@"age"];
                }
            }];
        }
    }];

    // 3. 告诉 Realm 为默认的 Realm 数据库使用这个新的配置对象
    [RLMRealmConfiguration setDefaultConfiguration:config];

    // 4. 现在我们已经告诉了 Realm 如何处理架构的变化，打开文件之后将会自动执行迁移
    [RLMRealm defaultRealm];
    
    
    return YES;
}
```


- 以上就是我最近学习到的关于`Realm`的部分内容, 文章不全, 有兴趣的可以参考下面的文章继续学习
- 参考文档
  - [Realm数据库 从入门到“放弃”](https://www.jianshu.com/p/50e0efb66bdf)
  - [Realm官方文档](https://realm.io/docs/objc/latest/api/Classes.html)
  - [Realm GitHub](https://github.com/realm/realm-cocoa)