export interface IConvidado {
  id: number;
  nome: string;
  documento: string;
  telefone: string;
  valorDevido: number;
  pago: boolean;
  eventoId: number;
}
