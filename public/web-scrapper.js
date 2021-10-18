import request from 'request';

const URL = "https://economia.awesomeapi.com.br/json/USD";

const options = {
    url: URL,
    headers: {
        "User-Agent": "request",
        "mode": "no-cors"
    }
}

function callback(err, res, body) {
    if (!err)
        return JSON.parse(body)
    else
        console.log("impossivel conectar a API ")
        console.error(err)
}

export function getBCBQuotes() {
    request(options, callback)
}