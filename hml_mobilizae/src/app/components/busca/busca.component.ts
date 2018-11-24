import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
// import {Acoes, IAcoesResponse} from '../../models/acoes';
// import {FormBuilder, FormGroup} from '@angular/forms';
// import {AcoesService} from '../../services/acoes.service';
// import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { CampanhasService } from '../../services/campanhas.service';
import { Campanhas } from '../../models/campanhas';
import { Router } from '@angular/router';

export interface UF {
  value: string;
  viewValue: string;
}

export interface Cidade {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css'],
  providers: [CampanhasService]
})
export class BuscaComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['Feliz', 'Zangado', 'Zoreia'];
  filteredOptions: Observable<string[]>;

  selectedUF = '';
  estados: UF[] = [
    {value: 'RS', viewValue: 'Rio Grande do Sil'},
    {value: 'SC', viewValue: 'Santa Catarina'},
    {value: 'CE', viewValue: 'Ceará'}
  ];

  selectedCidade = '';
  cidades: Cidade[] = [
    {value: 'ch', viewValue: 'Charqueadas'},
    {value: 'sj', viewValue: 'São Jerônimo'},
    {value: 'poa', viewValue: 'Porto Alegre'}
  ];

  hasStyle = true;
  campanhas = [];
  constructor(public campanhaService: CampanhasService,
              private _router: Router) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith('6726376237'),
      map(value => this._filter(value))
    );

    this.campanhaService.getCampanhas()
      .subscribe(
        res => this.campanhas = res,
        err => console.log(err)
      );
  }

  getCampanha(campanha: Campanhas) {
    this.campanhaService.campanhaSelecionada = campanha;
    this._router.navigate(['/campanha/' + campanha._id ]);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}
