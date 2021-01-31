import firebase from 'firebase/app'
import 'firebase/firestore'

// Get a Firestore instance
export const db = firebase
  .initializeApp({ 
  	apiKey: "AIzaSyAJOd9m-5IDgH8ytnXzPW_9nRGa4cE3sIs",
    authDomain: "glass-chat-1cfcf.firebaseapp.com",
    projectId: "glass-chat-1cfcf",
    storageBucket: "glass-chat-1cfcf.appspot.com",
    messagingSenderId: "716598076317",
    appId: "1:716598076317:web:dac6cc25fe718b2a88c574",
    measurementId: "G-01YSL0L6KV"
  })
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
// const { Timestamp, GeoPoint } = firebase.firestore
// export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
// db.settings({ timestampsInSnapshots: true })