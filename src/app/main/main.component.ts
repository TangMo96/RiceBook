import { Component, OnInit } from '@angular/core';
import {NavService} from './nav.service';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],

})

// class NgIfSimple{
//   public show;
//   show : boolean  = true ;
// }
export class MainComponent implements OnInit {

  // all the input
  input: string;
  search: string;
  headline: string;
  addUser: string;
  // following array acquires data from json, and followingDisplay array is used to display,
  // Therefore when refreshing, everything back to the previous
  public following;
  public followingDisplay;
  public posts;
  public postsDisplay;
  public headlineDisplay;
  public userAndArticle;
  public newArticles;
  public index = 0;
  public flag;
  public change;
  public currentIndex = this.cookieService.get('index');
  public currentUser = this.cookieService.getObject('users')[this.currentIndex].name;
  public newPosts;
  showToUnshow(k) {
      for (let i = 0; i < this.postsDisplay.length; i++) {
        if (this.postsDisplay[i].time === k) {
          this.postsDisplay[i].show = !this.postsDisplay[i].show;
          break;
        }
      }
  }
  updateHeadline() {
    if (this.headline != null) {
        this.cookieService.put('head', this.headline);
        this.headlineDisplay = this.cookieService.get('head');

    }
    this.headline = null;
  }
  cancel() {
    this.input = null;
  }
// transfer timestamp to readable time
  getTime(time) {
    const datetime = new Date();
    datetime.setTime(time);
    const year = datetime.getFullYear();
    const month = datetime.getMonth() + 1;
    const date = datetime.getDate();
    const hour = datetime.getHours();
    const minute = datetime.getMinutes();
    const second = datetime.getSeconds();
    const mseconds = datetime.getMilliseconds();
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second + '.' + mseconds;
  }
// add new post to head of postsDisplay array so that it shows in the beginning
  onClick() {
    if (this.input != null) {
      const timestamp = (new Date()).valueOf();
      this.newPosts = this.cookieService.getObject('newPosts');
      if (this.newPosts == null) {
        this.newPosts = [];
      }
      this.newPosts.push({'name': 'Tang Mo', 'time': this.getTime(timestamp), 'img': 'assets/post4.jpg', 'context': this.input});
      this.cookieService.putObject('newPosts', this.newPosts);
      console.log(this.cookieService.getObject('newPosts'));
      for (let j = 0; j < this.newPosts.length; j++) {
        this.postsDisplay.unshift(this.newPosts[j]);
      }
      this.input = null;
    }

  }
  addFollowing() {
      this.index = 0;
      this.change = false;
      this.flag = '';
      if (this.addUser != null) {
        while (this.index < this.userAndArticle.length) {
          if (this.addUser === this.userAndArticle[this.index].name) {
            this.followingDisplay.unshift(this.userAndArticle[this.index]);
            this.newArticles[this.index].time = this.getTime((new Date()).valueOf());
            this.postsDisplay.unshift(this.newArticles[this.index]);
            this.userAndArticle.splice(this.index, 1);
            this.newArticles.splice(this.index, 1);
            this.change = true;
          }
          this.index++;
        }
      }
      if (!this.change) {
        this.flag = 'no this user';
      }
      if (this.userAndArticle.length === 0) {
        this.flag = 'can not add more followers!';
      }
  }
  unfollowing(unname) {
    let i = 0;
    let length = this.followingDisplay.length;
    while (i < length) {
      if (this.followingDisplay[i].name === unname) {
        this.followingDisplay.splice(i, 1);
        this.postsDisplay.splice(i,1);
        i -= 1;
        length -= 1;
      }
      i++;
    }

  }
  searchFor() {
    if (this.search != null) {
      let j = 0;
      let len = this.postsDisplay.length;
      while (j < len) {
        console.log(this.search);
        // if post doesn't contain keywords,delete it from postsDisplay array
        if (this.postsDisplay[j].name.indexOf(this.search) < 0 && this.postsDisplay[j].context.indexOf(this.search) < 0) {
          this.postsDisplay.splice(j, 1);
          j -= 1;
          len -= 1;
        }
        j++;
      }
    }
  }

  constructor(private mainService: NavService, private cookieService: CookieService) {
    this.posts = [];
    this.mainService.getPosts().then(posts => {
      this.posts = posts;
      this.postsDisplay = this.posts.slice(0);
      this.newPosts = this.cookieService.getObject('newPosts');
      if (this.newPosts == null) {
        this.newPosts = [];
      }
      for (let j = 0; j < this.newPosts.length; j++) {
        this.postsDisplay.unshift(this.newPosts[j]);
      }
    });
    this.mainService.getFollowing().then(following => {
      this.following = following;
      this.followingDisplay = this.following.slice(0);
    });
    this.headlineDisplay = this.cookieService.get('head');
    this.mainService.addUserAndArticle().then(userAndArticle => {
      this.userAndArticle = userAndArticle;
    });
    this.mainService.addArticles().then(newArticles => {
      this.newArticles = newArticles;
    });
  }
  ngOnInit() {
  }

}
