import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDEmOZt4pMUHmvuqEN9fBABb9jr6yB4hRk",
    authDomain: "shopping-web-im.firebaseapp.com",
    projectId: "shopping-web-im",
    storageBucket: "shopping-web-im.appspot.com",
    messagingSenderId: "211881878300",
    appId: "1:211881878300:web:98dcce82ba0e41e5be90d9"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;