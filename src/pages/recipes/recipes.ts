import { RecipePage } from './../recipe/recipe';
import { Recipe } from './../../model/recipe';
import { RecipeService } from './../../services/recipe';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[] = [];

  constructor(private navCtrl: NavController,
    private recipeService: RecipeService) {
  }

  ionViewWillEnter() {
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: 'new' });
  }

  onLoadRecipe(item: Recipe, index: number) {
    this.navCtrl.push(RecipePage, {
      index: index,
      recipe: item
    });
  }

}
