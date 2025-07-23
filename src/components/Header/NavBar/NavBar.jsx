import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function NavBar() {
  const location = useLocation().pathname;

  function shiftNavBarBtnText(location) {
    let NavBarBtnText;

    if (location === "/signup") {
      NavBarBtnText = "Iniciar sesión";
      return NavBarBtnText;
    } else if (location === "/signin") {
      NavBarBtnText = "Registrate";
      return NavBarBtnText;
    }
  }

  const buttonText = shiftNavBarBtnText(location);

  const { isLoggedIn } = useContext(AuthContext);
  const { currentUser } = useContext(CurrentUserContext);
  if (isLoggedIn) {
    return (
      <>
        <div className="button_type_navbar"> {"currentUser.email"} </div>
        <button className="button  button_type_navbar">Cerrar Sesión</button>
      </>
    );
  } else {
    return <button className="button  button_type_navbar">{buttonText}</button>;
  }
}

export default NavBar;
