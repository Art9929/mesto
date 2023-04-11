export default class Api {
  constructor( { baseUrl, headers } ) {
    this._url = baseUrl;
    this._headers = headers
  }

  _response(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }


  // Загружаем карточки
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._response(res));
  }

  // Загружаем профиль
  profile() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(res => this._response(res));
  }

  // Ред. профиль
  editProfile( info ) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify( info )
    })
      .then(res => this._response(res));
  }

  // Добавление карточки на сервер
  addNewCard(item) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(item)
    })
      .then(res => this._response(res));
  }

    // Удаляем карточки с сервера
    deleteCard(_id) {
      return fetch(`${this._url}/cards/${_id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
        .then(res => this._response(res));
    }

    // Постановка лайка
    addLike(_id, likes) {
      return fetch(`${this._url}/cards/${_id}/likes`, {
        method: 'PUT',
        headers: this._headers,
        body: JSON.stringify({ likes }),
      })
        .then(res => this._response(res));
    }

    // Удаление лайка
    deleteLike(_id, likes) {
      return fetch(`${this._url}/cards/${_id}/likes`, {
        method: 'DELETE',
        headers: this._headers,
        body: JSON.stringify({ likes }),
      })
        .then(res => this._response(res));
    }

    // Обновление аватара
    changeAvatar(urlAvatar) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify( urlAvatar ),
      })
        .then(res => this._response(res));
    }

}


