import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() left? : string;
  @Input() right? : string;
  @Input() bottom? : string;
  @Input() top? : string;

  @Output() btnClick = new EventEmitter();

  onClick() {
    this.btnClick.emit();
  }

}
