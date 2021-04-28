import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private recipeService: RecipesService,
    private http: HttpClient,
    private authService: AuthService) { }

  public storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.put('https://ng-complete-89d92-default-rtdb.firebaseio.com/recipes.json?auth=' + user.token, recipes)
      })
    )
  }

  public fetchData() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.get<Recipe[]>(
          'https://ng-complete-89d92-default-rtdb.firebaseio.com/recipes.json?auth=' + user.token)
      }),
      map(response => {
        return response.map(recipe => {
          return { ...recipe, ingredient: recipe.ingredient ? recipe.ingredient : [] }
        })
      })
      , tap(response => this.recipeService.setRecipes(response))
    )
  }
}
