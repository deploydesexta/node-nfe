import { Certificate } from "./certificate";

export enum Ambiente {
  Normal = 1,
  Contingencia = 2
}

export type ConsultaPorLote = {
  ambiente: Ambiente,
  certificate: Certificate,
  cnpj: string,
  estado: string,
  recibo: string,
};

export interface NFE {

  consultaPorLote(opts: ConsultaPorLote): void
  
  consultaPorChave(chave: string): void
}