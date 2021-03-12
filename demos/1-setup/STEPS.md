# TypeScript + JS API Setup

1. 创建项目目录

   ```shell
   cd <project-directory>
   ```

2. 安装依赖

   ```shell
   npm install --save-dev @types/arcgis-js-api @types/dojo
   ```

3. 配置
   新建一个配置文件(`tsconfig.json`)到根目录。内容复制[官网的指导页面](https://developers.arcgis.com/javascript/latest/guide/typescript-setup/index.html#compile-typescript)。根据自己的目录结构，稍作修改。

   ```json
   {
     "compilerOptions": {
       "esModuleInterop": true,
       "module": "amd",
       "noImplicitAny": true,
       "sourceMap": true,
       "jsx": "react",
       "jsxFactory": "tsx",
       "lib": ["dom", "es2015", "es2015.promise", "scripthost"],
       "target": "es5",
       "experimentalDecorators": true,
       "preserveConstEnums": true,
       "suppressImplicitAnyIndexErrors": true,
       "importHelpers": true,
       "moduleResolution": "node"
     },
     "include": ["./demos"],
     "exclude": ["node_modules"]
   }
   ```

4. 编译并监听文件变化

   ```shell
   npx tsx -w
   ```

5. 编写 `main.ts`在 `app` 目录下

   ```ts
   import EsriMap from "esri/Map";
   import MapView from "esri/views/MapView";

   const map = new EsriMap({
     basemap: "streets",
   });

   const view = new MapView({
     map: map,
     container: "viewDiv",
     center: [120, 30],
     zoom: 8,
   });
   ```

现在部署并访问页面，就可以看到你的第一个 TypeScript 应用了! 🎉
