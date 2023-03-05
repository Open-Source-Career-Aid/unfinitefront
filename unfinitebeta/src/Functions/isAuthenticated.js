import React from "react";
import { API_URL } from '../API_URL';

function isAuthenticated() {
    return fetch(`${API_URL}is_authenticated/`, {
        method: 'GET',
        credentials: 'include',
    })
        .then(response => response.json())
        .then(data => {
            //console.log(data.is_authenticated);
            return data.is_authenticated;
        });
}


export default isAuthenticated;