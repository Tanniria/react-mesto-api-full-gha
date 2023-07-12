class Api {
    constructor({ url }) {
        this._url = url;
    };
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };
    _request(url, options) {
        return fetch(url, options).then(this._checkResponse)
    };

    getInfo() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    };

    getInitialCards() {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
            .then((res) => this._checkResponse(res));
    };

    getUserInfo() {
        const token = localStorage.getItem('token');
        return this._request(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
            .then((res) => this._checkResponse(res));
    };
    editUserInfo(data) {
        const token = localStorage.getItem('token');
        return this._request(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.job,
            }),
        })
            .then((res) => this._checkResponse(res));
    };
    editAvatar(data) {
        const token = localStorage.getItem('token');
        return this._request(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        })
            .then((res) => this._checkResponse(res));
    };
    addCard(data) {
        const token = localStorage.getItem('token');
        return this._request(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        })
            .then((res) => this._checkResponse(res));
    };
    deleteCard(cardId) {
        const token = localStorage.getItem('token');
        return this._request(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
            .then((res) => this._checkResponse(res));
    };
    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            const token = localStorage.getItem('token');
            return this._request(`${this._url}/cards/${cardId}/likes`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
                .then((res) => this._checkResponse(res))
            })
        } else {
            const token = localStorage.getItem('token');
            return this._request(`${this._url}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
            .then((res) => this._checkResponse(res));
        }
    }
}

const api = new Api({
    url: 'https://api.another.domainname.st.nomoredomains.work',
});

export default api;
