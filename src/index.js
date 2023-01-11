const bodyParser = require('body-parser');
const express = require('express')
const stripe = require('stripe')('sk_test_51MM6VrLDnUlYmfLmLhPQEo67336GhGhEcXXZ4Tr7wqXGG1S6aUkNQE3OhIL6O6gzECACh79uLfGpEFQ1BF4pzghr00Q60Pff71')
const app = express()
const cors = require('cors')
const {addUser, findUser} = require('./controllers/user')
const {doc, updateDoc} = require('firebase/firestore');
const { userRef } = require('./firebaseAuth/firebase-config');


app.use(cors())
app.use(bodyParser.json())
app.listen(3001);

app.get('/',(req, res) => {
    res.send('Hello World')
})

app.post('/create-checkout-session', async (req, res) => {

    const lines_items = []

    for(let i =0 ; i<req.body.cartItems.length; i++){
        lines_items.push({
            price_data:{
                currency: 'usd',
                product_data:{
                    name: req.body.cartItems[i].title,
                },
                unit_amount: req.body.cartItems[i].price*100
            },
            quantity: req.body.cartItems[i].amount
        })
    }

    console.log(lines_items);

    const session = await stripe.checkout.sessions.create({
      line_items: [
        ...lines_items
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.send({url: session.url});
  });
  
app.post('/user/signup',(req, res) => {
    addUser(req.body)
})

app.get('/user/signin',(req, res) => {
    findUser(req.query)
    .then( data => {
        res.send({...data})
    })
    .catch( err => {
        console.log(err);
    })
})

app.post('/addItems',async (req, res) => {
    console.log(req.body);
    const user = doc(userRef, req.body.userId)

    await updateDoc(user, {
        itemsBuy: [...req.body.cartItems]
    })
    .then( result => {
        res.status(200).send({
            message: 'Items Added to System'
        })
    })
    .catch( err => {
        
    })
})
