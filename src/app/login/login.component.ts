import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  loginForm= this.fb.group({
   
    email: [null, Validators.compose([ Validators.pattern('^[a-zA-Z_.+-]+@[a-zA-Z-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
    password: [null, Validators.compose([ Validators.minLength(6), Validators.maxLength(12), Validators.required])],
  });

    constructor(private fb: FormBuilder, 
      private route: Router

  ) { }

  onSubmit() {
    alert('Thanks!');
  }

    login(){
  this.route.navigateByUrl('/menu/home')
}

  ngOnInit() {
  }

}
