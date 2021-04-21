import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  // styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input()
  recipe:Recipe;

  constructor(private recipeService: RecipesService) { }

  ngOnInit(): void {
  }

  onAddIngredientToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredient)
  }

}
