import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-area-cidadao',
  templateUrl: './area-cidadao.component.html',
  styleUrls: ['./area-cidadao.component.css']
})
export class AreaCidadaoComponent implements OnInit {

  usuario: Usuario;

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    this.usuario = this._auth.getCurrentUser();
  }

}
