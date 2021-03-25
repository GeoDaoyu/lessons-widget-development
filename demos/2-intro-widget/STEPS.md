# 介绍微件

1. 使用Home微件
   ``` ts
   const homeWidget = new Home({
     view: view,
   });
   
   view.ui.add(homeWidget, "top-right");
   ```
   
2. 使用HomeViewModel

   ```ts
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
   ```
