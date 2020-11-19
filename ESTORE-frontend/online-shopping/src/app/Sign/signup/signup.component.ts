import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {PasswordValidators, EmailValidators} from 'ngx-validators'
import { User , Roles} from 'src/app/models/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  showFormValue : boolean = environment.showFormValue;
  signUpForm: FormGroup;
  userModel: User = new User();
  pattern: string = 'admin';
  userTypes: string[] = Object.values(Roles).filter(role => { return role.toLowerCase().indexOf(this.pattern.toLowerCase()) === -1; });
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }
  

  ngOnInit(): void {

    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, EmailValidators.normal]],
      role: ['Buyer', Validators.required],
      username: ['', Validators.required],
      password: ['',
        [
          Validators.required,
          PasswordValidators.repeatCharacterRegexRule(4),
          PasswordValidators.alphabeticalCharacterRule(1),
          PasswordValidators.digitCharacterRule(1),
          PasswordValidators.lowercaseCharacterRule(1),
          PasswordValidators.uppercaseCharacterRule(1),
          PasswordValidators.specialCharacterRule(1)
        ]
      ],
      confirmPassword: ['', Validators.required]
    });
  }

  form() { return this.signUpForm.controls; }

  onSubmit(){
    if(this.signUpForm.valid){
      this.setModelData();
      this.authService.signUp(this.userModel);  
    }    
  }

  setModelData(){
    const form = this.signUpForm.value;
    this.userModel.firstName = form.firstName;
    this.userModel.lastName = form.lastName;
    this.userModel.birthDate = form.birthDate;
    this.userModel.email = form.email;
    this.userModel.role = form.role;
    this.userModel.username = form.username;
    this.userModel.password = form.password;
    this.userModel.isApprovedUser = form.role == Roles.Seller ? 0 : 1;
  }

}
