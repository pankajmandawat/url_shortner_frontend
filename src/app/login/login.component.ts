import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  registerForm: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: ServiceService,
    private router: Router
  ) {}
  invalid_User: boolean = false;
  error: string = '';
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      Email_Id: ['', { updateOn: 'blur', validators: [this.validate_email] }],
      password: ['', Validators.required],
    });
  }

  //Reguar Expression for checking the email format
  validate_email(c: FormControl) {
    if (c.value.match(/^[\w._]+@[A-Za-z]+\.(com|co\.in|org)$/)) {
      return c.value;
    } else {
      console.log('Email is Invalid');
      return { emailError: { message: 'Email is Invalid' } };
    }
  }

  //Function to call when credentials submitted by the user and
  login() {
    console.log('Inside Login Function');
    console.log(this.registerForm.value);
    // if (!this.registerForm.value.Email_Id || !this.registerForm.value.password) {
    //   throw new Error("Please provide Email_Id Or/And Password");
    // }
    this.http.user_auth(this.registerForm.value).subscribe(
      (response) => {
        this.router.navigateByUrl('http://localhost:4200/sturl');
      },
      (error) => {
        console.log("Login Error");
        console.log(error);
        this.error = error;
        this.invalid_User = true;
      }
    );
  }
}
