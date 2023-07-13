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

    getInitialCards() {
        const token = localStorage.getItem('jwt');
        return this._request(`${this._url}/cards`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
    };

    getUserInfo() {
        const token = localStorage.getItem('jwt');
        return this._request(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
    };
    editUserInfo(data) {
        const token = localStorage.getItem('jwt');
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
    };
    editAvatar(data) {
        const token = localStorage.getItem('jwt');
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
    };
    addCard(data) {
        const token = localStorage.getItem('jwt');
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
    };
    deleteCard(cardId) {
        const token = localStorage.getItem('jwt');
        return this._request(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
    };
    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            const token = localStorage.getItem('jwt');
            return this._request(`${this._url}/cards/${cardId}/likes`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        } else {
            const token = localStorage.getItem('jwt');
            return this._request(`${this._url}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
        }
    }
}

const api = new Api({
    // url: 'https://api.another.domainname.st.nomoredomains.work',
    url: 'http://localhost:3000'
});

export default api;
