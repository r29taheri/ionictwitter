import { Component, OnInit } from '@angular/core';
import { TweetService } from '../services/tweet.service';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  tweets: any = [];
  hashtag: any;
  showLoading: any;
  enableLoading: boolean = true;
  readFromCache: boolean = true;
  timeout = null;
  constructor(private tweetService: TweetService, private loadingController: LoadingController, private storage: Storage) {}
  showLoader() {
    this.showLoading = this.loadingController.create({
      message: 'Please wait...'
    }).then((res) => {
      res.present();
    });
    this.hideLoader();
  }
  hideLoader() {
    this.loadingController.dismiss();
  }
  callApi(hashtag: string) {
    this.showLoader();
    this.tweetService.onSearch(hashtag, 10).subscribe(
      (response: any) => {
        this.hideLoader();
        this.tweets = response.statuses;
        this.storage.set('tweets', JSON.stringify(response.statuses));
      },
      (error: any) => {
        this.hideLoader();
      }
    )
  }
  onSearch(val: string = 'ionic') {
    const hashtag = encodeURIComponent("#" + val);
    let fromCache: boolean = true;
    if(this.readFromCache && fromCache) {
      this.storage.get("tweets").then(res => {
        this.tweets = JSON.parse(res);
        this.readFromCache = false;
        fromCache = res ? true : false;
        if(!fromCache) {
          this.callApi(hashtag);
        }
      })
    } else if(!this.readFromCache || fromCache) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout( () => {
          this.callApi(hashtag);
        }, 700);
    }
  }

  ngOnInit() {
    this.onSearch();
  }
}
