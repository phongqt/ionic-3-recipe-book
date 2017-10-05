import { Ingredient } from './../model/ingredient';
export class ShoppingListService {
  
  private ingredients: Ingredient[] = [];

  addItem(item:Ingredient) {
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
}