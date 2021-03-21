import Accessor from "esri/core/Accessor";
import { property, subclass } from "esri/core/accessorSupport/decorators";
import { renderable } from "esri/widgets/support/widget";
import { Coordinates, State } from "./interfaces";
import type MapView from "esri/views/MapView";
import type Point from "esri/geometry/Point";

// @ts-ignore
@subclass("esri.demo.RecenterViewModel")
class RecenterViewModel extends Accessor {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor() {
    super();
  }

  //--------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------

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

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  public onViewChange() {
    const { scale, center } = this.view;
    const { latitude, longitude } = center;
    const enabled = this._checkEnabled(center);
    this.state = {
      latitude,
      longitude,
      scale,
      enabled,
    };
  }

  public go() {
    if (this.state.enabled) {
      this.view.goTo(this.initialCenter);
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _checkEnabled(center: Point): boolean {
    const { longitude, latitude } = center;
    return Math.abs(longitude - 120) > 0.2 || Math.abs(latitude - 30) > 0.2;
  }
}

export default RecenterViewModel;
