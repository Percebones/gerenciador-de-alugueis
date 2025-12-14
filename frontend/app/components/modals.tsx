import { useState } from "react";
import { ActivityIndicator, ScrollView, Touchable, TouchableOpacity, View } from "react-native";
import { createPortal } from "react-dom"
import { CadastrarImovel } from "../telas/CadastroImovel"

function ModalCadImovel({ children, onClose }: any) {
  return createPortal(
    <div style={overlay} onClick={onClose}>
      <div style={modal} onClick={(e) => e.stopPropagation()}>
        <TouchableOpacity style={{}} onPress={onClose}>✖</TouchableOpacity>
        {children}
        <CadastrarImovel />
      </div>
    </div>,
    document.body
  );
}

function ModalDelImovel({ children, onClose }: any) {
  return createPortal(
   <div style={overlay} onClick={onClose}>
      <div style={modal} onClick={(e) => e.stopPropagation()}>
        <TouchableOpacity style={{}} onPress={onClose}>✖</TouchableOpacity>
        {children}
        
      </div>
    </div>,
    document.body
  );
}

function ModalEditImovel({ children, onClose }: any) {
  return createPortal(
    <div style={overlay} onClick={onClose}>
      <div style={modal} onClick={(e) => e.stopPropagation()}>
        <TouchableOpacity style={{}} onPress={onClose}>✖</TouchableOpacity>
        {children}
        
      </div>
    </div>,
    document.body
  );
}

const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modal: React.CSSProperties = {
  background: "#fff",
  padding: 20,
  borderRadius: 10,
  width: 500,
  maxWidth: "90%",
  maxHeight: "90vh",
  overflowY: "auto",
};




export { ModalCadImovel, ModalDelImovel, ModalEditImovel }
