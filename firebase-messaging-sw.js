importScripts('https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.3.1/firebase-messaging.js');

// Firebase Config (Replace with your details)
const firebaseConfig = {
    // apiKey: "YOUR_API_KEY",
    // authDomain: "YOUR_PROJECT.firebaseapp.com",
    // projectId: "YOUR_PROJECT_ID",
    // storageBucket: "YOUR_PROJECT.appspot.com",
    // messagingSenderId: "YOUR_SENDER_ID",
    // appId: "YOUR_APP_ID"
    apiKey: "AIzaSyBfqQkLMdirE1s3QDAU-k8kZJDSJ-AHfxI",
    authDomain: "madrsa-sikariya.firebaseapp.com",
    projectId: "madrsa-sikariya",
    storageBucket: "madrsa-sikariya.firebasestorage.app",
    messagingSenderId: "1066102927865",
    appId: "1:1066102927865:web:d5e649be4178d363408d28",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Background Message Handler
messaging.onBackgroundMessage(payload => {
    console.log("Background message received:", payload);
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon
    });
});
