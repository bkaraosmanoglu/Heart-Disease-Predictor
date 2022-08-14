import React from "react";

export function predict(body) {
    return fetch('http://127.0.0.1:5000/predict_api', {
        method: 'POST',
        body: JSON.stringify(body),
    });
}


