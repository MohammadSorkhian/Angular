import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false
  recipeForm: FormGroup;
  recipe:Recipe;

  constructor(
              private activatedRoute: ActivatedRoute, 
              private recipeService:RecipesService,
              private router:Router) { }
              

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] == null ? false : true;
      })
    this.initForm();
    // this.recipeService.recipeChanged.subscribe(
    //   (recipe) => {

    //   }
    // )
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode){
      this.recipe = this.recipeService.getRecipe(this.id);
      recipeName = this.recipe.name;
      recipeImagePath = this.recipe.imagePath;
      recipeDescription = this.recipe.description;
      if (this.recipe.ingredient){
        for (let ing of this.recipe.ingredient){
          recipeIngredients.push(new FormGroup({
            'name':new FormControl(ing.name, Validators.required),
            'amount': new FormControl(ing.amount, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]),
          }))
        };
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients,
    })
  }

  onSubmit(){
      console.log(this.recipeForm)
      this.recipe = new Recipe( this.recipeForm.controls['name'].value,
                                this.recipeForm.controls['description'].value,
                                this.recipeForm.controls['imagePath'].value,
                                this.recipeForm.controls['ingredients'].value,
                                )
      if(this.editMode){
        this.recipeService.updateRecipe(this.id, this.recipe);
      }else{
        this.recipeService.addRecipe(this.recipe)
      }
    this.recipeForm.reset();
    this.editMode = false
  }


  onAddIngredient(){
    (<FormArray>this.recipeForm.controls['ingredients']).push(
      new FormGroup({
        'name': new FormControl(),
        'amount': new FormControl()
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute })
  }

  onCancelIngredient(indexIngredient: number) {
  (<FormArray>this.recipeForm.controls['ingredients']).removeAt(indexIngredient)
  }
}
