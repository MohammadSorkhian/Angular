import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  // styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent {

  constructor(private dataStorageService: DataStorageService) { }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe(response => console.log(response));
  }

  onFetchData() {
    this.dataStorageService.fetchData().subscribe();
  }
}


