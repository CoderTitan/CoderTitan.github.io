---
title: Flutter开发之Dart中的类和对象
tags:
  - Flutter
  - Dart
categories: Flutter笔记
abbrlink: ee7c7428
date: 2020-05-21 00:00:00
image:
---



![dart-logo](https://titanjun.oss-cn-hangzhou.aliyuncs.com/flutter/dart-logo.png?x-oss-process=style/titanjun)

<!--more-->


- 原文博客地址: [Flutter和Dart系列文章](https://www.titanjun.top/categories/Flutter%E7%AC%94%E8%AE%B0/)
- 上次学习`Flutter`已经是整整一年前的事情了,之后因为工作重心主要放在了`React Native`开发形式上
- 现在重新捡起`Flutter`, 也是计划系统性的从头开始重新学习`Dart`和`Flutter`
- 这篇`Dart`笔记主要就是记录`Dart`语言中的类和对象

## 类及其构造方法

`Dart`也是一门面向对象的开发语言，面向对象中非常重要的概念就是类，通过类的初始化创建一个对象

### 类的定义

- 在`Dart`中，定义类用`class`关键字
- 当未指明其父类的时候, 默认是继承自`Object`的, 格式如下:


```dart
class 类名 {
  类型 成员名;
  返回值类型 方法名(参数列表) {
    方法体
  }
}
```

- 在`Dart`语言中, 在类中使用属性(成员/实例变量)时, 有必要时是通过`this`获取的
- 但是下面在`getsize`方法中并没有加`this`
- 这里需要注意的是: `Dart`的开发风格中，在方法中通常使用属性时，会省略`this`，但是有命名冲突时，`this`不能省略


```dart
// 创建类
class Point {
  // 定义变量
  int x;

  void getsize() {
    print('x = $x');
  }
}

// 类的初始化
main(List<String> args) {
    // 从Dart2开始，new关键字可以省略
    var point = new Point();
    point.x = 1;
    point.getsize();
}
```


### 构造方法

- 当通过类创建一个对象时，会调用这个类的构造方法
  - 在`Dart`语言中,如果类中没有明确指定构造方法时，将默认拥有一个无参的构造方法()
  - 上面得到的`point`对象调用的就是默认的无参构造方法
- 也可以根据自己的需求自定义构造方法
  - 当我们创建了自己的构造方法时，默认的无参的构造方法将会失效，不能使用,否则会报错
  - 因为`Dart`本身不支持函数的重载, 所以如果我们明确的写一个默认的构造方法，就会和我们自定义的构造方法冲突


```dart
class Student {
  String name;
  int age;

  Student(String name, int age) {
    this.name = name;
    this.age = age;
  }
}
```

- 在上面构造方法中主要实现的就是通过构造函数的参数给类的户型赋值
- 为了简化这一过程, `Dart`提供了一种更加简洁的语法糖形式


```dart
class Student1 {
  String name;
  int age;

  // 这里和上面的Studeng的构造方法等价
  Student1(this.name, this.age);
}
```

### 命名构造方法

- 在实际开发中, 很明显一个构造方法的确是不够我们使用的
- 而且`Dart`又不支持函数的重载, 不能创建爱你相同名称不同参数的构造方法
- 这就衍生出了另外一中构造方法:命名构造方法


```dart
class Model {
  String name;
  int age;

  Model(this.name, this.age);

  // 命名构造方法
  Model.withNameAndAge(String name, int age) {
    this.name = name;
    this.age = age;
  }
  // 命名构造方法
  Model.initJson(Map<String, Object> map) {
    this.name = map['name'];
    this.age = map['age'];
  }
}


// 初始化对象
main() {
  // 普通构造方法
  var model0 = Model('name', 12);
  // 命名构造方法
  var model1 = Model.withNameAndAge('titan', 12);
  var model2 = Model.initJson({'name': 'jun', 'age': 18});
}
```


### 初始化列表

几种方式定义的属性都是可变的, 如果定义的属性是`final`不可重新赋值的又该如何实现

```dart
class Teacher {
  final String name;
  final int age;

  // 1. 这里会有一个错误提示: All final variables must be initialized, but 'age' and 'name' are not
  Teacher(String name, int age) {
    //2. 这里也会有一个错误提示: 'name' can't be used as a setter because it's final
    this.name = name;
    this.age = age;
  }
}
```

- 上面第一处错误主要是因为: 在`Dart`中在执行下面`{ }`中的代码的时候, 表示`Teacher`对象已经初始化完毕了
- 所以在执行`{ }`之前, 必须保证`name`和`age`被初始化了
- 而且`final`修饰的属性是不可被重新赋值的, 所以才会报错
- 或者也可以使用函数中的命名可选参数处理


```dart
class Size {
  final double width;
  final double height;
  final double area;

  // 命名可选参数
  Size(this.width, this.height, { this.area = 10 }); 
}
```

- 上面通过命名可选参数的形式, 给参数设置默认值也是可以的, 但是不同的是`area`只能设置具体的数值, 不能设置表达式
- 初始化列表的形式不但可以设置具体的数值, 也可以设置默认值为表达式的形式



```dart
class Size {
  final double width;
  final double height;
  final double area;

  // 多个属性使用逗号分隔
  Size(double width, double height): 
    this.width = width,
    this.height = height,
    this.area = width * height;
}
```

### 重定向构造方法

- 下面的构造函数中, 我们只能通过传入两个参数来获取一个对象
- 如果在某些情况下, 希望只通过一个`name`变量来获取一个对象
- 这种情况下, 就可以通过在构造方法中去调用另外一个构造方法, 这个时候可以使用重定向构造方法
- 需要注意的是: 在一个构造函数中，去调用另外一个构造函数, 是在冒号后面使用this调用


```dart
class Point {
  String name;
  int age;

  Point(this.name, this.age);

  // 重定向的构造方法
  Point.fromName(String name): this(name, 0);
}

// 使用方法
var point = Point.fromName("name");
print(point.age);  // 输出: 0
```


### 常量构造函数

- 在某些情况下, 我们希望通过构造函数, 只要传入相同的参数, 那么得到的对象就是同一个
- 在`Dart`中判断两个对象是否是同一个的方法是通过函数`identical`判断, 返回值是一个布尔值


```dart
// 普通构造函数
class Person {
  String name;
  int age;

  Person(this.name, this.age);
}

// 初始化列表
class Size {
  final double width;
  final double height;
  final double area;

  // 多个属性使用逗号分隔
  Size(double width, double height): 
    this.width = width,
    this.height = height,
    this.area = width * height;
}

main(List<String> args) {
  var p1 = Person("name", 10);
  var p2 = Person("name", 10);
  // 判断两个对象是不是同一个
  print(identical(p1, p2));    /// false


  var s1 = Size(10, 20);
  var s2 = Size(10, 20);
  // 判断两个对象是不是同一个
  print(identical(s1, s2));    /// false
}
```

- 很明显上面两种方式初始化的对象都不是同一个
- 其实在`Dart`中如果将构造方法前加`const`进行修饰，那么可以保证相同的参数，创建出来的对象是相同的
- 这样的构造方法就称之为常量构造方法


```dart
// 常量构造方法
class Teacher {
  final String name;

  const Teacher(this.name);
}

main(List<String> args) {
  // 常量构造方法
  // 这里的const不可以省略
  var t1 = const Teacher("name");
  var t2 = const Teacher("name");
  print(identical(t1, t2));    /// true
  
  // 这里的const可以省略
  const t3 = Teacher("name");
  const t4 = Teacher("name");
  print(identical(t3, t4));    /// true
  print(identical(t1, t4));    /// true
}
```


常量构造方法有一些注意点:

- 拥有常量构造方法的类中，所有的成员变量必须是`final`修饰的.
- 为了可以通过常量构造方法，创建出相同的对象，不再使用`new`关键字，而是使用`const`关键字
- 如果是将结果赋值给`const`修饰的标识符时，`const`可以省略.


### 工厂构造方法

- 在`Dart`提供了`factory`关键字, 用于通过工厂去获取对象
- 普通的构造函数, 会默认返回创建出来的对象, 不需要我们手动`return`
- 工厂构造方法, 需要手动返回一个对象
- 同样和上面一样的目的, 只要传入相同的参数, 那么得到的对象就是同一个, 下面通过工厂构造函数的方式实现


```dart
main(List<String> args) {
  
  var p1 = Person.fromName("titan");
  var p2 = Person.fromName("titan");
  print(identical(p1, p2)); // true
}

class Person {
  String name;

  // 用于缓存创建的对象, 避免大量的创建和销毁对象
  static final Map<String, Person> _cache = <String, Person>{};

  factory Person.fromName(String name) {
    if (_cache.containsKey(name)) {
      return _cache[name];
    } else {
      final p = Person(name);
      _cache[name] = p;
      return p;
    }
  }

  Person(this.name);
}
```


## 类的继承


### setter和getter

- `Dart`中类定义的属性默认是可以直接被外界访问的
- `Dart`中也存在`setter`和`getter`方法, 用于监听累的属性被访问的过程


```dart
main() {
  var people = People('top');
  people.setName = 'top';
  print(people.getName);
  print(people.name);

  var person = Person('titan');
  person.setName = 'jun';
  print(person.getName);
}


class People {
  String name;

  // setter
  set setName(String value) {
    this.name = value;
  }
  // getter
  String get getName {
    return 'titanjun';
  }

  People(this.name);
}
```

- 上面`setName`和`getName`是自定义的, 你也可以命名为`setterName`和`getterName`等
- 还有就是上述两个方法不是系统自动生成的, 是需要我们手动添加的
- 简单的方式也可以使用箭头函数


```dart
class Person {
  String name;

  // setter
  set setName(String value) => this.name = value;
  // getter
  String get getName => 'titanjun';

  Person(this.name);
}
```


### 类的继承

- 在`Dart`中同样支持类的继承, 继承使用`extends`关键字，子类中使用`super`来访问父类
- 父类中除了构造方法外, 所有的成员变量和方法都会被继承
- 子类可以拥有自己的成员变量, 并且可以对父类的方法进行重写
- 子类中可以调用父类的构造方法，对某些属性进行初始化：
  - 子类的构造方法在执行前，将隐含调用父类的无参默认构造方法（没有参数且与类同名的构造方法）
  - 如果父类没有无参默认构造方法，则子类的构造方法必须在初始化列表中通过`super`显式调用父类的某个构造方法


```dart
class People {
  String name;

  People(this.name);

  void eat() {
    print('people -- eat');
  }
}

class Person extends People {
  int age;

  Person(String name, int age): this.age = age, super(name);

  @override
  void eat() {
    // 这里的super, 看个人需求是否调用
    super.eat();
    print('Person -- eat');
  }
}

main(List<String> args) {
  var people = People('name');
  people.eat();

  var person = Person("top", 10);
  person.eat();
}
```


### 抽象类

- 在`Dart`中抽象类是使用`abstract`声明的类
- 在`Dart`中没有具体实现的方法(没有方法体)，就是抽象方法
- 抽象方法，必须存在于抽象类中, 抽象类不能实例化
- 抽象类中的抽象方法必须被子类实现, 抽象类中的已经被实现方法, 可以不被子类重写


```dart
abstract class Size {
  int width;
  int height;

  Size(this.width, this.height);

  void getSize();

  int getArea() {
    return this.width * this.height;
  }
}

class Area extends Size {
  @override
  void getSize() {
    print('width = $width, height = $height');
  }

  Area(int width, int height): super(width, height);
}

main(List<String> args) {
  // 实例化Size会报错: Abstract classes can't be instantiated
  // var size = Size(20, 2);
  var area = Area(10, 2);
  area.getArea();
  print(area.getArea());
}
```


### 类成员和方法

在`Dart`中我们使用`static`关键字来定义类成员和类方法


```dart
main() {
 var person = Person();
 print(person.firstName);
 person.hide();

 print(Person.lastName);
 Person.show();
}


class Person {

  String firstName = 'top';
  // 不能使用this调用静态属性
  static String lastName = 'titanjun';


  void hide() {
    print('titanjun');
  }

  // 静态方法
  static void show() {
    print('https://www.$lastName.top');
  }
}
```


## 多继承

在`Dart`中只有单继承, 是不支持多继承的, 但是我们却可以通过其他方式间接实现多继承问题



### 隐式接口

- `Dart`中的接口比较特殊, 没有一个专门的关键字来声明接口, 默认情况下所有的类都是隐式接口
- 默认情况下，定义的每个类都相当于默认也声明了一个接口，可以由其他的类来实现
- 在`Dart`开发中，我们通常将用于给别人实现的类声明为抽象类
- 当将一个类能够做接口使用时, 那么实现这个接口的类, 必须实现这个接口中的所有方法
- 在`Dart`中通过`implements`来实现多继承问题, 但是必须实现这个接口中的所有方法, 而且在方法的实现中不能调用`super`方法


```dart
abstract class Woman {
  void eat();

  void student() {
    print("student");
  }
}

class Man {
  void run() {
    print("runner");
  }
}


class Student implements Woman, Man {
  @override
  void eat() {
    print("eat");
  }

  @override
  void student() {
    print("student--student");
  }

  @override
  void run() {
    // 这里不能调用super方法
    // super.run(); 
    print("run");
  }
}

main(List<String> args) {
  var stu = Student();
  stu.eat();
  stu.run();
  stu.student();
}
```


### Mixin混入

- 在通过`implements`实现某个类时，类中所有的方法都必须被重新实现(无论这个类原来是否已经实现过该方法)
- 但是某些情况下，一个类可能希望直接复用之前类的原有实现方案
- Dart提供了另外一种方案: Mixin混入的方式
  - 除了可以通过`class`定义类之外，也可以通过`mixin`关键字来定义一个类。
  - 只是通过`mixin`定义的类用于被其他类混入使用，通过`with`关键字来进行混入
  

```dart
mixin Runner {
  run() {
    print('在奔跑');
  }
}

mixin Flyer {
  fly() {
    print('在飞翔');
  }
}

// 这里可以对原方法不做任何实现
class Bird with Runner, Flyer {  }

main(List<String> args) {
  var bird = Bird();
  bird.run();
  bird.fly();
}
```


### 参考资料

- [Flutter之搞定Dart二](https://mp.weixin.qq.com/s/xdSYvqSYOXTOCeb89C1uvg): coderwhy老师的公众号知识
- [Dart官网语法介绍-英文版](https://dart.dev/guides/language/language-tour#classes)
- [Dart语言中文社区](http://www.shutongye.com/dartapi/dart-core/Map-class.html)


---
