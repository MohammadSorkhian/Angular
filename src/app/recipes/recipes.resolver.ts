import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolver implements Resolve<Recipe[]> {

  constructor(private dataStorageService:DataStorageService, private recipeService:RecipesService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if(recipes.length > 0) {
      return recipes
     } else {
    return this.dataStorageService.fetchData();}
  }
}
