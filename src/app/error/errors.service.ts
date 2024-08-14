import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor() { }

  getResponseErrors(e:any): string {
    console.log(e);

    try {
      const errorResponse = JSON.parse(e.error);
      return "Errors: " + errorResponse.errors.join(', ');
    } catch(ex) {
      return "Error: " + e.error;
    } 
  }
}
