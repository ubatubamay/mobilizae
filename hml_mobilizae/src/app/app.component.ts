import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CadastrarSeComponent } from './components/cadastrar-se/cadastrar-se.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mobilizae';
  islog = this._auth.getToken();

  constructor(public dialog: MatDialog,
    private _auth: AuthService,
    private _router: Router,
    private location: Location) {}

  openDialogSignIn() {
    const dialogRef = this.dialog.open(CadastrarSeComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogLogIn() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '600px'
    });
  }

  logout () {
    this._auth.logoutUser();
    this._router.navigate(['/']);
    location.reload();
  }
}
