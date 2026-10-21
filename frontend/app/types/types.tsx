// src/types/imovel.types.ts

export type StatusImovel = "ALUGADO" | "VAGO";

export interface EnderecoDto {
  idEndereco?: number;
  cepImovel: string;
  ruaImovel: string;
  bairroImovel: string;
  cidadeImovel: string;
  estadoImovel: string;
}

export interface DespesaDto {
  idDespesa?: number;
  idImovel: number;
  nomeDespesa: string;
  valorDespesa: number;
}

export interface ImovelDto {
  idImovel: number;
  nomeImovel: string;
  endereco: EnderecoDto;
  statusImovel: StatusImovel;
  valorAluguelImovel: number;
  valor_imovel: number;
  listaDespesas: DespesaDto[];
}

export type CriarImovelDto = Omit<
  ImovelDto,
  "idImovel" | "listaDespesas"
>;

export interface LoginRequest {
  nome: string;
  email: string;
  senha: string;
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