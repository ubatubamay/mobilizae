import { Materiais } from './materiais';
import { Vagas } from './vagas';

export class Campanhas {
  _id: string;
  tipo: string;
  titulo: string;
  resumo: string;
  sobre: string;
  dataHora: Date;
  materiais: Materiais;
  vagas: Vagas;
  _dataCriacao: Date;

}
