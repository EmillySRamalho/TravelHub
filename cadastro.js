// Firebase v11
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
    getAuth,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDLuFu3bxT5yhDctPMkyGtKdo_9QGm5eq8",
    authDomain: "travelhub-c15ac.firebaseapp.com",
    projectId: "travelhub-c15ac",
    storageBucket: "travelhub-c15ac.firebasestorage.app",
    messagingSenderId: "583027843122",
    appId: "1:583027843122:web:d59fdf5bbdce0edf619c2b",
    measurementId: "G-TXMQ8HNWZ9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Inputs
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");

// Botões
const criarBtn = document.getElementById("btn-criar");
const googleBtn = document.getElementById("google-btn");

// Resultado
const result = document.getElementById("resultado");


/* --------------- CRIAR CONTA COM EMAIL + SENHA ----------------- */
criarBtn.addEventListener("click", async () => {
    const nome = nomeInput.value;
    const email = emailInput.value;
    const senha = senhaInput.value;

    if (!nome || !email || !senha) {
        result.textContent = "Preencha todos os campos!";
        return;
    }

    try {
        const res = await createUserWithEmailAndPassword(auth, email, senha);
        const user = res.user;

        // Adicionar nome ao perfil
        await updateProfile(user, { displayName: nome });

        result.innerHTML = `
            <strong>Conta criada com sucesso!</strong><br>
            Bem-vindo, ${nome}!
        `;

    } catch (err) {
        result.textContent = "Erro: " + err.message;
    }
});


/* --------------- CRIAR CONTA COM GOOGLE ----------------- */
googleBtn.addEventListener("click", async () => {
    try {
        const provider = new GoogleAuthProvider();
        const res = await signInWithPopup(auth, provider);
        const user = res.user;

        result.innerHTML = `
            <strong>Conta criada com Google!</strong><br>
            Nome: ${user.displayName}<br>
            Email: ${user.email}
        `;
    } catch (err) {
        result.textContent = "Erro Google: " + err.message;
    }
});
