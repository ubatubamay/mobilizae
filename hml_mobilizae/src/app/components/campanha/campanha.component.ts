import { Component, OnInit } from '@angular/core';
import { CampanhasService } from '../../services/campanhas.service';
import { Campanhas } from '../../models/campanhas';
import { Vagas } from '../../models/vagas';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmaAjudaVagaComponent } from './confirma-ajuda-vaga/confirma-ajuda-vaga.component';

@Component({
  selector: 'app-campanha',
  templateUrl: './campanha.component.html',
  styleUrls: ['./campanha.component.css']
})
export class CampanhaComponent implements OnInit {

  campanha: Campanhas;

  constructor(public campanhaService: CampanhasService,
              public route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.campanhaService.getCampanha(this.route.snapshot.params['id'])
      .subscribe(campanha => this.campanha = campanha);
  }

  openDialogAjudarVaga(campanha: Campanhas, vaga: Vagas) {
    const dialogRef = this.dialog.open(ConfirmaAjudaVagaComponent, {
      data: {campanha: campanha, vaga: vaga},
      width: '600px'
    });
  }

}
