import { useState, useEffect } from "react";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import InfoTooltip from "./Main/Popup/InfoTooltip/InfoTooltip.jsx";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { AuthContext } from "../contexts/AuthContext.js";
import Authentication from "./Authentication/Authentication.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  // --------- contextProviders -------
  function AuthProvider({ children }) {
    return (
      <AuthContext.Provider value={{ isLoggedIn }}>
        {children}
      </AuthContext.Provider>
    );
  }

  function CurrentUserProvider({ children }) {
    return (
      <CurrentUserContext.Provider
        value={{
          currentUser,
          handleUpdateUser,
          handleUpdateAvatar,
        }}
      >
        {children}
      </CurrentUserContext.Provider>
    );
  }

  console.log(currentUser, "linea 41");
  // --------- LOG IN -------
  useEffect(() => {
    const token = ""; // funcion para obtener token
    if (!token) {
      return;
    }
    async function obtainUser() {
      try {
        const user = await api.getUserInfo();

        setCurrentUser(user);
        // setIsLoggedIn(true);
      } catch (error) {
        console.log(error);
      }
    }
    obtainUser();
  }, []);

  console.log(currentUser, "linea 61");

  // // --------- USER -------
  // useEffect(() => {
  //   async function obtainUser() {
  //     try {
  //       const user = await api.getUserInfo();

  //       setCurrentUser(user);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   obtainUser();
  // }, []);

  // console.log(currentUser);

  const handleUpdateUser = async (data) => {
    const updatedUser = await api.updateUserInfo(data);
    setCurrentUser(updatedUser);
    handleClosePopup();
  };

  const handleUpdateAvatar = async (data) => {
    const updatedUser = await api.changeAvatar(data);
    setCurrentUser(updatedUser);
    handleClosePopup();
  };

  // --------- CARDS -------
  useEffect(() => {
    async function obtainCardsData() {
      try {
        const cardsData = await api.getCardsData();

        return setCards(cardsData);
      } catch (error) {
        console.log(error);
      }
    }
    obtainCardsData();
  }, [isLiked]);

  const handleAddCard = async (data) => {
    const addedCard = await api.addCardData(data);
    setCards([addedCard, ...cards]);
    handleClosePopup();
  };

  const handleCardLike = async (card) => {
    card._id && card.isLiked
      ? await api._dislikeCard(card._id)
      : await api._likeCard(card._id);

    setIsLiked(!isLiked);
  };

  const handleCardDelete = async (card) => {
    card._id && (await api.deleteCard(card._id));

    const idCardToDelete = card._id;

    const filteredCards = cards.filter((card) => card._id !== idCardToDelete);
    setCards(filteredCards);
  };

  // --------- POPUPS -------
  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <AuthProvider>
      <CurrentUserProvider>
        <div className="page">
          <Header />

          <Main
            onOpenPopup={handleOpenPopup}
            onClosePopup={handleClosePopup}
            popup={popup}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onAddCard={handleAddCard}
          />
          <Footer />
        </div>
      </CurrentUserProvider>
    </AuthProvider>
  );
}

export default App;
