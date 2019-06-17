import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  info: any;
  constructor(private storage: Storage) {
    this.storage.get('auth').then((val) => {
      this.info = JSON.parse(val);
    })
  }

  ngOnInit() {
  }

}
