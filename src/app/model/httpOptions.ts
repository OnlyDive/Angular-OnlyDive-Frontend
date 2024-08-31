import {HttpHeaders} from "@angular/common/http";

export const httpOptionsForJSON = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export const httpOptionsForRaw = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  responseType: 'text' as 'json'
};
