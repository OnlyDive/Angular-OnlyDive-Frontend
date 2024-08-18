import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-button.component.html',
  styleUrl: './header-button.component.css'
})
export class HeaderButtonComponent {
  @Input() text!: string;
  @Input() color!: string;
  @Output() btnClick = new EventEmitter();

  onClick() {
    this.btnClick.emit();
  } 
}
