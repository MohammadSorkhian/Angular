import { ArrayType } from '@angular/compiler';
import { Reference } from '@angular/compiler/src/render3/r3_ast';
import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListsService } from '../shopping-lists.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  // styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') 
  nameInputRef:ElementRef;

  @ViewChild('amountInput')
  amountInputRef:ElementRef;
  
  constructor(private shoppingListsServce: ShoppingListsService) {
   }

  ngOnInit(): void {
  }

  onAddItem(){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    this.shoppingListsServce.addIngredient(new Ingredient(ingName,ingAmount ));
  }

}
