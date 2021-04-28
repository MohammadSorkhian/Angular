import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  // styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit, OnDestroy{

  isAuthenticated:boolean = false;
  subscription:Subscription;

  constructor(private dataStorageService: DataStorageService, private authService:AuthService) { }

  ngOnInit(){
    this.subscription = this.authService.user
    .subscribe( user => {
      this.isAuthenticated = user ? true: false 
      })
  }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe(response => console.log(response));
  }

  onFetchData() {
    this.dataStorageService.fetchData().subscribe();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }


}


