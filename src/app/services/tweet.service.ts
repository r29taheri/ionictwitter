import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  constructor(private http: HttpClient) { }
  onSearch(hashtag: string, count: number ) {
    const url = `https://af1993.ir/api/twitter/${hashtag}/${count}`;
    const options = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer $2y$10$1irbofmTl7bAuII1O3jaZu4ykkIQAQxFvnnGQ9kHDlxM19lifPxe2'
      })
    }
    return this.http.get(url, options);
  }
}