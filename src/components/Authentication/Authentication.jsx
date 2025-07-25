import { useState, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.js";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
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
  // const [RegisterError, setRegisterError] = useState(false);

  // console.log("Register errror en linea 17", RegisterError);

  // const toolTipMessage = RegisterError
  //   ? "Uy, algo salio mal. Por favor, inténtalo de nuevo."
  //   : "¡Correcto! ya estás registrado."; // podria modificarse usando mensajes de la respuesta de la api
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
      console.log("se ejecuto handleSignUp");
      onOpenPopup(InfoToolTipPopup(false));
      // onOpenPopup(InfoToolTipPopup);
      navigate("/signin");
    } catch (error) {
      // console.log(setRegisterError(true));
      // setRegisterError(true);
      // onOpenPopup(InfoToolTipPopup);
      onOpenPopup(InfoToolTipPopup(true));
      console.log("Se ejecutó catch de handleSignUp");
    }
    // finally {
    //   onOpenPopup(InfoToolTipPopup(true));
    // }
  }

  async function handleSignIn({ email, password }) {
    try {
      const user = await auth.authorize({ email, password });
      console.log(user);
      localStorage.setItem("token", user.token); // ¿es correcto usar la palabra token? o seria mejor usar otra palabra
      setIsLoggedIn(true);
      // setCurrentUser();
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
    console.log("handleSubmit", entryPoint.function);
  }

  // const openInfoToolTip = error || false;

  // console.log(popup);
  // console.log("Register errror justo antes del return", RegisterError);
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
