import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComponent } from './landing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'angular2-cookie/core';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterLinkStubDirective } from '../main/router-stubs';

describe('LandingComponent', () => {
  let comp: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let nameInput: HTMLInputElement;
  let pwdInput: HTMLInputElement;
  let loginButton: DebugElement;
  let msg: DebugElement;
  let msgr: DebugElement;

  let linkDes;
  let links;

  const cookieObject = [{'name': 'tangmo',
    'password': 'riceAndMe', 'phone': '1234567890', 'email': '123@rice.edu', 'birthday': '1996-02-10', 'zipcode': '77030'}];

  let cookieServiceStub;
  beforeEach(async(() => {
// 'fake' cookie service instead of real to avoid trouble
    cookieServiceStub = {
      getObject: function(k) {
        return cookieObject;
      },
    };
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        LandingComponent,
        RouterLinkStubDirective],
      providers: [{provide: CookieService, useValue: cookieServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    comp = fixture.componentInstance;
    // landingCookieService = fixture.debugElement.injector.get(CookieService);
    fixture.detectChanges();

  });


  it('should update error message', () => {
// simulate login operation to test
    nameInput = fixture.debugElement.query(By.css('#testname')).nativeElement;
    pwdInput = fixture.debugElement.query(By.css('#testpwd')).nativeElement;
    loginButton = fixture.debugElement.query(By.css('#testbutton'));
    nameInput.value = 'nothis';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    pwdInput.value = 'whatever';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    loginButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    msg = fixture.debugElement.query(By.css('#msg'));
    expect(msg).not.toBe(null);
  });
  it('should update success message', () => {
    nameInput = fixture.debugElement.query(By.css('#testname')).nativeElement;
    pwdInput = fixture.debugElement.query(By.css('#testpwd')).nativeElement;
    loginButton = fixture.debugElement.query(By.css('#testbutton'));
    nameInput.value = 'test';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    pwdInput.value = 'test';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    loginButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    msgr = fixture.debugElement.query(By.css('#msgr'));
    expect(msgr).not.toBe(null);
  });
  it('should navigate (to profile, main, or landing)', () => {
    nameInput = fixture.debugElement.query(By.css('#testname')).nativeElement;
    pwdInput = fixture.debugElement.query(By.css('#testpwd')).nativeElement;
    loginButton = fixture.debugElement.query(By.css('#testbutton'));
    nameInput.value = 'test';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    pwdInput.value = 'test';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    loginButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    links = linkDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
    expect(links.length).toBe(1, 'should have 1 link');
    expect(links[0].linkParams).toBe('/main', 'link go to main page');
    const clickLink = linkDes[0];
    clickLink.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(links[0].navigatedTo).toBe('/main');
  });



});
