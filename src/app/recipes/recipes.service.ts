import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListsService } from '../shopping-list/shopping-lists.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService{

  addToShoppingList:Ingredient[];
  recipeChanged = new Subject<Recipe[]>();

  private recipes:Recipe[] = [
    // new Recipe("A Test",
    //  "This is simply a test",
    //   "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?webp=true&quality=90&resize=620%2C563",
    //   [
    //     new Ingredient('meat',1),
    //     new Ingredient('French Fries', 20),
    // ]),
    // new Recipe("Another Test",
    //  "This is simply a test",
    //   "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?webp=true&quality=90&resize=620%2C563",
    //   [
    //     new Ingredient('buns', 2),
    //     new Ingredient('meat', 1)
    //   ]),
  ];


  constructor(private shoppingListService:ShoppingListsService) {
   }

  public getRecipes(){
    return this.recipes.slice();
  }

  public getRecipe(index: number):Recipe{
    return this.recipes[index]
  }
  
  public addIngredientsToShoppingList(ingredients:Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }
  
  public addRecipe(newRecipe:Recipe){
    this.recipes.push(newRecipe);
    this.recipeChanged.next(this.recipes.slice());
    
  }
  
  public updateRecipe(index:number, newRecipe:Recipe){
    this.recipes[index] = newRecipe
    this.recipeChanged.next(this.recipes.slice());
  }
  
  public deleteRecipe(id:number){
    this.recipes.splice(id,1);
    this.recipeChanged.next(this.recipes.slice());
  }
  
  public setRecipes(recipes:Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

}
