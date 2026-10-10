// src/types/imovel.types.ts

export type StatusImovel = "ALUGADO" | "VAGO";

export type Estado =
  | "AC"
  | "AL"
  | "AP"
  | "AM"
  | "BA"
  | "CE"
  | "DF"
  | "ES"
  | "GO"
  | "MA"
  | "MT"
  | "MS"
  | "MG"
  | "PA"
  | "PB"
  | "PR"
  | "PE"
  | "PI"
  | "RJ"
  | "RN"
  | "RS"
  | "RO"
  | "RR"
  | "SC"
  | "SP"
  | "SE"
  | "TO";

export interface EnderecoDto {
  idEndereco?: number;
  cepImovel: string;
  ruaImovel: string;
  bairroImovel: string;
  cidadeImovel: string;
  estadoImovel: Estado;
}

export interface DespesaDto {
  idDespesa?: number;
  iptuImovel: number;
  condominio: number;
}

export interface ImovelDto {
  idImovel: number;
  nomeImovel: string;
  endereco: EnderecoDto | null;
  statusImovel: StatusImovel;
  valorAluguelImovel: number;
  valor_imovel: number;
  listaDespesas: DespesaDto[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  timestamp?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}