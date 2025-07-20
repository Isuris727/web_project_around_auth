import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function NavBar() {
  const { isLoggedIn } = useContext(AuthContext);
  const { currentUser } = useContext(CurrentUserContext);
  if (isLoggedIn) {
    return (
      <>
        <div className="button_type_navbar"> {currentUser.email} </div>
        <button className="button  button_type_navbar">Cerrar Sesión</button>
      </>
    );
  } else {
    return (
      <button className="button  button_type_navbar">{"AuthPoint"}</button>
    );
  }
}

export default NavBar;
