import {LatLng} from "leaflet";

export interface Spot{
  id?:number;
  name:string;
  coordinates:LatLng;
  description:string;
  commentCount?:number;
  creatorUsername?:string;
  creationDate?:string;
}
