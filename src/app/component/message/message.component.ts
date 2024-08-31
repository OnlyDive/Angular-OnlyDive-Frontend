import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageInfo } from './MessageInfo';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  @Input() text!: string;
  @Input() color!: string;
  @Input() textColor: string = "black";

  getDefaultErrorConfiguration(): MessageInfo {
    return { 
      color: "Crimson", 
      text: "",
      textColor: "white",
      enabled: false
    };
  }

  getDefaultMessageConfiguration(): MessageInfo {
    return { 
      color: "LightGreen", 
      text: "",
      textColor: "black",
      enabled: false
    }
  }
}
