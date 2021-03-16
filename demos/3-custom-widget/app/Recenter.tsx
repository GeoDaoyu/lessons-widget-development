import { subclass } from "esri/core/accessorSupport/decorators";
import Widget from "esri/widgets/Widget";

// @ts-ignore
@subclass("esri.widgets.Recenter")
class Recenter extends Widget {
  constructor(params?: any) {
    super(params);
  }
}

export default Recenter;
