import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListsService{

  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  ingredients:Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos',10),
    new Ingredient('Potato',3),
    new Ingredient('Onion',2),
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

  deteleIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientChanged.next(this.ingredients.slice())
  }

}
