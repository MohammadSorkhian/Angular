import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  // styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  
  recipes:Recipe[];
  subscription: Subscription;

  constructor(
    private recipesService: RecipesService,
    private router:Router,
    private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.subscription = this.recipesService.recipeChanged.subscribe(
      (recipes) => { 
        this.recipes = recipes
      }
    )
    this.recipes = this.recipesService.getRecipes();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo:this.activatedRoute})
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
