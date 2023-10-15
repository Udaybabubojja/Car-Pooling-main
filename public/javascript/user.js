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

const userInfoElement = document.getElementById("userInfo");
const userDetailsElement = document.getElementById("userDetails");

// Add an event listener to the "Get My Info" button
document.getElementById("getInfoButton").addEventListener("click", () => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (user.displayName) {
                userInfoElement.innerText = `Hi ${user.displayName}, you are logged in.\nEmail: ${user.email}`;
            } else {
                userInfoElement.innerHTML = `Hi ${user.email}`;
            }
        } else {
            userInfoElement.innerText = "No, you are not a user.";
        }
    });
});

// Add an event listener to the "Get User Details" button
document.getElementById("getUserDetailsButton").addEventListener("click", async () => {
    const userEmail = getCookie("userEmail");
    if (userEmail) {
        try {
            const response = await fetch("/getuserdetails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userEmail: userEmail }),
            });

            if (response.ok) {
                const data = await response.json();
                userDetailsElement.innerText = JSON.stringify(data, null, 2);
            } else {
                userDetailsElement.innerText = "Error fetching user details.";
            }
        } catch (error) {
            userDetailsElement.innerText = "An error occurred while fetching user details.";
            console.error(error);
        }
    } else {
        alert("Please log in to get your details.");
    }
});

// Function to get a cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
