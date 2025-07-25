// ruta "/signup" - registro

// ruta "/signin" - autorización

// user auth? direccion solicitada : inicio de sesion

// export const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

// export const register = async (email, password) => {
//   return fetch(`${BASE_URL}/signup`, {

//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   }).then((res) => {
//     return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
//   });
// };

// export const authorize = async (identifier, password) => {
//   return fetch(`${BASE_URL}/signin`, {

//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ identifier, password }),
//   }).then((res) => {
//     return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
//   });
// };

// corregir las respuestas

class Auth {
  constructor(url) {
    this.url = url;
  }

  async _fetchData(endpoint, requestMethod, { email, password }) {
    const response = await fetch(`${this.url}${endpoint}`, {
      method: requestMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = response.ok
      ? response.json()
      : Promise.reject(`Error: ${response.status}, ${response.message}`);

    return data;
  }

  async register({ email, password }) {
    const record = await this._fetchData("/signup", "POST", {
      email,
      password,
    });
    return record;

    // record = await this._fetchData("/signup", "POST", {
    //   email,
    //   password,
    // })
  }

  authorize({ email, password }) {
    return this._fetchData("/signin", "POST", { email, password });
  }

  //// esto aplica el poliformismo?

  async isValidToken(endpoint, token) {
    const response = await fetch(`${this.url}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, password }),
    });
    const data = response.ok
      ? response.json()
      : Promise.reject(`Error: ${response.status}`);
    return data;
  }
}

const auth = new Auth("https://se-register-api.en.tripleten-services.com/v1");

export default auth;
