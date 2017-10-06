import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, AlertController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../services/auth';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {

  }

  onSubmit(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();
    this.authService.signin(form.value.email, form.value.password).then((res) => {
      loading.dismiss();
    }).catch((err) => {
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Singin failed!',
        message: err.message,
        buttons: ['Ok']
      });
      alert.present();
    })
  }

}
