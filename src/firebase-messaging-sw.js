// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyAUucYY7yLhmCIfPsya8uzi9KiHtW46X34",
    authDomain: "doctest-96386.firebaseapp.com",
    projectId: "doctest-96386",
    storageBucket: "doctest-96386.appspot.com",
    messagingSenderId: "850482749209",
    appId: "1:850482749209:web:74f5f473f1f899d9282f88",
    measurementId: "G-WQXD1C1M8K"
});

const messaging = firebase.messaging(); 

