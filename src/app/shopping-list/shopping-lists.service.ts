import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListsService{

  ingredientChanged = new Subject<Ingredient[]>();

  ingredients:Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos',10)
  ];

  constructor() { }

  getIngredients():Ingredient[]{
    return this.ingredients.slice();
  }

  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }

}
