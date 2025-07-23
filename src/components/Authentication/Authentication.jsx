// import { useState } from "react";
import { useLocation } from "react-router-dom";

function Authentication() {
  // const [authPoint, setAuthPoint] = useState("register");
  const authPoint = useLocation().pathname;

  function toggleAuth(authPoint) {
    const entryPoint = {};
    if (authPoint === "/signup") {
      entryPoint.title = "Regístrate";
      entryPoint.shift = "¿Ya eres miembro? Inicia sesión ";
    } else if (authPoint === "/signin") {
      entryPoint.title = "Inicia Sesión";
      entryPoint.shift = "¿Aún no eres miembro? Regístrate ";
    }
    return entryPoint;
  }

  const auth = toggleAuth(authPoint);

  return (
    <>
      <form className="form form_type_auth">
        <h2 className="form__title form__text">{auth.title}</h2>
        <input
          className="form__input form__input_type_auth form__input_type_name"
          placeholder="Correo electrónico"
        />
        <input
          className="form__input form__input_type_auth"
          placeholder="Contraseña"
        />
        <button
          className="button form__button button_type_submit button_type_auth"
          type="submit"
        >
          {auth.title}
        </button>
        <p className="form__text">
          {auth.shift}
          <button className="button button_type_navbar">aqui</button>
        </p>
      </form>
    </>
  );
}

export default Authentication;
