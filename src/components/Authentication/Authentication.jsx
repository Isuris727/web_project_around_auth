import { useState, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.js";

import Popup from "../Main/Popup/Popup.jsx";
import InfoTooltip from "../Main/Popup/InfoTooltip/InfoTooltip";
import auth from "../../utils/auth.js";

function Authentication({ popup, onOpenPopup, onClosePopup }) {
  const { setIsLoggedIn, setCurrentUser } = useContext(AuthContext);

  const authPoint = useLocation().pathname;
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const InfoToolTipPopup = (error) => {
    const toolTipMessage = error
      ? "Uy, algo salio mal. Por favor, inténtalo de nuevo."
      : "¡Correcto! ya estás registrado.";
    return {
      children: <InfoTooltip message={toolTipMessage} isError={error} />,
    };
  };

  function handleChange(event) {
    const { name, value } = event.target;
    const trimmedValue = value.trimStart();
    setData((prevData) => ({
      ...prevData,
      [name]: trimmedValue,
    }));
  }

  async function handleSignUp({ email, password }) {
    try {
      const newUser = await auth.register({ email, password });
      console.log("newUser", newUser);
      onOpenPopup(InfoToolTipPopup(false));

      navigate("/signin");
    } catch (error) {
      onOpenPopup(InfoToolTipPopup(true));
      console.log("Se ejecutó catch de handleSignUp", error);
    }
  }

  async function handleSignIn({ email, password }) {
    try {
      const user = await auth.authorize({ email, password });
      localStorage.setItem("token", user.token);
      setCurrentUser(currentUser.email);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.log("Se ejecutó catch de handleSignIn", error);
    }
  }

  function toggleAuth(authPoint) {
    const entryPoint = {};
    if (authPoint === "/signup") {
      entryPoint.title = "Regístrate";
      entryPoint.shift = "¿Ya eres miembro? Inicia sesión ";
      entryPoint.shiftedAuthPoint = "/signin";
      entryPoint.function = handleSignUp;
    } else if (authPoint === "/signin") {
      entryPoint.title = "Inicia sesión";
      entryPoint.shift = "¿Aún no eres miembro? Regístrate ";
      entryPoint.shiftedAuthPoint = "/signup";
      entryPoint.function = handleSignIn;
    }
    return entryPoint;
  }

  const entryPoint = toggleAuth(authPoint);

  function handleSubmit(event) {
    event.preventDefault();
    entryPoint.function(data);
  }

  return (
    <>
      {popup && <Popup onClose={onClosePopup}>{popup.children}</Popup>}
      <form className="form form_type_auth">
        <h2 className="form__title form__text">{entryPoint.title}</h2>
        <input
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          className="form__input form__input_type_auth form__input_type_name"
          placeholder="Correo electrónico"
          required
        />
        <input
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          className="form__input form__input_type_auth"
          placeholder="Contraseña"
          minLength="8"
          required
        />
        <button
          className="button form__button button_type_submit button_type_auth"
          type="submit"
          onClick={handleSubmit}
        >
          {entryPoint.title}
        </button>
        <p className="form__text">
          {entryPoint.shift}
          <Link
            to={entryPoint.shiftedAuthPoint}
            className="button button_type_navbar"
          >
            aqui
          </Link>
        </p>
      </form>
    </>
  );
}

export default Authentication;
