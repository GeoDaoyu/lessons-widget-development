# 自定义微件

## 创建`Recenter.tsx`继承`Widget`

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

## 添加属性

``` tsx
  @property()
  label: string = "Home";
```

## 修改`render`方法

``` tsx
  render() {
    return (
      <div>
        {this.label}
      </div>
    );
  }
```

## 导出微件

```tsx
export default Recenter;
```

## 完整文件(UI阶段)

Recenter.tsx:

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

  @property()
  label: string = "Home";

  render() {
    return (
      <div>
        {this.label}
      </div>
    );
  }
}

export default Recenter;
```

## 在`main.ts`中引入`Recenter`

``` tsx
import Recenter from "./Recenter";

view.when(function () {
  const recenter = new Recenter();
  view.ui.add(recenter, "top-right");
});
```

访问测试页面，看看右上角是否已经添加上了我们的微件。

## 添加点击事件

在`div`上绑定事件，加上私有方法，方法需要的参数，通过实例化时获得。警告提示时，补充各个参数的定义或接口。

## 完整文件

Recenter.tsx:

```tsx
import { subclass, property } from "esri/core/accessorSupport/decorators";
import Widget from "esri/widgets/Widget";

import { tsx } from "esri/widgets/support/widget";
import type MapView from "esri/views/MapView";

type Coordinates = number[];

interface RecenterParams extends __esri.WidgetProperties {
  view: MapView,
  initialCenter: Coordinates
}

// @ts-ignore
@subclass("esri.widgets.Recenter")
class Recenter extends Widget {
  constructor(params?: RecenterParams) {
    super(params);
  }

  @property()
  label: string = "Home";

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

  render() {
    return (
      <div 
        bind={this}
        onclick={this._defaultCenter}
      >
        {this.label}
      </div>
    );
  }
  //-------------------------------------------------------------------
  //
  //  Private methods
  //
  //-------------------------------------------------------------------
  private _defaultCenter() {
    this.view.goTo(this.initialCenter);
  }
}

export default Recenter;
```

## 在`main.ts`中加入参数

``` ts
import Recenter from "./Recenter";

view.when(function () {
  const recenter = new Recenter({
    view: view,
    initialCenter: [120, 30],
  });
  view.ui.add(recenter, "top-right");
});
```

访问测试页面，点击微件，看看是否已经实现了居中视图。

## 添加地图监听事件

在生命周期函数中添加监听事件。

监听地图的中心点，并展示到微件上。

增加可用性判断。

Recenter.tsx:

```tsx
import { subclass, property } from "esri/core/accessorSupport/decorators";
import Widget from "esri/widgets/Widget";
// @ts-ignore
import * as watchUtils from "esri/core/watchUtils";
import { renderable, tsx } from "esri/widgets/support/widget";
import type MapView from "esri/views/MapView";

type Coordinates = number[];

interface Center {
  longitude: number;
  latitude: number;
}

interface State extends Center {
  interacting: boolean;
  enabled: boolean;
}

interface Style {
  textShadow: string;
}

const CSS = {
  base: "recenter-tool",
  enabled: "recenter-tool--enabled"
};

interface RecenterParams extends __esri.WidgetProperties {
  view: MapView,
  initialCenter: number[]
}

// @ts-ignore
@subclass("esri.widgets.Recenter")
class Recenter extends Widget {
  constructor(params?: RecenterParams) {
    super(params);
    this._onViewChange = this._onViewChange.bind(this);
  }

  postInitialize() {
    watchUtils.init(this, "view.center, view.interacting, view.scale", () => this._onViewChange());
  }

  //--------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------

  @property()
  @renderable()
  enabled = false;

  //----------------------------------
  //  view
  //----------------------------------

  @property()
  @renderable()
  view: MapView;

  //----------------------------------
  //  initialCenter
  //----------------------------------

  @property()
  @renderable()
  initialCenter: Coordinates;

  //----------------------------------
  //  state
  //----------------------------------

  @property()
  @renderable()
  state: State;

  //-------------------------------------------------------------------
  //
  //  Public methods
  //
  //-------------------------------------------------------------------

  render() {
    const { longitude, latitude, enabled } = this.state;
    const styles: Style = {
      textShadow: this.state.interacting ? '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black' : ''
    };
    const rootClasses = {
      [CSS.enabled]: enabled
    };
    return (
      <div
        bind={this}
        class={this.classes(CSS.base, rootClasses)}
        styles={styles}
        onclick={this._defaultCenter}>
        <p>longitude: {Number(longitude).toFixed(3)}</p>
        <p>latitude: {Number(latitude).toFixed(3)}</p>
        <p>{enabled ? "Enabled" : "Disabled"}</p>
      </div>
    );
  }

  //-------------------------------------------------------------------
  //
  //  Private methods
  //
  //-------------------------------------------------------------------

  private _onViewChange() {
    const { interacting, center } = this.view;
    const { latitude, longitude } = center;
    let enabled = false;
    if (
      Math.abs(longitude - 120) > .2
      || Math.abs(latitude - 30) > .2
    ) {
      enabled = true;
    }
    this.state = {
      latitude,
      longitude,
      interacting,
      enabled,
    };
  }

  private _defaultCenter() {
    if (this.state.enabled) {
      this.view.goTo(this.initialCenter);
    }
  }
}

export default Recenter;
```

main.css:

```css
html,
body,
#viewDiv {
  padding: 0;
  margin: 0;
  height: 100%;
}

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

## 拆分文件

如果项目特别复杂，可以拆出`interfaces.d.ts`、`RecenterViewModel.ts`等文件。

