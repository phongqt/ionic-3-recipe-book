import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, PopoverController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { DatabaseOptionsPage } from "../database-options/database-options";
import { AuthService } from "../../services/auth";
import { RecipePage } from './../recipe/recipe';
import { Recipe } from './../../model/recipe';
import { RecipeService } from './../../services/recipe';
import { HandleError } from "../../services/handle-error";

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[] = [];

  constructor(private navCtrl: NavController,
    private recipeService: RecipeService,
    private loadingCtrl: LoadingController,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
  private handleError: HandleError) {
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

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ ev: event });
    popover.onDidDismiss(data => {
      if (data && data.action) {
        if (data.action == 'load') {
          loading.present();
          this.authService.getActiveUser().getToken().then((token: string) => {
            this.recipeService.fetchList(token).subscribe((list: Recipe[]) => {
              loading.dismiss();
              if (list) {
                this.recipes = list;
              } else {
                this.recipes = [];
              }
            },
              err => {
                loading.dismiss();
                this.handleError.onPresent('An error occurred!', err.json().error);
              })
          });
        } else if (data.action == 'store') {
          loading.present();
          this.authService.getActiveUser().getToken().then((token: string) => {
            this.recipeService.storeList(token).subscribe(() => {
              loading.dismiss();
            },
              err => {
                loading.dismiss();
                this.handleError.onPresent('An error occurred!', err.json().error);
              })
          });
        }
      }
    });
  }
}
