const functions = require('firebase-functions');
const app = require('express')()
const cors = require('cors')
const request = require('request')
const parse = require('node-html-parser').parse


var admin = require("firebase-admin");
var serviceAccount = require("./ServiceAgentKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

app.use(cors())

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

app.post('api/fundos', (req, res) => {
    var nome = req.body.nome
    var valor = req.body.valor

})

app.get('/api/embarques', (req, res) => {
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

app.get('/api/dolar', (req,res) => {
    request("https://economia.awesomeapi.com.br/last/USD-BRL", function (error, response, body) {

    if(error) {
        return res.status(500).send(error)
    } else {
        let json = JSON.parse(body)
        const rate = json["USDBRL"]["ask"]

        return res.status(200).send(rate)
    }
    })
})

// app.post('/api/embarques', (req, res) => {
//     return res.status(500)
// })


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.app = functions.https.onRequest(app)