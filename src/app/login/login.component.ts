import {Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AuthService } from '../services/security/auth/auth.service';
import { AuthenticationRequest } from '../dto/security/authentication.request';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  errorFlag: boolean = false;
  errorMessage: string = "Nom d'utilisateur ou mot de passe incorrecte!";

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group( {
      usernameOrEmail : this.formBuilder.control(null, [Validators.required, Validators.minLength(1), Validators.maxLength(256)]),
      password : this.formBuilder.control(null, [Validators.required, Validators.maxLength(256), Validators.minLength(1)]),
    });
    this.authService.reset();
  }

  handleLogin(): void {
    this.errorFlag = false;
    let request: AuthenticationRequest = new AuthenticationRequest();
    request.username = this.loginFormGroup.value.usernameOrEmail;
    request.password = this.loginFormGroup.value.password;


    this.authService.login(request).subscribe(
      (response: any) => {
        if(response == "User not found"){
          this.errorFlag = true;
          this.errorMessage = "Nom d'utilisateur ou mot de passe incorrecte!";
          return;
        }
        this.authService.saveToken(response);
        this.router.navigate([""]).then();
      },
      (error: any) => {
        this.errorFlag = true;
        console.error("Error occurred", error); 
      }
    );

}

}
