import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  valid = {
    email: true,
    password: true
  }

  error = {
    email: '* El email ingresado no es válido',
    password: '* Contraseña no insegura'
  }

  loginData: {
    email: any,
    password: any
  } = {
      email: new FormControl('', Validators.compose([Validators.required, Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
      password: new FormControl('', Validators.compose([Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]))
    };

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    const group: any = {
      email: this.loginData.email,
      password: this.loginData.password
    };
    this.loginForm = this.formBuilder.group(group);
  }

  formChanged(field: string) {
    if (field === 'email') {
      console.log(this.loginForm.controls.email.value)
      this.valid.email = this.loginForm.controls.email.valid;
    } else if (field === 'password') {
      this.valid.password = this.loginForm.controls.password.valid;
    }
  }

  logIn() {
    this.router.navigate(['/home'])
  }

}
