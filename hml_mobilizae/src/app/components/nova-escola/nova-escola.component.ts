import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

const URL = 'http://localhost:3000/api/upload';

export interface UF {
  value: string;
  viewValue: string;
}

export interface Cidade {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-nova-escola',
  templateUrl: './nova-escola.component.html',
  styleUrls: ['./nova-escola.component.css']
})
export class NovaEscolaComponent implements OnInit {

  title = 'app';
  school = {
    role: 'escola'
  };

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

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

  constructor(private _auth: AuthService,
    private _router: Router) { }


  governos: string[] = ['Municipal', 'Estadual', 'Federal'];
  niveis: string[] = ['Infantil', 'Fundamental', 'Médio', 'Técnico', 'Superior'];

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith('6726376237'),
      map(value => this._filter(value))
    );

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
     };
  }

  registerUser() {
    this._auth.registraUsuario(this.school)
      .subscribe(
        res => {
          console.log(res);
          this._router.navigate(['/como-funciona']);
        },
        err => console.log(err)
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}
