import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import {map, tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private recipeService: RecipesService, private http:HttpClient) { }

  public storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    return this.http.put('https://ng-complete-89d92-default-rtdb.firebaseio.com/recipes.json', recipes)
  }

  public fetchData(){
    return this.http.get<Recipe[]>('https://ng-complete-89d92-default-rtdb.firebaseio.com/recipes.json')
    .pipe( 
      map( response => {
      return response.map( recipe => { 
        return {...recipe, ingredient: recipe.ingredient ? recipe.ingredient : []}
      })})
      ,tap( response => this.recipeService.setRecipes(response) )
      )
  }
}
