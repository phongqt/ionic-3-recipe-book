import { AuthService } from './../../services/auth';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(private authService: AuthService,
     private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  onSubmit(form: NgForm) {
    const loading =  this.loadingCtrl.create({
      content:'Signing you up...'
    });
    loading.present();
    this.authService.signup(form.value.email, form.value.password).then((res) => {
      loading.dismiss();
      console.log(res);
    }).catch((err) => {
      loading.dismiss();
      console.log(err);
      const alert =  this.alertCtrl.create({
        title: 'Signup failed!',
        message: err.message,
        buttons: ['Ok']
      });
      alert.present();
    })
  }

}
