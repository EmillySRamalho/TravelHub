// Firebase v11
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
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

// Botões
const googleBtn = document.getElementById("google-btn");

// Inputs
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");

// Botões de login/criação
const loginEmailBtn = document.getElementById("login-email-btn");
const criarContaBtn = document.getElementById("criar-email-btn");

// Esqueci minha senha
const esqueciSenhaBtn = document.getElementById("esqueci-senha");

// Resultado
const result = document.getElementById("resultado");


/* --------------- LOGIN COM GOOGLE ----------------- */
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
    } catch (err) {
        result.textContent = "Erro Google: " + err.message;
    }
});


/* --------------- CRIAR CONTA: EMAIL + SENHA ----------------- */
criarContaBtn.addEventListener("click", async () => {
    const email = emailInput.value;
    const senha = senhaInput.value;

    try {
        const res = await createUserWithEmailAndPassword(auth, email, senha);
        const user = res.user;

        result.innerHTML = `
            <strong>Conta criada com sucesso!</strong><br>
            Email: ${user.email}
        `;
    } catch (err) {
        result.textContent = "Erro ao criar conta: " + err.message;
    }
});


/* --------------- LOGIN EMAIL + SENHA ----------------- */
loginEmailBtn.addEventListener("click", async () => {
    const email = emailInput.value;
    const senha = senhaInput.value;

    try {
        const res = await signInWithEmailAndPassword(auth, email, senha);
        const user = res.user;

        result.innerHTML = `
            <strong>Login realizado!</strong><br>
            Email: ${user.email}
        `;
    } catch (err) {
        result.textContent = "Erro no login: " + err.message;
    }
});


/* --------------- ESQUECI MINHA SENHA ----------------- */
esqueciSenhaBtn.addEventListener("click", async () => {
    const email = emailInput.value;

    if (!email) {
        result.textContent = "Digite seu e-mail para recuperar a senha.";
        return;
    }

    try {
        await sendPasswordResetEmail(auth, email);
        result.innerHTML = `
            <strong>E-mail enviado!</strong><br>
            Verifique sua caixa de entrada para redefinir a senha.
        `;
    } catch (err) {
        result.textContent = "Erro ao enviar e-mail: " + err.message;
    }
});
