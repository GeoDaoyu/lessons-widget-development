import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import BasemapToggle from "esri/widgets/BasemapToggle";
import Recenter from "./Recenter";

const map = new EsriMap({
  basemap: "streets",
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [120, 30],
  zoom: 8,
});

view.when(function () {
  const recenter = new Recenter({
    view: view,
    initialCenter: [120, 30],
  });
  view.ui.add(recenter, "top-right");
});
