// src/services/imovelService.ts
import api from './api';
import { ImovelDto, ApiResponse } from '../types/types'; // corrigido o caminho

const BASE_URL = '/api/imoveis'; // ajuste se o seu controller tiver outro path

export const imovelService = {
  // Listar todos
  busca: async (): Promise<ImovelDto[]> => {
    const response = await api.get<ApiResponse<ImovelDto[]>>(BASE_URL);
    return response.data.data; // acessa o array dentro do { data: [...] }
  },

  // Criar
  cria: async (imovel: ImovelDto): Promise<ImovelDto> => {
    const response = await api.post<ApiResponse<ImovelDto>>(BASE_URL, imovel);
    return response.data.data;
  },

  // Atualizar
  atualiza: async (id: number, imovel: ImovelDto): Promise<ImovelDto> => {
    const response = await api.put<ApiResponse<ImovelDto>>(`${BASE_URL}/${id}`, imovel);
    return response.data.data;
  },

  // Deletar
  deletar: async (id: number): Promise<void> => {
    await api.delete(`${BASE_URL}/${id}`);
  },
};