# 介绍微件

1. 添加Home微件
   ``` ts
   const homeWidget = new Home({
     view: view,
   });
   
   view.ui.add(homeWidget, "top-left");
   ```
   
2. 使用ViewModel

   ```ts
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
   ```
