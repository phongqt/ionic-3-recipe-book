import { Recipe } from "../model/recipe";
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Injectable } from '@angular/core';

import { AuthService } from './auth';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [];

  constructor(private http: Http,
    private authService: AuthService) { }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  getRecipes() {
    return this.recipes.slice()
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.put('https://ionic3-recipe-book-aa3c9.firebaseio.com/' + userId + '/recipes.json?auth=' + token, this.recipes)
      .map((response) => {
        return response.json();
      });
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://ionic3-recipe-book-aa3c9.firebaseio.com/' + userId + '/recipes.json?auth=' + token, this.recipes)
      .map((response) => {
        return response.json();
      }).do((data: Recipe[]) => {
        if (data) {
          this.recipes = data;
        } else {
          this.recipes = [];
        }
      });
  }
}