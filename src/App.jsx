import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Fomrulario from "./componentes/Formulario";
import Resultado from "./componentes/Resultado";
import Cargando from "./componentes/Cargando";
import ImagenCritop from "./img/imagen-criptos.png";

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;
const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

function App() {
  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);
  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCripto = async () => {
        setCargando(true);
        const { moneda, criptomoneda } = monedas;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultado(resultado.DISPLAY[criptomoneda][moneda]);
        setCargando(false);
      };
      cotizarCripto();
    }
  }, [monedas]);
  return (
    <Contenedor>
      <Imagen src={ImagenCritop} alt="imagenescripto" />
      <div>
        <Heading>Cotiza tu CriptoMoneda Al instante</Heading>
        <Fomrulario setMonedas={setMonedas} />
        {cargando && <Cargando />}
        {resultado && resultado.PRICE && <Resultado resultado={resultado} />}
      </div>
    </Contenedor>
  );
}

export default App;
