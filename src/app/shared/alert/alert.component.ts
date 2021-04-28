import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  @Output()
  closeEvent = new EventEmitter<void>();

  @Input()
  message: string;

  onClose(){
    this.closeEvent.emit();
  }

}
