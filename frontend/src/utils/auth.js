// export const BASE_URL = 'https://api.another.domainname.st.nomoredomains.work';
export const BASE_URL = 'http://localhost:3000';

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => checkResponse(res));
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((response => response.json()))
        // .then((data) => {
        //      if (data.token) {
        //          localStorage.setItem("jwt", data.token);
        //          return data;
        //      }
            // return Promise.reject(`Ошибка ${data.status}`)
        // })
};

export const checkToken = () => {
    const token = localStorage.getItem('jwt');
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((res) => checkResponse(res))
        .then((data) => data);
};
// export const checkToken = () => {
//     const token = localStorage.getItem('jwt');
  
//     return fetch(`${BASE_URL}/users/me`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then(checkResponse)
//   };