import React from "react";

const API_HOST = 'http://localhost:8000';

function isAuthenticated() {
    return fetch(`${API_HOST}/api/is_authenticated/`, {
        method: 'GET',
        credentials: 'include',
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.is_authenticated);
            return data.is_authenticated;
        });
}


export default isAuthenticated;