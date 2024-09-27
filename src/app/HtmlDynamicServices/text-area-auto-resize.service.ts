import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextAreaAutoResizeService {

  constructor() { }

  TextAreaAutoResize(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight + 10}px`;
  }
}
