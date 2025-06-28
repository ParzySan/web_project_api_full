class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _getHeaders() {
    const token = localStorage.getItem("jwt");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  _handleResponse(response) {
    if (!response.ok) {
      return Promise.reject(`Error: ${response.status}`);
    }
    return response.json();
  }

  _makeRequest(url, options = {}) {
    return fetch(url, options).then(this._handleResponse);
  }

  getUserInfo() {
    return this._makeRequest(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._getHeaders(),
    });
  }

  setUserInfo({ name, about }) {
    return this._makeRequest(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ name, about }),
    });
  }

  setUserAvatar({ avatar }) {
    return this._makeRequest(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ avatar }),
    });
  }

  fetchCards() {
    return this._makeRequest(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._getHeaders(),
    });
  }

  addCard({ name, link }) {
    return this._makeRequest(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(cardId) {
    return this._makeRequest(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    });
  }

  _addLike(cardId) {
    return this._makeRequest(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),
    });
  }

  _removeLike(cardId) {
    return this._makeRequest(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
    });
  }

  changeLikeCardStatus(cardId, like) {
    return like ? this._addLike(cardId) : this._removeLike(cardId);
  }
}

const api = new Api({
  baseUrl: "https://api.aplicacionwebparzy.mooo.com",
  // baseUrl: "https://around-api.es.tripleten-services.com/v1",

  // baseUrl: "https://aplicacionwebparzy.mooo.com",
});

export default api;
