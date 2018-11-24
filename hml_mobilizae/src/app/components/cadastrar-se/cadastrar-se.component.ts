import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-se',
  templateUrl: './cadastrar-se.component.html',
  styleUrls: ['./cadastrar-se.component.css']
})
export class CadastrarSeComponent implements OnInit {

  user = {
  };

  constructor(public thisDiologRef: MatDialogRef<CadastrarSeComponent>,
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  onCloseConfirm() {
    this.thisDiologRef.close('Confirm');
  }

  onCloseCancel() {
    this.thisDiologRef.close('Cancel');
  }

  registerUser() {
    this._auth.registraUsuario(this.user)
      .subscribe(
        res => {
          console.log(res);
          this._router.navigate(['/como-funciona']);
          this.onCloseCancel();
        },
        err => console.log(err)
      );
  }

}
