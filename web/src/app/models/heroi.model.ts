export interface Heroi {
  id: number;
  nome: string;
  nomeHeroi: string;
  dataNascimento?: Date;
  altura: number;
  peso: number;
  superpoderes?: Superpoder[];
}

export interface Superpoder {
  id: number;
  superpoder: string;
  descricao?: string;
}
