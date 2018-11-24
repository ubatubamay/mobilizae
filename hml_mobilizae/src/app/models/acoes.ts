export class Acoes {
  constructor(public id: number, public name: string) {}
}

export interface IAcoesResponse {
  total: number;
  results: Acoes[];
}
