class Api {
  constructor(url) {
    this.url = url;
  }

  async _fetchData(endpoint, requestMethod, body) {
    const response = await fetch(`${this.url}${endpoint}`, {
      method: requestMethod,
      headers: {
        authorization: "94c8a629-44c5-4556-b294-d569e5d5ac14",
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = response.ok ? response.json() : response.reject;
    return data;
  }

  getCardsData() {
    return this._fetchData("cards/");
  }

  getUserInfo() {
    return this._fetchData("users/me");
  }

  updateUserInfo(newProfileInfo) {
    return this._fetchData("users/me", "PATCH", newProfileInfo);
  }

  changeAvatar(newAvatarLink) {
    return this._fetchData("users/me/avatar", "PATCH", newAvatarLink);
  }

  addCardData(newCardData) {
    return this._fetchData("cards", "POST", newCardData);
  }

  _likeCard(cardID) {
    return this._fetchData(`cards/${cardID}/likes`, "PUT");
  }
  _dislikeCard(cardID) {
    return this._fetchData(`cards/${cardID}/likes`, "DELETE");
  }

  deleteCard(cardID) {
    return this._fetchData(`cards/${cardID}`, "DELETE");
  }
}

const api = new Api("https://around-api.es.tripleten-services.com/v1/");

export default api;
