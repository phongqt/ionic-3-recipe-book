import { Ingredient } from './../model/ingredient';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Injectable } from '@angular/core';

import { AuthService } from './auth';

@Injectable()
export class ShoppingListService {

  private ingredients: Ingredient[] = [];

  constructor(private http: Http,
    private authService: AuthService) { }

  addItem(item: Ingredient) {
    this.ingredients.push(item);
  }

  addItems(items: Ingredient[]) {
    this.ingredients.push(...items);
  }

  getItems() {
    return this.ingredients;
  }

  removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.put('https://ionic3-recipe-book-aa3c9.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token, this.ingredients)
      .map((response) => {
        return response.json();
      });
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.put('https://ionic3-recipe-book-aa3c9.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token, this.ingredients)
      .map((response) => {
        return response.json();
      }).do((data) => {
        this.ingredients = data;
      });
  }
}