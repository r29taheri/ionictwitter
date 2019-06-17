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
        'Authorization': 'Bearer $2y$10$Q2VRKOscKhvMPvh/21c9l.8KPujpHWpRj0LsgRamvkDvVeEMSMfPu'
      })
    }
    return this.http.get(url, options);
  }
}