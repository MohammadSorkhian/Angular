import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  // styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit {
  @Output()
  featureSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(feature:string){
    this.featureSelected.emit(feature);
  }

}
