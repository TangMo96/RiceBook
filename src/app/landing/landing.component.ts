import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  registerForm: FormGroup;
  userForm: FormGroup;

  userName:string;
  userPassword:string;
  rigisterName: string;
  rigisterPassword: string;
  rigisterPhone: string;
  rigisterEmail: string;
  rigisterBirthday: string;
  rigisterZipcode: string;

  public rightInfo = false;
  public wrongInfo = false;
  public canLogin = false;
  public usersGroup;
  public curIndex;

  signUp() {
      this.usersGroup = this.landingCookieService.getObject('users');
      this.usersGroup.push({'name': this.rigisterName,
          'password': this.rigisterPassword, 'phone': this.rigisterPhone, 'email': this.rigisterEmail,
        'birthday': this.rigisterBirthday, 'zipcode': this.rigisterZipcode});
      this.landingCookieService.putObject('users', this.usersGroup);
  }

  loginButton(){
        this.usersGroup = this.landingCookieService.getObject('users');
        let i = 0;
        if (this.userName === 'test') {
          this.rightInfo = true;
          this.canLogin = true;
        }
// to find whether login user exists in usersGroup
        while (i < this.usersGroup.length){
            if ((this.usersGroup[i].name === this.userName && this.usersGroup[i].password === this.userPassword)) {
                this.canLogin = true;
                this.rightInfo = true;
                this.curIndex = i;
                this.landingCookieService.put('index', this.curIndex);
                break;
            }
            i++;
        }
        if(i === this.usersGroup.length ) this.wrongInfo = true;
        if(this.rightInfo === true) this.wrongInfo = false;
  }

  constructor(private fb: FormBuilder, private landingCookieService: CookieService) {
    this.createForm();
    console.log(this.landingCookieService);

  }
  createForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerForm = this.fb.group({
        name: ['', Validators.required],
        password: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required],
        birthday: ['', Validators.required],
        zipcode: ['', Validators.required],
    });
  }

  ngOnInit() {
    if(this.landingCookieService.getObject('users') == null){
      this.landingCookieService.putObject("users",[{'name':'tangmo',
        'password':'riceAndMe','phone':'1234567890','email':'123@rice.edu','birthday':'1996-02-10','zipcode':'77030'}])
    }
  }

}
