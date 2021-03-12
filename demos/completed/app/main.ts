import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import Home from "./Home";

const map = new EsriMap({
  basemap: "streets",
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [120, 30],
  zoom: 8,
});

const homeWidget = new Home();

view.ui.add(homeWidget, "top-left");
