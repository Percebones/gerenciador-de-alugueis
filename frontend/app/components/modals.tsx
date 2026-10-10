import { ReactNode } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { createPortal } from "react-dom";

import { CadastrarImovel } from "../telas/CadastroImovel";
import { DeletarImovel } from "../telas/DeleteImovel";
import { UpdateImovel } from "../telas/UpdateImovel";
import { ImovelDto } from "../types/types";

interface ModalBaseProps {
  children?: ReactNode;
  onClose: () => void;
}

interface ModalDelImovelProps extends ModalBaseProps {
  idImovel: number;
}

interface ModalEditImovelProps extends ModalBaseProps {
  imovel: ImovelDto;
}

interface BotaoFecharProps {
  onClose: () => void;
}

function BotaoFechar({
  onClose,
}: BotaoFecharProps) {
  return (
    <TouchableOpacity
      style={styles.botaoFechar}
      onPress={onClose}
    >
      <Text style={styles.textoBotaoFechar}>
        ✖
      </Text>
    </TouchableOpacity>
  );
}

function ModalCadImovel({
  children,
  onClose,
}: ModalBaseProps) {
  return createPortal(
    <div
      style={stylesWeb.overlay}
      onClick={onClose}
    >
      <div
        style={stylesWeb.modal}
        onClick={(evento) =>
          evento.stopPropagation()
        }
      >
        <BotaoFechar onClose={onClose} />

        {children}

        <CadastrarImovel />
      </div>
    </div>,
    document.body
  );
}

function ModalDelImovel({
  children,
  idImovel,
  onClose,
}: ModalDelImovelProps) {
  return createPortal(
    <div
      style={stylesWeb.overlay}
      onClick={onClose}
    >
      <div
        style={stylesWeb.modal}
        onClick={(evento) =>
          evento.stopPropagation()
        }
      >
        <BotaoFechar onClose={onClose} />

        {children}

        <DeletarImovel idImovel={idImovel} />
      </div>
    </div>,
    document.body
  );
}

function ModalEditImovel({
  children,
  imovel,
  onClose,
}: ModalEditImovelProps) {
  return createPortal(
    <div
      style={stylesWeb.overlay}
      onClick={onClose}
    >
      <div
        style={stylesWeb.modal}
        onClick={(evento) =>
          evento.stopPropagation()
        }
      >
        <BotaoFechar onClose={onClose} />

        {children}

        <UpdateImovel
          imovel={imovel}
          onSuccess={onClose}
        />
      </div>
    </div>,
    document.body
  );
}

const styles = StyleSheet.create({
  botaoFechar: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: "#FEE2E2",
  },

  textoBotaoFechar: {
    color: "#DC2626",
    fontSize: 16,
    fontWeight: "bold",
  },
});

const stylesWeb: Record<
  string,
  React.CSSProperties
> = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(15, 23, 42, 0.65)",
  },

  modal: {
    position: "relative",
    width: 600,
    maxWidth: "95%",
    maxHeight: "90vh",
    overflowY: "auto",
    padding: 24,
    paddingTop: 58,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.25)",
  },
};

export {
  ModalCadImovel,
  ModalDelImovel,
  ModalEditImovel,
};