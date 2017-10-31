import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { NavService } from './nav.service';
import { CookieService } from 'angular2-cookie/core';
import { By } from '@angular/platform-browser';
import { RouterLinkStubDirective } from './router-stubs';
import { FormsModule } from '@angular/forms';


describe('MainComponent', () => {
  let fixture: ComponentFixture<MainComponent>;
  let comp: MainComponent;
  let cookieServiceStub;
  const post =  [{'name': 'Tang Mo', 'show': true, 'userAndComment': [{'userCo': 'king', 'comment': 'cvbghtwe  r dsdafefqwf'},
    {'userC': 'marin', 'comment': 'gshwa,asfgseth.r6e/l'}], 'time': '2016-11-01 13:55:53:223', 'img': 'assets/post6.jpg',
    'context': 'In hac habitasse platea di nec,lorem.'}
  ]
  const following = [{'name': 'Liu Xing', 'img': 'assets/icon4.jpg', 'description': 'I play CSgo Everyday'},
  ];
  const user = [{'name': 'Liangyu', 'img': 'assets/icon1.jpg', 'description': 'I love swiming but I don\'t like wearing swiming underwear'},
  ];
  const article = [{'name': 'Migu', 'show': true, 'userAndComment': [{'userCo': 'curl', 'comment': 'fdasfafhwhwrtq'}],
    'time': '1', 'img': 'assets/post3.jpg', 'context': '1hgfhfd.sad .,ewtqmqkermtg.fgamv. .42kl45m4.wtm;lgms;k;gjawprjmq;,hfsdf'},
  ];
  const cookieObject = [{'name': 'tangmo',
    'password': 'riceAndMe', 'phone': '1234567890', 'email': '123@rice.edu', 'birthday': '1996-02-10', 'zipcode': '77030'}];
// 'fake' navService
  const navServiceStub = {
      getPosts: function(){
        return new Promise((res, rej) => {
          res(post);
        });
      },
      getFollowing: function() {
        return new Promise((res, rej) => {
          res(following);
        });
      },
      addUserAndArticle: function () {
        return new Promise((res, rej) => {
          res(user);
        });
      },
      addArticles: function () {
        return new Promise((res, rej) => {
          res(article);
        });
      }
  };


  beforeEach(async(() => {
    cookieServiceStub = {
      get: function() {
        return 0;
      },
      getObject : function() {
        return cookieObject;
      },
      put: function() {
        return;
      }
    };
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        MainComponent,
        RouterLinkStubDirective
      ],
      providers: [
        {provide: NavService, useValue: navServiceStub},
        {provide: CookieService, useValue: cookieServiceStub}]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MainComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
      });

  }));
  it('should render articles', () => {
    fixture.detectChanges();
    // const articles = fixture.debugElemen
    expect( comp.postsDisplay.length ).not.toBe(0);
  });
  it('should update the search keyword', () => {
    const input = fixture.debugElement.query(By.css('#searchInput')).nativeElement;
    const button = fixture.debugElement.query(By.css('#searchButton'));
    input.value = 'Cui Hao';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(comp.postsDisplay.length).not.toBe(0);
    expect(input.value ).toEqual('Cui Hao');
  });
  it('should filter displayed articles by the search keyword', () => {
    const input = fixture.debugElement.query(By.css('#searchInput')).nativeElement;
    const button = fixture.debugElement.query(By.css('#searchButton'));
    input.value = 'Tang Mo';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(comp.postsDisplay.length).not.toBe(0);
    const postsDisplay = fixture.debugElement.queryAll(By.css('tr'));
    expect(postsDisplay.length).not.toBe(0);
  });
  it('should dispatch actions to create a new article', () => {
    const addInput = fixture.debugElement.query(By.css('#addInput')).nativeElement;
    const addButton = fixture.debugElement.query(By.css('#addButton'));
    addInput.value = '1';
    addInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    const postsDisplay = fixture.debugElement.queryAll(By.css('tr'));
    expect(postsDisplay.length).not.toBe(0);
  });
});
