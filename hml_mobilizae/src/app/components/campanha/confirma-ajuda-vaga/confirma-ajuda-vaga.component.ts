import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { Campanhas } from '../../../models/campanhas';
import { Vagas } from '../../../models/vagas';
import { AjudasService } from '../../../services/ajudas.service'
import { Ajudas } from 'src/app/models/ajudas';

export interface DialogData {
  campanha: Campanhas;
  vaga: Vagas;
}

@Component({
  selector: 'app-confirma-ajuda-vaga',
  templateUrl: './confirma-ajuda-vaga.component.html',
  styleUrls: ['./confirma-ajuda-vaga.component.css']
})
export class ConfirmaAjudaVagaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private ajudasService: AjudasService,
              public thisDiologRef: MatDialogRef<ConfirmaAjudaVagaComponent>) { }

  ngOnInit() {
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
      vaga: this.data.vaga._id,
      _dataRequisicao: dataHj
    };

    this.ajudasService.postAjuda(ajuda)
                .subscribe(aju => console.log('Bem vindo(a) '),
                response => console.log(response.error.message));
  }

}
