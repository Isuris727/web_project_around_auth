import { useState } from "react";

function InfoTooltip({ isOpened, message, isError }) {
  // const [registerResult, setRegisterResult] = useState("true");

  function toggleImage(imageError) {
    // const resultStatus = {};

    if (!imageError) {
      return "./../../../../../images/good_register.png";
      // resultStatus.message = "¡Correcto! ya estás registrado."; // mensaje desde la API
    } else {
      return "./../../../../../images/bad_register.png";
      // resultStatus.message =
      //   "Uy, algo salio mal. Por favor, inténtalo de nuevo.";
    }
    // return resultStatus;
  }
  const toolTipImage = toggleImage(isError);
  // console.log(toggleResult(registerResult));
  console.log(message);
  return (
    <div className="popup__container infoBox">
      <img className="infoBox__img" alt="result" src={toolTipImage} />
      <h2 className="infoBox__txt">{message ? message : "Algo salió mal"}</h2>
    </div>
  );
}

export default InfoTooltip;
