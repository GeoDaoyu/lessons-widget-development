import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import Home from "esri/widgets/Home";
import HomeViewModel from "esri/widgets/Home/HomeViewModel";

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

const homeViewModel = new HomeViewModel({
  view: view,
});

// <div id="home" class="esri-widget--button esri-widget esri-home">
//   <span class="esri-icon esri-icon-home"></span>
// </div>
const node = document.createElement("div");
node.id = "home";
node.innerHTML = `<span class="esri-icon esri-icon-home"></span>`;
node.className = "esri-widget--button esri-widget esri-home";
document.getElementById("viewDiv").appendChild(node);

const homeWidget = document.getElementById("home");
homeWidget.addEventListener("click", function () {
  homeViewModel.go();
});

view.ui.add(homeWidget, "top-right");
