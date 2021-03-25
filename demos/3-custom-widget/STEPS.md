# 自定义微件

## 创建微件类

新建`Recenter.tsx`，并继承自`Widget`

``` tsx
import { subclass, property } from "esri/core/accessorSupport/decorators";
import Widget from "esri/widgets/Widget";

import { tsx } from "esri/widgets/support/widget";

// @ts-ignore
@subclass("esri.widgets.Recenter")
class Recenter extends Widget {
  constructor(params?: any) {
    super(params);
  }
}
```

## 添加渲染方法

``` tsx
  render() {
    return (
      <div class="esri-widget--button esri-widget esri-home">
        <span class="esri-icon esri-icon-home"></span>
      </div>
    );
  }
```

## 导出微件

```tsx
export default Recenter;
```

## 实例化微件

在`main.ts`中引入`Recenter`

``` tsx
import Recenter from "./Recenter";

view.when(function () {
  const recenter = new Recenter();
  view.ui.add(recenter, "top-right");
});
```

访问测试页面，看看右上角是否已经添加上了我们的微件。🎉

## 添加事件

先修改`render`方法，在`div`上绑定点击事件，加上私有方法。

``` tsx
  render() {
    return (
      <div
        bind={this}
        onclick={this._go}
        class="esri-widget--button esri-widget esri-home"
      >
        <span class="esri-icon esri-icon-home"></span>
      </div>
    );
  }
```

> 注意绑定`this`。

添加私有方法，和`render`方法平级。使用`goTo`方法实现。

```tsx
  //-------------------------------------------------------------------
  //
  //  Private methods
  //
  //-------------------------------------------------------------------
  private _go() {
    this.view.goTo(this.initialCenter);
  }
```

方法中需要的`this.view`和`this.initialCenter`，添加到属性上。

```tsx
  //----------------------------------
  //  view
  //----------------------------------

  @property()
  view: MapView;

  //----------------------------------
  //  initialCenter
  //----------------------------------

  @property()
  initialCenter: Coordinates;
```

在示例化的时候，传入参数

``` tsx
  const recenter = new Recenter({
    view: view,
    initialCenter: [120, 30],
  });
```

构造器中接收参数

``` tsx
  constructor(params?: RecenterParams) {
    super(params);
  }
```

补充类型

```tsx
import type MapView from "esri/views/MapView";
type Coordinates = number[];
interface RecenterParams extends __esri.WidgetProperties {
  view: MapView,
  initialCenter: Coordinates
}
```

访问测试页面，试试点击事件是否已经生效。🎉

## 监听地图

上一步中我们已经能通过微件，影响到地图。现在我们来试试，通过地图的变化，影响微件。

我们监听地图的中心点坐标和比例尺，并展示到微件上。

先增加一个属性叫`state`，用来存中心点坐标。

``` tsx
  //----------------------------------
  //  state
  //----------------------------------

  @property()
  @renderable()
  state: State;
```

`state`是一个对象。

```tsx
interface State {
  longitude: number;
  latitude: number;
  scale: number;
}
```

改变`render`函数，增加坐标的显示。

``` tsx
  render() {
    const { longitude, latitude, scale } = this.state;
    return (
      <div
        bind={this}
        onclick={this._go}>
        <p>longitude: {Number(longitude).toFixed(3)}</p>
        <p>latitude: {Number(latitude).toFixed(3)}</p>
        <p>scale: {Number(scale).toFixed(5)}</p>
      </div>
    );
  }
```

在生命周期`postInitialize`函数中，加入对`view`的监听

``` tsx
  postInitialize() {
    watchUtils.init(this, "view.center, view.scale", () => this._onViewChange());
  }
```

`watchUtils`是官方提供的一个监听工具

``` tsx
// @ts-ignore
import * as watchUtils from "esri/core/watchUtils";
```

添加函数处理`view`的变化

``` tsx
  private _onViewChange() {
    const { scale, center } = this.view;
    const { latitude, longitude } = center;
    this.state = {
      latitude,
      longitude,
			scale,
    };
  }
```

为保存正确的`this`指向，在构造器中做一次绑定。

```tsx
  constructor(params?: RecenterParams) {
    super(params);
    this._onViewChange = this._onViewChange.bind(this);
  }
```

访问测试页面，看看坐标信息是否已经显示到微件上，再拖动地图呢。🎉

## 增加自定义功能

既然我们能监听到`view`上的坐标信息，现在来实现一个自定义功能：当中心点在初始点一定范围内时，禁用点击功能；当中心点大于一定范围时，才能使用点击功能。

增加一个`enabled`属性也挂到`state`上

```tsx
interface State {
  longitude: number;
  latitude: number;
  scale: number;
  enabled: boolean;
}
```

修改`_onViewChange`函数

```tsx
  private _onViewChange() {
    const { scale, center } = this.view;
    const { latitude, longitude } = center;
    let enabled = false;
    if (
      Math.abs(longitude - 120) > 0.2
      || Math.abs(latitude - 30) > 0.2
    ) {
      enabled = true;
    }
    this.state = {
      latitude,
      longitude,
      scale,
      enabled,
    };
  }
```

修改`_go`函数

```tsx
  private _go() {
    if (this.state.enabled) {
      this.view.goTo(this.initialCenter);
    }
  }
```

为了看上去更明显，增加一点样式，修改`render`函数

```tsx
  render() {
    const { longitude, latitude, scale, enabled } = this.state;
    const rootClasses = {
      [CSS.enabled]: enabled
    };
    return (
      <div
        bind={this}
        onclick={this._go}
        class={this.classes(CSS.base, rootClasses)}
      >
        <p>longitude: {Number(longitude).toFixed(3)}</p>
        <p>latitude: {Number(latitude).toFixed(3)}</p>
        <p>scale: {Number(scale).toFixed(5)}</p>
      </div>
    );
  }
```

在微件类之外，添加样式对象

```tsx
const CSS = {
  base: "recenter-tool",
  enabled: "recenter-tool--enabled"
};
```

样式文件，红色为禁用状态，蓝色为可用状态

``` css
.recenter-tool {
  padding: 2em;
  width: 150px;
  height: 50px;
  color: #fff;
  background: rgba(255, 0, 0, 0.5);
}

.recenter-tool--enabled {
  background: rgba(0, 0, 255, 0.5);
}

.recenter-tool>p {
  margin: 0;
}
```

访问测试页面，微件的自定义功能是不是已经加上了呢。🎉

## 拆分文件

如果项目特别复杂，可以拆出`interfaces.d.ts`、`RecenterViewModel.ts`等文件。

