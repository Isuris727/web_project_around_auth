import { useState } from "react";

function InfoTooltip() {
  const [registerResult, setRegisterResult] = useState("true");

  function toggleResult(registerResult) {
    const resultStatus = {};
    if (registerResult === "true") {
      resultStatus.image = "./../../../../../images/good_register.png";
      resultStatus.message = "¡Correcto! ya estás registrado.";
    } else {
      resultStatus.image = "./../../../../../images/bad_register.png";
      resultStatus.message =
        "Uy, algo salio mal. Por favor, inténtalo de nuevo.";
    }
    return resultStatus;
  }
  const result = toggleResult(registerResult);
  console.log(toggleResult(registerResult));
  return (
    <div className="popup__container infoBox">
      <img className="infoBox__img" alt="result" src={result.image} />
      <h2 className="infoBox__txt">{result.message}</h2>
    </div>
  );
}

export default InfoTooltip;
