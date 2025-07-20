// ruta "/signup" - registro

// ruta "/signin" - autorización

// user auth? direccion solicitada : inicio de sesion

export const BASE_URL = " "; // agregar

export const register = async (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    // revisar direcciones
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

export const authorize = async (identifier, password) => {
  return fetch(`${BASE_URL}/signin`, {
    // revisar direcciones
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier, password }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};
