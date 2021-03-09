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

const homeWidget = new Home({
  view: view,
});

view.ui.add(homeWidget, "top-left");

//----------------
//  Widget ViewModel
//----------------

const homeViewModel = new HomeViewModel({
  view: view,
});

const html = `<button id="homeDiv" class="esri-widget--button">主页</button>`;
domConstruct.place(html, view.container, "last");

const btn = document.getElementById("homeDiv");
on(btn, "click", () => {
  homeViewModel.go();
});

view.ui.add("homeDiv", "bottom-left");
