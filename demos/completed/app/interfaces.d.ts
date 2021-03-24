import Accessor from "esri/core/Accessor";
import MapView from "esri/views/MapView";

export type Coordinates = number[];

export interface RecenterViewModelProperties extends Accessor {
  view: MapView;
  initialCenter: Coordinates;
}

export interface State {
  longitude: number;
  latitude: number;
  scale: number;
  enabled: boolean;
}
