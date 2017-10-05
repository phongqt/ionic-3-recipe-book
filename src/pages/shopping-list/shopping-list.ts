import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { ShoppingListService } from '../../services/shopping-list';
import { Ingredient } from '../../model/ingredient';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems: Ingredient[] = [];

  constructor(private slService: ShoppingListService) { }

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    const item = new Ingredient(form.value.ingredientName, form.value.amount);
    this.slService.addItem(item);
    form.reset();
    this.loadItems();
  }

  onRemoveItem(idx: number) {
    this.slService.removeItem(idx);
  }

  private loadItems() {
    this.listItems = this.slService.getItems();
  }
}
