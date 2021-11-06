import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';

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
    password: '* Contraseña no segura'
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
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
    this.checkForCredentials();
  }

  checkForCredentials() {
    const credentials = localStorage.getItem('credentials');
    if (credentials) {
      this.api.token = JSON.parse(credentials).token;
      this.router.navigate(['home']);
    }
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
      this.valid.email = this.loginForm.controls.email.valid;
    } else if (field === 'password') {
      this.valid.password = this.loginForm.controls.password.valid;
    }
  }

  logIn() {
    const body = { email: 'eve.holt@reqres.in', password: 'pistol' };
    this.api.logIn(body).subscribe(res => {
      if (res.token) {
        localStorage.setItem('credentials', JSON.stringify(res));
        this.router.navigate(['/home'])
      }
    });
  }

}
