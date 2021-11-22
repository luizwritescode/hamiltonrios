import functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import https from 'https'
import {OAuth2Client}  from 'google-auth-library';
dotenv.config();

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID,);

//import admin, { firestore } from 'firebase-admin'
import favicon from 'serve-favicon';

import admin from 'firebase-admin';

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


const BASEURL = "https://us-central1-hamiltonrios-e760f.cloudfunctions.net"

//MIDDLEWARE
app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(cors({
    origin: BASEURL,
    credentials: true,
}))

app.use(favicon('./public/images/favicon.ico'))

//app.use('/', checkAuth )

//app.use(express.static('public'))

app.get('/', (req,res) => { return res.render('index')})

app.get('/dashboard', (req,res)=> {
       return res.render('index')
})

app.get('/login', (req, res) => {
    if( res.statusCode == 200) {
        return res.render('login')
    }
    
})

app.post('/login', (req,res) => {
    res.header('Set-Cookie', "SameSite=None")

    let token = req.body.token

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.OAUTH_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
      }
      verify()
      .then(()=>{
          res.cookie('session-token', token);
          res.send('success')
      })
      .catch(console.error);
})

app.get('/fundos', (req,res)=> {
    let user = req.user

    if( res.statusCode == 200) 
        res.render('fundos')
    return res.send("success")
})

app.get('/embarques', (req,res)=> {
    if( res.statusCode == 200) 
        res.render('embarques')
    return res.send("success")
})

app.get('/api/fundos', (req, res) => {

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

app.post('/api/fundos', (req, res) => {
    let real = req.body.REAL;
    let nome = req.body.NOME;
    let editMode = req.body.editMode;

    console.log(editMode);

    if(editMode === "true")
        editMode = true;
    else if (editMode === "false")
        editMode = false;
    else 
        editMode = false;
    
    let obj = {"NOME": nome, "REAL": real}

    db.collection("fundos")
        .doc()
        .set(obj, {merge: editMode} )
        .then((sent) => {


            res.status(200).json(sent)
        })
        .catch((e) => {
            res.status(400).json(e)
        })
})

app.get('/api/fundos/delete/:nome', (req, res) => {

    let nome = req.params.nome

    console.log(nome)

    let query = db.collection('fundos').where('NOME', '==', nome)

    let deleted = []
    query.get().then( querySnapshot => {

         querySnapshot.forEach ( doc => {
            deleted.push(doc.ref.path)
            doc.ref.delete()
        })
    })
    
    if (deleted.length > 0)
        res.status(200).json(deleted)
    else 
        res.status(400).send('ERRO INTERNO - nao existe fundo com esse nome')


})

app.get('/api/embarques', checkAuth, (req, res) => {
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
    
    let token = req.cookies['session-token']
    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.OAUTH_CLIENT_ID
        });
        const payload = ticket.getPayload();
       user.name = playload.name;
       user.email = payload.email;
       user.picture = payload.picture;
      }
      verify()
      .then( () => {
          req.user = user
          next();
        }).catch(err=>{
            console.error(err)
            //res.redirect('/default/login')
        })
  
        
}

const hr = functions.https.onRequest(app)  

export default hr

