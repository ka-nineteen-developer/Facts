
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDr4xAiWv5v_X7bdaAehw0NKzpKmQpISoI",
    authDomain: "facts-d22d1.firebaseapp.com",
    databaseURL: "https://facts-d22d1.firebaseio.com",
    projectId: "facts-d22d1",
    storageBucket: "facts-d22d1.appspot.com",
    messagingSenderId: "1029960221337",
    appId: "1:1029960221337:web:5aa585921a024015b8ae08",
    measurementId: "G-Y04GZ6SXGQ"
  });
  
  var db = firebase.firestore();
  firebase.analytics();