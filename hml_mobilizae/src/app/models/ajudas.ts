import { MateriaisAjudas } from './materiais_ajudas';

export class Ajudas {
  _id?: string;
  campanha: any;
  tipo: string;
  vaga?: string;
  material?: MateriaisAjudas;
  status?: string;
  usuario?: string;
  _dataRequisicao: string;
}
