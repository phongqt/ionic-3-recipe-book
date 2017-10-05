import { Recipe } from "../model/recipe";

export class RecipeService {
  private recipes: Recipe[] = [];
  
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  getRecipes() {
    return this.recipes.slice()
  }

  updateRecipe(index:number, recipe:Recipe) {
    this.recipes[index] = recipe;
  }

  removeRecipe(index:number) {
    this.recipes.splice(index, 1);
  }
}