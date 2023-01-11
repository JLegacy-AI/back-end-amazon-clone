const {query, where, addDoc, getDocs, getDoc} = require('firebase/firestore')
const {db, userRef} = require('../firebaseAuth/firebase-config');
const e = require('express');

const addUser = async (userData) => {
    try{
        addDoc(userRef, userData)
    }catch( e ){
        console.log(e);
    }
}


const findUser = async (userData) => {
    const q = query(userRef, where('email','==', userData.email), where('password','==',userData.password))
    let userResult = {}
    await getDocs(q)
    .then( data => {
        data.forEach( e=> {
            if(e.data().email === userData.email && e.data().password === userData.password)
                userResult = {
                    find: true,
                    data: {
                        id: e.id,
                        ...e.data()
                    }
                }
        })
    })
    .catch( err => {
        return {
            find: false,
            data: {}
        }
    })
    return userResult
}


module.exports ={
    addUser,
    findUser
}