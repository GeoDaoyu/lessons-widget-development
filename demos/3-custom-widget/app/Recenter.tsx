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