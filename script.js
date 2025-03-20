// Firebase Config (Replace with your project's details)
const firebaseConfig = {
    // apiKey: "YOUR_API_KEY",
    // authDomain: "YOUR_PROJECT.firebaseapp.com",
    // projectId: "YOUR_PROJECT_ID",
    // storageBucket: "YOUR_PROJECT.appspot.com",
    // messagingSenderId: "YOUR_SENDER_ID",
    // appId: "YOUR_APP_ID",
    // vapidKey: "YOUR_WEB_PUSH_CERTIFICATE_KEY"
    apiKey: "AIzaSyBfqQkLMdirE1s3QDAU-k8kZJDSJ-AHfxI",
authDomain: "madrsa-sikariya.firebaseapp.com",
projectId: "madrsa-sikariya",
storageBucket: "madrsa-sikariya.firebasestorage.app",
messagingSenderId: "1066102927865",
appId: "1:1066102927865:web:d5e649be4178d363408d28",
vapidKey: "BClpcTQygEYX1ueX4n8GTMN0UmSsaeM1JwpbRoI81WxOaHGB4gQHJl-bNiyBJmp_c5CryDL0NGiWAd2a7z3CpB4	"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('firebase-messaging-sw.js')
    .then((registration) => {
        console.log('Service Worker Registered:', registration);
        messaging.useServiceWorker(registration);
    }).catch(error => console.log('Service Worker Registration Failed:', error));
}

// Function to Subscribe User to Notifications
function subscribeToTopic() {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            messaging.getToken().then(token => {
                console.log("FCM Token:", token);
                // Subscribe to topic "allUsers"
                fetch('https://iid.googleapis.com/iid/v1/' + token + '/rel/topics/allUsers', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'key=YOUR_SERVER_KEY',
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        alert("You are subscribed to notifications!");
                    } else {
                        alert("Subscription failed.");
                    }
                });
            });
        } else {
            console.log("Permission Denied!");
        }
    });
}

// Handle Incoming Messages
messaging.onMessage(payload => {
    console.log("Message received:", payload);
    new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon
    });
});
