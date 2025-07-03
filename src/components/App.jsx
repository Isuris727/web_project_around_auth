import { useState, useEffect } from "react";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  // --------- USER -------
  useEffect(() => {
    async function obtainUser() {
      try {
        const user = await api.getUserInfo();

        setCurrentUser(user);
      } catch (error) {
        console.log(error);
      }
    }
    obtainUser();
  }, []);

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
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
      }}
    >
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
    </CurrentUserContext.Provider>
  );
}

export default App;
