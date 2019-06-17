import { Component } from '@angular/core';

import { Platform, AlertController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertController: AlertController, 
    private router: Router,
    private menu: MenuController,
    private storage: Storage
  ) {
    this.initializeApp();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.menu.close('leftMenu');
            this.logout();
          }
        }
      ]
    });
    await alert.present();
  }
  logout() {
    this.storage.remove('auth');
    this.storage.remove('tweets');
    this.router.navigate(['auth']);
  }
  changePage(name: string) {
    this.router.navigate([name]);
    this.menu.close('leftMenu');
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
