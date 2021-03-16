import { subclass, property } from "esri/core/accessorSupport/decorators";
import Widget from "esri/widgets/Widget";
// @ts-ignore
import * as watchUtils from "esri/core/watchUtils";
import { renderable, tsx } from "esri/widgets/support/widget";
import type MapView from "esri/views/MapView";
type Coordinates = number[];
interface RecenterParams extends __esri.WidgetProperties {
  view: MapView;
  initialCenter: Coordinates;
}

interface State {
  longitude: number;
  latitude: number;
  scale: number;
  enabled: boolean;
}


const CSS = {
  base: "recenter-tool",
  enabled: "recenter-tool--enabled"
};

// @ts-ignore
@subclass("esri.widgets.Recenter")
class Recenter extends Widget {
  constructor(params?: RecenterParams) {
    super(params);
    this._onViewChange = this._onViewChange.bind(this);
  }

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

  //----------------------------------
  //  state
  //----------------------------------

  @property()
  @renderable()
  state: State;

  postInitialize() {
    watchUtils.init(this, "view.center, view.scale", () => this._onViewChange());
  }

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
  //-------------------------------------------------------------------
  //
  //  Private methods
  //
  //-------------------------------------------------------------------
  private _go() {
    if (this.state.enabled) {
      this.view.goTo(this.initialCenter);
    }
  }
  
  private _onViewChange() {
    const { scale, center } = this.view;
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
      scale,
      enabled,
    };
  }
}

export default Recenter;
