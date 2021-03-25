import MapView from "esri/views/MapView";

export type Coordinates = number[];

export interface RecenterViewModelProperties extends __esri.WidgetProperties {
  view: MapView;
  initialCenter: Coordinates;
}

export interface State {
  longitude: number;
  latitude: number;
  scale: number;
  enabled: boolean;
}
