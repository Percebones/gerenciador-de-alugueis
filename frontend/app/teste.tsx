import { useEffect } from "react";
import api from "./services/api";

export default function Teste() {
  useEffect(() => {
    api.get("/teste").then(console.log).catch(console.error);
  }, []);

  return <h1>Testando API...</h1>;
}
