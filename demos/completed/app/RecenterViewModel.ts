import Accessor from "esri/core/Accessor";
import { property, subclass } from "esri/core/accessorSupport/decorators";
import { RecenterViewModelProperties, Coordinates, State, Center } from "./interfaces";
import { renderable } from "esri/widgets/support/widget";
import type MapView from "esri/views/MapView";

// @ts-ignore
@subclass("esri.demo.RecenterViewModel")
class RecenterViewModel extends Accessor {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(props?: RecenterViewModelProperties) {
    super();
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

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  public onViewChange() {
    const { interacting, center } = this.view;
    const { latitude, longitude } = center;
    const enabled = this._checkEnabled(center);
    this.state = {
      latitude,
      longitude,
      interacting,
      enabled,
    };
  }

  public defaultCenter() {
    if (this.state.enabled) {
      this.view.goTo(this.initialCenter);
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _checkEnabled(center: Center): boolean {
    const { longitude, latitude } = center;
    let enabled = false;
    if (
      Math.abs(longitude - 120) > .2
      || Math.abs(latitude - 30) > .2
    ) {
      enabled = true;
    }
    return enabled;
  }
}

export default RecenterViewModel;
