import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../model/recipe';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, NavController, AlertController } from 'ionic-angular';
import { RecipeService } from '../../services/recipe';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
  recipe: Recipe;
  index: number;

  constructor(private navParams: NavParams,
    private navCtrl: NavController,
    private recipeService: RecipeService,
    private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

  onAddIngredients() {
  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: 'edit', recipe: this.recipe, index: this.index });
  }

  onDeleteRecipe() {
    const altCtrl = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Are you sure you want to delete this recipe?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Delete',
        handler: () => {
          this.recipeService.removeRecipe(this.index);
          this.navCtrl.popToRoot();
        }
      }]
    })
    altCtrl.present();
  }
}
