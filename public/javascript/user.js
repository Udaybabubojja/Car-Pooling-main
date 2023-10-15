import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBQyv7gL4j1t8lyrNFoPFad3Yn8mJSrav4",
    authDomain: "wheels-together-64d28.firebaseapp.com",
    projectId: "wheels-together-64d28",
    storageBucket: "wheels-together-64d28.appspot.com",
    messagingSenderId: "656709491900",
    appId: "1:656709491900:web:3055a7da065d7d2d3784b9",
    measurementId: "G-ZK974E6BZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the reference to the DOM element where you want to display the user info
const userInfoElement = document.getElementById("userInfo");

// Add an event listener to the "Get My Info" button
// document.getElementById("getInfoButton").addEventListener("click", () => {
    // Get the Firebase Auth object
    const auth = getAuth(app);

    // Check if a user is logged in
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user);
            document.cookie = `userEmail=${user.email}; expires=Wed, 01 Jan 2099 00:00:00 UTC; path=/`;
            document.cookie = `userDisplayName=${user.displayName}; expires=Wed, 01 Jan 2099 00:00:00 UTC; path=/`;
            // User is logged in
            if (user.displayName)
                userInfoElement.innerText = `Hi ${user.displayName}, you are logged in.\nEmail: ${user.email}`
            else
                userInfoElement.innerHTML = `Hi ${user.email}`
        } else {
            // User is not logged in
            userInfoElement.innerText = "No, you are not a user.";
        }
    });
// });


