
import type MapView from "esri/views/MapView";

export type Coordinates = number[];

interface Center {
  longitude: number;
  latitude: number;
}

export interface State extends Center {
  interacting: boolean;
  enabled: boolean;
}

export interface Style {
  textShadow: string;
}

export interface RecenterViewModelProperties extends __esri.WidgetProperties {
  view: MapView,
  initialCenter: number[]
}