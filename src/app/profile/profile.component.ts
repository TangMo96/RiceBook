import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, } from '@angular/forms';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public inputname;
  public inputemail;
  public inputphone;
  public inputzip;
  public inputpassword;

  public nowIndex = this.profileCookie.get('index');
  public cookieGroup = this.profileCookie.getObject('users');
  public test = this.cookieGroup[this.nowIndex];

  public userExist = false;

  curName: string;
  curEmail: string;
  curPhone: string;
  curZipcode: string;
  curBirthday: string;

  infoForm: FormGroup;
  constructor(private fb: FormBuilder, private profileCookie: CookieService) {
    this.createForm();
    this.curName = this.test.name;
    this.curEmail = this.test.email;
    this.curPhone = this.test.phone;
    this.curZipcode = this.test.zipcode;
    this.curBirthday = this.test.birthday;
  }
  update() {
  }
  createForm() {
    this.infoForm = this.fb.group({
      name: '',
      email: '',
      phone: '',
      zip: '',
      password: '',
    });
  }
  click() {
    this.inputname = this.infoForm.get('name').value;
    this.inputemail = this.infoForm.get('email').value;
    this.inputphone = this.infoForm.get('phone').value;
    this.inputzip = this.infoForm.get('zip').value;
    this.inputpassword = this.infoForm.get('password').value;
// validate whether input part is empty and meets requirement
    if(this.inputname == this.curName) {
      this.userExist = false;
      if(this.inputemail.match(/[a-zA-Z0-9]*@[a-zA-Z0-9]*/)) {
        this.test.email = this.inputemail;
        this.curEmail = this.inputemail;
      }
      if(this.inputphone.match(/[0-9]{10}/) && this.inputphone.length === 10) {
        this.test.phone = this.inputphone;
        this.curPhone = this.inputphone;
      }
      if(this.inputzip.match(/\d{5}/) && this.inputzip.length === 5) {
        this.test.zipcode = this.inputzip;
        this.curZipcode = this.inputzip;
      }
      if(this.inputpassword != ""){
        this.test.password = this.inputpassword;
      }
      this.profileCookie.putObject('users',this.cookieGroup);
      }
    else this.userExist = true;

  }

  ngOnInit() {
  }

}
