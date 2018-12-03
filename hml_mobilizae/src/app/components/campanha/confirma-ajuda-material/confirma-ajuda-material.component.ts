import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { Campanhas } from 'src/app/models/campanhas';
import { Materiais } from 'src/app/models/materiais';
import { Usuario } from 'src/app/models/usuarios';
import { AjudasService } from 'src/app/services/ajudas.service';
import { AuthService } from 'src/app/services/auth.service';
import { Ajudas } from 'src/app/models/ajudas';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface DialogData {
  campanha: Campanhas;
  material: Materiais;
}

@Component({
  selector: 'app-confirma-ajuda-material',
  templateUrl: './confirma-ajuda-material.component.html',
  styleUrls: ['./confirma-ajuda-material.component.css']
})
export class ConfirmaAjudaMaterialComponent implements OnInit {

  usuario: Usuario;
  public formConfirmaAjudaMaterial: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
    private ajudasService: AjudasService,
    public thisDiologRef: MatDialogRef<ConfirmaAjudaMaterialComponent>,
    private _auth: AuthService,
    private _fb: FormBuilder) { }

  ngOnInit() {
    this.usuario = this._auth.getCurrentUser();
    this.formConfirmaAjudaMaterial = this._fb.group({
      qtd: ['1', [Validators.required]]
    });
  }

  onCloseConfirm() {
    this.thisDiologRef.close('Confirm');
  }

  onCloseCancel() {
    this.thisDiologRef.close('Cancel');
  }

  createAjuda() {
    const dataHoje = new Date();
    const dataHj = dataHoje.toString();
    const ajuda: Ajudas = {
      campanha: this.data.campanha._id,
      tipo: this.data.campanha.tipo,
      material: this.data.material.id,
      usuario: this.usuario.userId,
      _dataRequisicao: dataHj
    };

    this.ajudasService.postAjuda(ajuda)
                .subscribe(aju => console.log(aju),
                response => console.log(response.error.message));
  }

}
