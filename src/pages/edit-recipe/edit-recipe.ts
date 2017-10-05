import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, ActionSheetController, AlertController, ToastController, NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { Ingredient } from '../../model/ingredient';
import { Recipe } from '../../model/recipe';
import { RecipeService } from '../../services/recipe';

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;
  index: number;
  recipe: Recipe;

  constructor(private navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private alerCtrl: AlertController,
    private toastCtrl: ToastController,
    private recipeService: RecipeService,
    private navCtrl: NavController) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if (this.mode == 'edit') {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }

  onSubmit() {
    const value = this.recipeForm.value;
    let ingredients = [];

    if (value.ingredients.length > 0) {
      ingredients = value.ingredients.map((e) => {
        return { name: e, amount: 1 }
      });
    }
    const model = new Recipe(value.title,
      value.description,
      value.difficulty,
      ingredients);
    if (this.mode == 'new') {
      this.recipeService.addRecipe(model);
    } else {
      this.recipeService.updateRecipe(this.index, model);
    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add ingredient',
          handler: () => {
            this.createNewAlertIngredient().present();
          }
        }, {
          text: 'Remove all Ingredients',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if (len > 0) {
              for (let i = 0; i < len; i++) {
                fArray.removeAt(0);
              }
              const toast = this.toastCtrl.create({
                message: 'All Ingredients were deleted!',
                duration: 1000,
                position: 'bottom'
              });
              toast.present();
            }
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private createNewAlertIngredient() {
    const newIngredientAlert = this.alerCtrl.create({
      title: 'Add ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Add',
          handler: data => {
            if (!data.name || !data.name.trim()) {
              const toast = this.toastCtrl.create({
                message: 'Please enter a valid name',
                duration: 1000,
                position: 'bottom'
              });
              toast.present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(
              new FormControl(data.name, Validators.required));
            const toast = this.toastCtrl.create({
              message: 'Item added!',
              duration: 1000,
              position: 'bottom'
            });
            toast.present();
          }
        }
      ]
    })
    return newIngredientAlert;
  }

  initializeForm() {
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];

    if (this.mode == 'edit') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for (let i of this.recipe.ingredients) {
        ingredients.push(new FormControl(i.name, Validators.required));
      }
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }

}
