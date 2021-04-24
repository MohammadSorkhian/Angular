import { ArrayType } from '@angular/compiler';
import { Reference } from '@angular/compiler/src/render3/r3_ast';
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListsService } from '../shopping-lists.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  // styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  shoppingForm: FormGroup;
  subscription: Subscription;
  editMode = false;
  index:number;
  ingredient:Ingredient;
  
  constructor(private shoppingListsServce: ShoppingListsService) {
  }
   
  ngOnInit(): void {
    this.shoppingForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, this.invalidAmount]),
    });

    this.subscription = this.shoppingListsServce.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.index = index;
        this.ingredient = this.shoppingListsServce.getIngredients()[index];
        this.shoppingForm.patchValue({ 'name': this.ingredient.name, 'amount': this.ingredient.amount })
      })
  }
      
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
    
  onAddClicked() {
    const ingName = this.shoppingForm.controls.name.value;
    const ingAmount = this.shoppingForm.controls.amount.value;
    if (this.editMode) {
      this.updateIngredient(ingName, ingAmount)
    } else
      this.shoppingListsServce.addIngredient(new Ingredient(ingName, ingAmount));
    this.shoppingForm.reset();
  }

  onDeleteClicked() {
    this.shoppingListsServce.deteleIngredient(this.index);
    this.onClear()
  }

  onClear() {
    this.shoppingForm.reset();
    this.editMode = false;
  }

  invalidAmount(formControl:FormControl):{[key:string]:boolean}{
    if( formControl.value < 1 ){
      return {'invalidAmount': true}
    }else{
      return null
    }
  }

  updateIngredient(ingName:string, ingAmount:number){
    this.ingredient.amount = ingAmount;
    this.ingredient.name = ingName;
    this.editMode = false;
  }

}
