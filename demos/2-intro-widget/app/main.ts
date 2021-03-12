import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import Home from "esri/widgets/Home";
import HomeViewModel from "esri/widgets/Home/HomeViewModel";
import domConstruct from "dojo/dom-construct";
import on from "dojo/on";

const map = new EsriMap({
  basemap: "streets",
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [120, 30],
  zoom: 8,
});

//----------------
//  Widget
//----------------

// put widget here

//----------------
//  Widget ViewModel
//----------------

// put viewModel here
