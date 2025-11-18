import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { 
    getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, 
    sendPasswordResetEmail, setPersistence, browserLocalPersistence, onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Config Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDLuFu3bxT5yhDctPMkyGtKdo_9QGm5eq8",
    authDomain: "travelhub-c15ac.firebaseapp.com",
    projectId: "travelhub-c15ac",
    storageBucket: "travelhub-c15ac.appspot.com",
    messagingSenderId: "583027843122",
    appId: "1:583027843122:web:d59fdf5bbdce0edf619c2b",
    measurementId: "G-TXMQ8HNWZ9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Persistência de login: usuário fica logado mesmo ao mudar de página
setPersistence(auth, browserLocalPersistence)
    .then(() => console.log("Persistência ativada: usuário ficará logado"))
    .catch(err => console.error("Erro na persistência:", err));

// DOM
const googleBtn = document.getElementById('google-btn');
const loginEmailBtn = document.getElementById('login-email-btn');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const resultadoDiv = document.getElementById('resultado');
const esqueciSenha = document.getElementById('esqueci-senha');

// VERIFICAÇÃO DE LOGIN AUTOMÁTICO
onAuthStateChanged(auth, user => {
    if(user){
        // Usuário já está logado, redireciona direto para o dashboard
        window.location.href = 'dashboard-completo.html';
    }
});

// LOGIN COM GOOGLE
googleBtn.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        window.location.href = 'dashboard.html';
    } catch (error) {
        resultadoDiv.innerText = `Erro: ${error.message}`;
    }
});

// LOGIN COM EMAIL/SENHA
loginEmailBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    const senha = senhaInput.value;
    if(!email || !senha){
        resultadoDiv.innerText = "Preencha todos os campos.";
        return;
    }
    try {
        await signInWithEmailAndPassword(auth, email, senha);
        window.location.href = 'dashboard-completo.html';
    } catch (error) {
        resultadoDiv.innerText = `Erro: ${error.message}`;
    }
});

// ESQUECI MINHA SENHA
esqueciSenha.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    if(!email){
        resultadoDiv.innerText = "Digite seu email para redefinir a senha.";
        return;
    }
    try {
        await sendPasswordResetEmail(auth, email);
        resultadoDiv.innerText = "Email de redefinição enviado!";
    } catch (error) {
        resultadoDiv.innerText = `Erro: ${error.message}`;
    }
});
