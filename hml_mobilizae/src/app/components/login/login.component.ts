import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public thisDiologRef: MatDialogRef<LoginComponent>,
    private _auth: AuthService,
    private router: Router,
    private location: Location) { }

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

  onLogin () {
    return this._auth.loginUser(this.loginForm.value)
      .subscribe(
        data => {
          this._auth.setUser(data.user);
          this._auth.setToken(data.user.token);
          this.onCloseCancel();
          location.reload();
          this.router.navigate(['/como-funciona']);
        },
        error => console.log(error)
    );
  }

}
