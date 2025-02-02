import {Images} from "./Images";

export interface SpotComment{
  uuid? : number;
  name : string;
  description : string;
  spotUuid? : number;
  username? : string;
  creationDate? : string;
  images: Images[];
}
