import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListsService } from './shopping-lists.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  // styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients:Ingredient[];
  ingredientChangeSubject: Subscription;

  constructor(private shoppingListService:ShoppingListsService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
   this.ingredientChangeSubject = this.shoppingListService.ingredientChanged.subscribe((ingredients:Ingredient[]) => this.ingredients = ingredients )
  }

  ngOnDestroy(){
    this.ingredientChangeSubject.unsubscribe();
  }

}
