// src/types/imovel.types.ts
export interface EnderecoDto {
  cepImovel: string;
  ruaImovel: string;
  bairroImovel: string;
  cidadeImovel: string;
  estadoImovel: string;
}

export interface ImovelDto {
  idImovel: number;
  nomeImovel: string;
  endereco:EnderecoDto;
  statusImovel: string;
  valorAluguelImovel: bigint;
  valor_imovel: bigint;
}

// Resposta padrão da API (quando você retornar ResponseEntity<ApiResponse<...>> no backend)
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
  timestamp?: string;
}

// Resposta paginada (quando você usar Page<Imovel> no backend)
export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}