import { MateriaisAjudas } from './materiais_ajudas';

export class Ajudas {
  _id?: string;
  campanha: string;
  tipo: string;
  vaga?: string;
  material?: MateriaisAjudas;
  status?: string;
  usuario?: string;
  _dataRequisicao: string;
}
