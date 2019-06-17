import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  requestDetail: any;
  constructor(private authService: AuthService, private alertController: AlertController, private router: Router) { 
    if (authService.isAuthenticated()) {
        router.navigate(['home']);
    }
  }
  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Please try again...',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
  onLogin() {
    this.authService.TwitterAuth().then(res => {
      if(res.operationType === 'signIn') {
        this.router.navigate(['home']);
      }else if(res.message) {
        this.presentAlert(res.message);
      }
    })
  }
  ngOnInit() {
    
  }

}
