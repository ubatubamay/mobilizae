import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuarios';
// TESTE
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginUserData = {};
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public thisDiologRef: MatDialogRef<LoginComponent>,
    private _auth: AuthService,
    private _router: Router,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  onCloseConfirm() {
    this.thisDiologRef.close('Confirm');
  }

  onCloseCancel() {
    this.thisDiologRef.close('Cancel');
  }

  // loginUser () {
  //   this._auth.loginUser(this.loginUserData)
  //   .subscribe(
  //     res => {
  //       localStorage.setItem('token', res.token);
  //       console.log(res);
  //       console.log(res.html);
  //       console.log(res.token);
  //       this._router.navigate(['/como-funciona']);
  //       this.onCloseCancel();
  //     },
  //     err => alert('Login Inválido')
  //   );
  // }

  loginUser () {
    this.loginService.login(this.loginForm.value)
                      .subscribe(usuario => console.log('Bem vindo(a) ' + usuario.name),
                      response => console.log(response.error.message)
    );
  }

  onLogin () {
    return this._auth.loginUser(this.loginForm.value)
                      .subscribe(
                        data => {
                          this._auth.setUser(data.user);
                          this._auth.setToken(data.user.token);
                          this.router.navigate(['/como-funciona']);
                          this.onCloseCancel();
                        },
                        error => console.log(error)
    );
  }

}
