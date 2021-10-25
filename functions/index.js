import functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

import admin from 'firebase-admin'

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: "hamiltonrios-e760f.firebaseapp.com",
    projectId: "hamiltonrios-e760f",
    storageBucket: "hamiltonrios-e760f.appspot.com",
    messagingSenderId: "972835792340",
    appId: "1:972835792340:web:70a5ed3909fb9b595ca241",
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "hamiltonrios-e760f",
        "private_key_id": process.env.private_key_id,
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQChuRmFRidfqqdP\nMfJ39OpALYNV7lTqOEAZQRWL/DX9KIpjImiarXgLm7mjx/jwG8IjU5wUh1o06hZk\n7Mlle/Qfk0fxAnJeLgWJARjmAqK46nk5Kx67VgFKpV32fD8+3oxWOQEQvwGf8gWn\nncIGdNCHzmSzCjcAuhrVO+FI1nlh1X3uYzSTurYbGJ7sLcjQOc2Lc82VFG6Z0+/0\nY2A0xlL1ii/+vlFbw5U2o/gx6pxRHhcfiwz66z34qMyfQgdxuRhdnnbkL4Ufy5KI\nF17YVZ8xjMKnQ+bpLZsfC0qBZBkxUDuxBP+Mjv+k1BaC7Gh1tiX8MELf2Pw19OfT\nXIPP1BfvAgMBAAECggEAA3FANNEId4XXZ90lTx5ceh89429eSVoHK0JyZfdpYskh\nIPkThu9YVc7rxau1Bc9hc4UNFnbHGcc90Molg05/JMjqyBuIOa77GS53zDWUJyF+\nkRP05IHxJxicBmogooL0M8Wk2yllrHTnX+kAv0hvQ+TFyfXWs+JCPfW3VuiRzt5G\nyGknvrBZGRY80Z2Q2noBtv8rtwCVCyWux19HdVlDNV7wCEWA4IIJMknGKsMXpv7z\nSXUKB11OYfhTVKJjs1iQt4u21EQoWIaUDaVAwmhw2HYZq1rKZUDgcUV2rSngJuhq\nNxiDlhgLvA6gFlgKoRAI2Mb2ULLXex1C3Zwj877imQKBgQDivEqCOi4NtdvfqdEV\nD3akG5PIg8oKcref3Zyu6oyNn3n84op+p1uF78ItCVasAODF1bo+B6aoOySgRA38\nBkhhqEJ0aRL43lHAQKpyFCYXy24g0pSz0jYzE4jYrUjdmsqDEFjk+RvL3BAJ88mL\nrqRpVl1nb5Hv09EIFjUBWC8HowKBgQC2mLD7yI63Lh84CZYON4VIczMFOCQHWFeZ\n2dbfa34eaDRHExysWTd7rF6unZx83irqFFqJgimnrIDQm3vriXzQYTtGkVGneUcQ\n0NH3Se336Pla6VY96Kva5YopaNVwqa/oEEwvYoUI0sr+/B52isFgAipgLi8opwEx\nm+/8VzFjRQKBgQDZMn49mfYb9CYYb9h2UEXalwBOiNC2iYYVgnlhphXWZPq6oVkC\nUtd9yls8QUHhq0WmvkKWwUWIyn8fd5Hd5zbXNhPS6ATgmje97zRX661CBgINNyxz\nxd9dtkzVI8o1Xt64BqThUzCpbLmAjyR2xmmA7tazC1HFaCdJk9xa2VrT+QKBgDbX\nBxintI05kfC/mEyuyh3nU2R25wM5uh2f+lPhseAqBcFu8QamSO6g51LkTVKHWzYw\nZLy11hLg0VNVz1L/WPgwq5/XF0IIP5rCTL1Le+ggFXwDZn5zeeHlXKhxLuGGZSl6\nc5crrK7ouET6rZ+GrutJ2zZFyK4Z8lbW8a3E9jVNAoGBALeyVsI7JlojDGbjzPTR\n0vjWzZOk9QIIWo5ubxHpMK9ktGXn7a9fICiSn70QPFeqTCrWznEQmKVAygfiLl93\nE1HtS2YpEZbocpdNynSIeHK00WBRKVhjXBcjN2AAT9Mt4Ywe1J6SX5xqD9jPNSaj\nejyLeb5XQF3PJ+u5tmLU5wgh\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-ro4dh@hamiltonrios-e760f.iam.gserviceaccount.com",
        "client_id": "112339669151034920415",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ro4dh%40hamiltonrios-e760f.iam.gserviceaccount.com"
    }
    )
};

admin.initializeApp(firebaseConfig);

const db = admin.firestore()

const app = express()

import { getAuth, connectAuthEmulator } from '@firebase/auth'


//const auth = getAuth();
// connectAuthEmulator(auth, "http://localhost:9099");

//MIDDLEWARE
app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser)
app.use(cors())

//app.use('/app', checkAuth )

app.use('/static', express.static('public'))

//app.use('/cookie', setCookie)


app.get('/', (req,res)=> {
    if(  res.statusCode == 200) 
        res.render('index')

    return res.send("")
    
})
app.get('/login', (req, res) => {
    if( res.statusCode == 200) 
        res.render('login')
    return res.send("")
})

app.post('/login', (req,res) => {
    let token = req.body.token

    console.log(token);
})
app.get('/fundos', (req,res)=> {
    if( res.statusCode == 200) 
        res.render('fundos')
        return res.send("")
})
app.get('/embarques', (req,res)=> {
    if( res.statusCode == 200) 
        res.render('embarques')
    return res.send("")
})
app.get('/fundos', (req, res) => {
    (async () => {
    try { 
        let query = db.collection('fundos')
        let response = {}
        await query.get().then( snapshot => {
            let docs = snapshot.docs
            for ( let doc of docs ) {
                response[doc.id] = doc.data()
            }
            return response
        })
        return res.status(200).json(response)
    } catch(e) {
        console.log(e)
        return res.status(500).send(e)
    }
})();

})

app.post('/fundos', checkAuth, (req, res) => {
    
    let real = req.body.data;
    let nome = req.body.NOME;


    const cb = (() => {})
    db.collection("fundos")
        .doc()
        .set({NOME: "req.body.NOME", REAL: "req.body.REAL"}, {merge:true})
        .then((sent) => {
            cb();
            res.status(200).json(real)
        })
        .catch((e) => {
            res.status(400).json(e)
        })
})


app.get('/embarques', checkAuth, (req, res) => {
    (async () => {
        try { 
            let query = db.collection('embarques')
            let response = []
            await query.get().then( snapshot => {
                let docs = snapshot.docs
                for ( let doc of docs ) {
                    response.push(doc.data())
                }
                return response
            })
            return res.status(200).send( JSON.stringify(response) )
        } catch(e) {
            console.log(e)
            return res.status(500).send(e)
        }
    })();
})


function checkAuth(req, res, next) {

    if (res.cookie.token)
        return next();
    else
        res.redirect('/login')
}

function setCookie(req, res, next) {
        // check if client sent cookie
    var cookie = req.cookies.token;
    if (cookie === undefined) {
        // no: set a new cookie
        var randomNumber=Math.random().toString();
        randomNumber=randomNumber.substring(2,randomNumber.length);
        res.cookie('token', randomNumber, { maxAge: 900000, httpOnly: true });
        console.log('cookie created successfully');
    } else {
        // yes, cookie was already present 
        console.log('cookie exists', cookie);
    } 
    next(); // <-- important!
}

const api = functions.https.onRequest(app)
export default api 

