import { IConvidado } from "../convidados/convidado";

export interface IEvento {
  id: number;
  nome: string;
  endereco: string;
  dataEvento: string;
  horarioEvento: string;
  valorTotalEvento: number;
  convidados: IConvidado[] | undefined;
  usuarioId: number
}
