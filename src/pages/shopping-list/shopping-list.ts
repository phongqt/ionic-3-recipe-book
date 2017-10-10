import { Component } from '@angular/core';
import { IonicPage, PopoverController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { ShoppingListService } from '../../services/shopping-list';
import { Ingredient } from '../../model/ingredient';
import { DatabaseOptionsPage } from '../database-options/database-options';
import { AuthService } from '../../services/auth';
import { HandleError } from "../../services/handle-error";

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems: Ingredient[] = [];

  constructor(private slService: ShoppingListService,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private handleError: HandleError
  ) { }

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
            this.slService.fetchList(token).subscribe((list: Ingredient[]) => {
              loading.dismiss();
              if (list) {
                this.listItems = list;
              } else {
                this.listItems = [];
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
            this.slService.storeList(token).subscribe(() => {
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
