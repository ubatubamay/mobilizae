import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { CampanhasService } from '../../services/campanhas.service';
import { Campanhas } from '../../models/campanhas';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuarios';
import { Ajudas } from 'src/app/models/ajudas';
import { AjudasService } from 'src/app/services/ajudas.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

const URL = 'http://localhost:3000/api/upload';

export interface UF {
  value: string;
  viewValue: string;
}

export interface Cidade {
  value: string;
  viewValue: string;
}
/** Constants used to fill up our data base. */
const COLORS: string[] = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES: string[] = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-home-school',
  templateUrl: './home-school.component.html',
  styleUrls: ['./home-school.component.css'],
  providers: [CampanhasService]
})
export class HomeSchoolComponent implements OnInit {

  usuario: Usuario;
  ajudas: Ajudas[];

  //  -------------------- MINHAS CAMPANHAS ---------------------
  displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // ------------------- FORMULARIO --------------

  tiposCampanha: string[] = ['Material', 'Voluntariado', 'Material e Voluntariado'];

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

  public formNovaCampanha: FormGroup;

  // FUNCOES TABELA VAGAS
  private getUnit() {
    const numberPatern = '^[0-9.,]+$';
    return this._fb.group({
      nomeVaga: ['', Validators.required],
      qtd: [1, [Validators.required, Validators.pattern(numberPatern)]],
      descVaga: ['', [Validators.required]]
    });
  }

  private addUnit() {
    const control = <FormArray>this.formNovaCampanha.controls['vagas'];
    control.push(this.getUnit());
  }

  private removeUnit(i: number) {
    const control = <FormArray>this.formNovaCampanha.controls['vagas'];
    control.removeAt(i);
  }

  // FUNCOES TABELA MATERIAIS
  private getMaterial() {
    const numberPatern = '^[0-9.,]+$';
    return this._fb.group({
      qtd: ['', [Validators.required, Validators.pattern(numberPatern)]],
      tipoMaterial: ['', [Validators.required]]
    });
  }

  private addMaterial() {
    const control = <FormArray>this.formNovaCampanha.controls['materiais'];
    control.push(this.getMaterial());
  }

  private removeMaterial(i: number) {
    const control = <FormArray>this.formNovaCampanha.controls['materiais'];
    control.removeAt(i);
  }

  /**
   * Save form data
   */
  save(model: any, isValid: boolean, e: any) {
    model.escola = this.usuario.userId;
    e.preventDefault();
    alert('Form data are: ' + JSON.stringify(model));
    this.campanhaService.postCampanha(model)
    .subscribe(res => {
      console.log('OK. Cadastrado');
    });
  }

  constructor(public campanhaService: CampanhasService,
    private _router: Router,
    private _fb: FormBuilder,
    private _auth: AuthService,
    private ajudaService: AjudasService) {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {

    this.usuario = this._auth.getCurrentUser();
    this.ajudaService.getRequisicoesAjudaEscola(this.usuario.userId).subscribe(ajudas => {
      this.ajudas = ajudas;
    }, error => console.log(error));

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.formNovaCampanha = this._fb.group({
      tipo: ['', [Validators.required]],
      titulo: ['', [Validators.required, Validators.maxLength(25)]],
      resumo: ['', [Validators.maxLength(140)]],
      sobre: ['', [Validators.required]],
      dataHora: ['', [Validators.required]],
      vagas: this._fb.array([
         this.getUnit()
      ]),
      materiais: this._fb.array([
        this.getMaterial()
     ])
    });
  }

  applyFilter(filterValue: string) {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith('6726376237'),
      map(value => this._filter(value))
    );

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
     };

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}
