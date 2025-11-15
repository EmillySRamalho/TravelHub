// Firebase v11
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
    getAuth,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";


// → CONFIGURAÇÃO REAL DO FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyDLuFu3bxT5yhDctPMkyGtKdo_9QGm5eq8",
    authDomain: "travelhub-c15ac.firebaseapp.com",
    projectId: "travelhub-c15ac",
    storageBucket: "travelhub-c15ac.firebasestorage.app",
    messagingSenderId: "583027843122",
    appId: "1:583027843122:web:d59fdf5bbdce0edf619c2b",
    measurementId: "G-TXMQ8HNWZ9"
};


// → INICIALIZAR FIREBASE
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// → PEGAR BOTÕES + ÁREA QUE MOSTRA RESULTADO
const googleBtn = document.getElementById("google-btn");
const facebookBtn = document.getElementById("facebook-btn");
const result = document.getElementById("resultado");


// → LOGIN COM GOOGLE
googleBtn.addEventListener("click", async () => {
    try {
        const provider = new GoogleAuthProvider();
        const res = await signInWithPopup(auth, provider);
        const user = res.user;

        result.innerHTML = `
            <strong>Google Login OK!</strong><br>
            Nome: ${user.displayName}<br>
            Email: ${user.email}
        `;

        console.log("Google User:", user);

    } catch (err) {
        result.textContent = "Erro Google: " + err.message;
        console.error(err);
    }
});


// → LOGIN COM FACEBOOK
facebookBtn.addEventListener("click", async () => {
    try {
        const provider = new FacebookAuthProvider();
        const res = await signInWithPopup(auth, provider);
        const user = res.user;

        result.innerHTML = `
            <strong>Facebook Login OK!</strong><br>
            Nome: ${user.displayName}<br>
            Email: ${user.email || "Não fornecido pelo Facebook"}
        `;

        console.log("Facebook User:", user);

    } catch (err) {
        result.textContent = "Erro Facebook: " + err.message;
        console.error(err);
    }
});
