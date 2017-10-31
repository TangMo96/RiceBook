import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class NavService {
  getPosts(): Promise<any> {
    return this.http.get('assets/quoto.json')
      .toPromise()
      .then(response => response.json().userPost);
  }
  getFollowing(): Promise<any> {
    return this.http.get('assets/userFollowing.json')
      .toPromise()
      .then(response => response.json().userFollowing);
  }
  addUserAndArticle(): Promise<any> {
    return this.http.get('assets/newUserAndArticle.json')
        .toPromise()
        .then(response => response.json().User);
  }3
  addArticles():Promise<any> {
    return this.http.get('assets/newArticles.json')
        .toPromise()
        .then(response => response.json().Article);
    }
  constructor(private http: Http) {
  }

}
