import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth, private storage: Storage) {
  }
  TwitterAuth() {
    return this.AuthLogin(new auth.TwitterAuthProvider());
  }
  async AuthLogin(provider: auth.TwitterAuthProvider | auth.AuthProvider) {
    try {
      const result = await this.afAuth.auth.signInWithPopup(provider);
      this.storage.set('auth', JSON.stringify(result));
      console.log('You have been successfully logged in!');
      return result;
    }
    catch (error) {
      console.log(error);
      return error;
    }
  }
isAuthenticated(): any{
  return this.storage.get('auth');
  }
}