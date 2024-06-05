import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Error from "./Error";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";

const InputSubmit = styled.input`
  margin-top: 30px;
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #ffefef;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Fomrulario = ({ setMonedas }) => {
  /*
  |
  |
  |
  |
  |
  | */
  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);
  const [moneda, SelectMonedas] = useSelectMonedas("Elige Tu Moneda", monedas);
  const [criptomoneda, SelectCriptomoneda] = useSelectMonedas(
    "Elige Tu CriptoMoneda",
    criptos
  );
  /*
  |
  |
  |
  |
  |
  | */
  useEffect(() => {
    const consultarAPI = async () => {
      /*
  |  
  |
  | */
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      /*
  |
  |
  | */
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      const arrayCriptos = resultado.Data.map((cripto) => {
        /*
  |
  |
  | */
        const objecto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };
        return objecto;
      });
      setCriptos(arrayCriptos);
    };
    consultarAPI();
  }, []);
  /*
  |
  |
  |
  |
  |
  | */
  const handleSubmit = (e) => {
    e.preventDefault();
    if ([moneda, criptomoneda].includes("")) {
      setError(true);
      return;
    }
    setError(false);
    setMonedas({
      moneda,
      criptomoneda,
    });
  };
  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handleSubmit}>
        <SelectMonedas />
        <SelectCriptomoneda />

        <InputSubmit type="submit" value="cotizar" />
      </form>
    </>
  );
  /*
  |
  |
  |
  |
  |
  | */
};
export default Fomrulario;
