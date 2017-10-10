import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
@Injectable()
export class HandleError {
  constructor(private alertCtrl: AlertController) {
  }

  onPresent(title: string = 'An error occurred!', errorMessager: string) {
    const alert = this.alertCtrl.create({
      title: title,
      message: errorMessager,
      buttons: ['Ok']
    });
    alert.present();
  }
}