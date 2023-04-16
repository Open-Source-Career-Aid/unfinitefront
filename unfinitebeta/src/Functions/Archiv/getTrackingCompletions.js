import React from "react";
import getCSRF from "./getCSRF";
import getCookie from "./getCookie";
import { API_URL } from "../API_URL";

async function getTrackingCompletions() {
    
    await getCSRF();
    const csrfToken = getCookie("csrftoken");
    // console.log(csrfToken);
    
    const response = await fetch(`${API_URL}completion/trackingcompletions/`, {
        method: "GET",
        headers: {
        "X-CSRFToken": csrfToken,
        "Content-Type": "application/json",
        },
        credentials: "include",
        crossDomain: true,
    });
    
    const data = await response.json();
    // console.log(data.completions);
    
    // return (JSON.parse(data.completion), JSON.parse(data.track));
    return data.completions;
    }

export default getTrackingCompletions;