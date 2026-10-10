// src/services/gerenciadorService.ts

import axios from "axios";

import api from "./api";

import {
  CriarImovelDto,
  ImovelDto,
  LoginRequest,
  ResultadoLogin,
} from "../types/types";

const LOGIN_URL = "/api/v1/login";
const IMOVEL_URL = "/api/v1/imovel";

/**
 * Extrai uma mensagem legível de um erro retornado pelo Axios.
 */
const extrairMensagemErro = (
  erro: unknown,
  mensagemPadrao: string
): string => {
  if (!axios.isAxiosError(erro)) {
    return mensagemPadrao;
  }

  if (!erro.response) {
    return "Não foi possível conectar ao servidor.";
  }

  if (typeof erro.response.data === "string") {
    return erro.response.data;
  }

  /*
   * Caso futuramente o backend retorne um JSON como:
   *
   * {
   *   "mensagem": "Imóvel não encontrado."
   * }
   */
  if (
    typeof erro.response.data === "object" &&
    erro.response.data !== null &&
    "mensagem" in erro.response.data &&
    typeof erro.response.data.mensagem === "string"
  ) {
    return erro.response.data.mensagem;
  }

  return mensagemPadrao;
};

/**
 * Converte o identificador digitado em nome ou e-mail,
 * conforme o formato esperado pelo backend.
 */
const montarUsuarioLogin = (
  identificador: string,
  senha: string
): LoginRequest => {
  const identificadorNormalizado =
    identificador.trim();

  const identificadorEhEmail =
    identificadorNormalizado.includes("@");

  return {
    nome: identificadorEhEmail
      ? ""
      : identificadorNormalizado,

    email: identificadorEhEmail
      ? identificadorNormalizado
      : "",

    /*
     * A senha não recebe trim porque espaços podem
     * fazer parte da credencial.
     */
    senha,
  };
};

export const gerenciadorService = {
  login: async (
    identificador: string,
    senha: string
  ): Promise<ResultadoLogin> => {
    try {
      const dadosLogin = montarUsuarioLogin(
        identificador,
        senha
      );

      const response = await api.post<string>(
        `${LOGIN_URL}/login`,
        dadosLogin
      );

      return {
        sucesso: true,
        mensagem: response.data,
      };
    } catch (erro: unknown) {
      return {
        sucesso: false,
        mensagem: extrairMensagemErro(
          erro,
          "Não foi possível realizar o login."
        ),
      };
    }
  },

  buscarTodosImoveis:
    async (): Promise<ImovelDto[]> => {
      try {
        const response = await api.get<ImovelDto[]>(
          `${IMOVEL_URL}/buscaImovel`
        );

        return response.data;
      } catch (erro: unknown) {
        throw new Error(
          extrairMensagemErro(
            erro,
            "Não foi possível buscar os imóveis."
          )
        );
      }
    },

  buscarImovelPorId: async (
    idImovel: number
  ): Promise<ImovelDto> => {
    try {
      const response = await api.get<ImovelDto>(
        `${IMOVEL_URL}/porID/${idImovel}`
      );

      return response.data;
    } catch (erro: unknown) {
      throw new Error(
        extrairMensagemErro(
          erro,
          "Não foi possível encontrar o imóvel."
        )
      );
    }
  },

  cadastrarImovel: async (
    imovel: CriarImovelDto
  ): Promise<string> => {
    try {
      const response = await api.post<string>(
        `${IMOVEL_URL}/cadastroImovel`,
        imovel
      );

      return response.data;
    } catch (erro: unknown) {
      throw new Error(
        extrairMensagemErro(
          erro,
          "Não foi possível cadastrar o imóvel."
        )
      );
    }
  },

  atualizarImovel: async (
    imovel: ImovelDto
  ): Promise<string> => {
    if (!imovel.idImovel) {
      throw new Error(
        "O ID do imóvel é obrigatório para atualização."
      );
    }

    try {
      const response = await api.post<string>(
        `${IMOVEL_URL}/update`,
        imovel
      );

      return response.data;
    } catch (erro: unknown) {
      throw new Error(
        extrairMensagemErro(
          erro,
          "Não foi possível atualizar o imóvel."
        )
      );
    }
  },

  excluirImovel: async (
    idImovel: number
  ): Promise<string> => {
    if (idImovel <= 0) {
      throw new Error(
        "O ID do imóvel informado é inválido."
      );
    }

    try {
      const response = await api.delete<string>(
        `${IMOVEL_URL}/del/${idImovel}`
      );

      return response.data;
    } catch (erro: unknown) {
      throw new Error(
        extrairMensagemErro(
          erro,
          "Não foi possível excluir o imóvel."
        )
      );
    }
  },
};