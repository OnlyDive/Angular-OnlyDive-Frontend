import {LatLng} from "leaflet";

export interface Spot{
  id?:number;
  name:string;
  latitude:number;
  longitude:number;
  description:string;
  commentCount?:number;
  creatorUsername?:string;
  creationDate?:string;
}
