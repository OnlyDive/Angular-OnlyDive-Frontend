import { Injectable } from '@angular/core';

import { MessageInfo } from '../component/message/MessageInfo';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor() { }

  getResponseErrors(e:any): [string, MessageInfo] {
    console.log(e);

    var errorText: string = "Errors: ";

    try {
      const errorResponse = JSON.parse(e.error);

      if (errorResponse.errors.length == 1)
        errorText = "Error: ";

      errorText += errorResponse.errors.join(', ');
    } catch(ex) {
      console.log(ex);
      errorText = "Error: " + e.error;
    }

    var messageInfo: MessageInfo = {
      color: "red",
      text: errorText,
      textColor: "white",
      enabled: true
    }

    return [errorText, messageInfo];

  }

}
