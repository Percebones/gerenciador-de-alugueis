import axios from "axios";
import api from "./api";

import {
  CriarImovelDto,
  ImovelDto,
  LoginRequest,
} from "../types/types";

const LOGIN_URL = "/api/v1/login";
const IMOVEL_URL = "/api/v1/imovel";

interface RespostaComMensagem {
  mensagem?: unknown;
  message?: unknown;
}

interface RespostaComImoveis {
  imoveis?: unknown;
  content?: unknown;
}

/**
 * Extrai uma mensagem legível de um erro retornado pelo Axios.
 */
const extrairMensagemErro = (
  erro: unknown,
  mensagemPadrao: string
): string => {
  if (!axios.isAxiosError(erro)) {
    if (erro instanceof Error) {
      return erro.message;
    }

    return mensagemPadrao;
  }

  if (!erro.response) {
    return "Não foi possível conectar ao servidor.";
  }

  const dadosResposta: unknown = erro.response.data;

  if (typeof dadosResposta === "string") {
    return dadosResposta;
  }

  if (
    typeof dadosResposta === "object" &&
    dadosResposta !== null
  ) {
    const resposta = dadosResposta as RespostaComMensagem;

    if (typeof resposta.mensagem === "string") {
      return resposta.mensagem;
    }

    if (typeof resposta.message === "string") {
      return resposta.message;
    }
  }

  return mensagemPadrao;
};

/**
 * Garante que a resposta da API seja transformada em uma
 * lista válida de imóveis.
 */
const extrairListaImoveis = (
  dadosResposta: unknown
): ImovelDto[] => {
  if (Array.isArray(dadosResposta)) {
    return dadosResposta as ImovelDto[];
  }

  if (
    typeof dadosResposta === "object" &&
    dadosResposta !== null
  ) {
    const resposta = dadosResposta as RespostaComImoveis;

    if (Array.isArray(resposta.imoveis)) {
      return resposta.imoveis as ImovelDto[];
    }

    if (Array.isArray(resposta.content)) {
      return resposta.content as ImovelDto[];
    }
  }

  console.error(
    "Formato inesperado recebido ao buscar imóveis:",
    dadosResposta
  );

  throw new Error(
    "O servidor não retornou uma lista válida de imóveis."
  );
};

/**
 * Converte o identificador digitado pelo usuário em nome
 * ou e-mail, conforme o formato esperado pelo backend.
 */
const montarUsuarioLogin = (
  identificador: string,
  senha: string
): LoginRequest => {
  const identificadorNormalizado = identificador.trim();
  const identificadorEhEmail =
    identificadorNormalizado.includes("@");

  return {
    nome: identificadorEhEmail
      ? ""
      : identificadorNormalizado,
    email: identificadorEhEmail
      ? identificadorNormalizado
      : "",
    senha,
  };
};

export const gerenciadorService = {
  login: async (
    identificador: string,
    senha: string
  ): Promise<{ status: number; mensagem: string }> => {
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
        status: response.status,
        mensagem: response.data,
      };
    } catch (erro: unknown) {
      return {
        status: axios.isAxiosError(erro)
          ? erro.response?.status ?? 500
          : 500,
        mensagem: extrairMensagemErro(
          erro,
          "Não foi possível realizar o login."
        ),
      };
    }
  },

  buscarTodosImoveis: async (): Promise<ImovelDto[]> => {
    try {
      const response = await api.get<unknown>(
        `${IMOVEL_URL}/buscaImovel`
      );

      return extrairListaImoveis(response.data);
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
    if (!Number.isInteger(idImovel) || idImovel <= 0) {
      throw new Error(
        "O ID do imóvel informado é inválido."
      );
    }

    try {
      const response = await api.get<ImovelDto>(
        `${IMOVEL_URL}/porID/${idImovel}`
      );

      if (
        typeof response.data !== "object" ||
        response.data === null ||
        Array.isArray(response.data)
      ) {
        throw new Error(
          "O servidor não retornou um imóvel válido."
        );
      }

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
    if (
      !Number.isInteger(imovel.idImovel) ||
      imovel.idImovel <= 0
    ) {
      throw new Error(
        "O ID do imóvel é obrigatório para atualização."
      );
    }

    try {
      const response = await api.post<string>(
        `${IMOVEL_URL}/updateImovel`,
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
    if (!Number.isInteger(idImovel) || idImovel <= 0) {
      throw new Error(
        "O ID do imóvel informado é inválido."
      );
    }

    try {
      const response = await api.delete<string>(
        `${IMOVEL_URL}/deleteImovel/${idImovel}`
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
