import { aliasOf, subclass, property } from "esri/core/accessorSupport/decorators";
import Widget from "esri/widgets/Widget";
import { renderable } from "esri/widgets/support/widget";
// @ts-ignore
import * as watchUtils from "esri/core/watchUtils";
import { tsx } from "esri/widgets/support/widget";
import { RecenterViewModelProperties } from "./interfaces";
import RecenterViewModel from "./RecenterViewModel";
import { CSS } from "./styles";

// @ts-ignore
@subclass("esri.widgets.Recenter")
class Recenter extends Widget {
  constructor(params?: RecenterViewModelProperties) {
    super(params);
    this._onViewChange = this._onViewChange.bind(this);
  }

  postInitialize() {
    const handle = watchUtils.init(this, "view.center, view.interacting", () => this._onViewChange());
    this.own(handle);
  }

  //--------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------

  @aliasOf("viewModel.view")
  view: RecenterViewModel["view"];

  @aliasOf("viewModel.initialCenter")
  initialCenter: RecenterViewModel["initialCenter"];

  @aliasOf("viewModel.state")
  state: RecenterViewModel["state"];

  @property({
    type: RecenterViewModel
  })
  @renderable([
    "viewModel.view",
    "viewModel.state",
  ])
  viewModel = new RecenterViewModel();

  //-------------------------------------------------------------------
  //
  //  Public methods
  //
  //-------------------------------------------------------------------

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

  //--------------------------------------------------------------------------
  //
  //  Methods
  //
  //--------------------------------------------------------------------------

  private _onViewChange() {
    this.viewModel.onViewChange();
  };

  private _go() {
    this.viewModel.go();
  }
}

export default Recenter;