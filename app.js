// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBfqQkLMdirE1s3QDAU-k8kZJDSJ-AHfxI",
  authDomain: "madrsa-sikariya.firebaseapp.com",
  projectId: "madrsa-sikariya",
  storageBucket: "madrsa-sikariya.firebasestorage.app",
  messagingSenderId: "1066102927865",
  appId: "1:1066102927865:web:d5e649be4178d363408d28",
  measurementId: "G-3S96TVYFJC"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Web Push Certificate (VAPID key)
messaging.getToken({ vapidKey: 'BClpcTQygEYX1ueX4n8GTMN0UmSsaeM1JwpbRoI81WxOaHGB4gQHJl-bNiyBJmp_c5CryDL0NGiWAd2a7z3CpB4' })
  .then((currentToken) => {
    if (currentToken) {
      console.log('Current token:', currentToken);
      // Send the token to your server if needed
    } else {
      requestPermission();
    }
  })
  .catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    requestPermission();
  });

// Request notification permission
function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');

      // After permission is granted, attempt to get token again
      messaging.getToken({ vapidKey: 'BClpcTQygEYX1ueX4n8GTMN0UmSsaeM1JwpbRoI81WxOaHGB4gQHJl-bNiyBJmp_c5CryDL0NGiWAd2a7z3CpB4' })
        .then((currentToken) => {
          if (currentToken) {
            console.log('New token after permission:', currentToken);
            // Send the token to your server if needed
          } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
}

// Handle incoming messages while page is in foreground
messaging.onMessage((payload) => {
  console.log('Message received. ', payload);
  
  // Display notification manually in foreground
  if (Notification.permission === 'granted') {
    new Notification(payload.notification.title, {
      body: payload.notification.body,
      icon: payload.notification.icon || '/firebase-logo.png'
    });
  }
});

// Check notification permission on page load and ask for it if not granted
document.addEventListener('DOMContentLoaded', () => {
  if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
    requestPermission();
  }
});

// If user denied permission, ask again when they interact with the page
if (Notification.permission === 'denied') {
  document.addEventListener('click', () => {
    requestPermission();
  }, { once: true });
}

// Check permission status on page visibility change
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && Notification.permission !== 'granted') {
    requestPermission();
  }
}); 