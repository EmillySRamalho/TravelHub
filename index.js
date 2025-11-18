import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { 
    getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { 
    getFirestore, collection, addDoc 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Configuração do Firebase
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
const db = getFirestore();

// Persistência de login
setPersistence(auth, browserLocalPersistence)
    .then(() => console.log("Persistência de login ativada"))
    .catch(err => console.error("Erro na persistência:", err));

// Captura elementos do DOM
const btnBuscar = document.getElementById('btn-buscar');
const origemInput = document.getElementById('origem');
const destinoInput = document.getElementById('destino');
const dataInput = document.getElementById('data');
const adultosInput = document.getElementById('adultos');
const listaVoos = document.getElementById('lista-voos');
const btnAcesso = document.getElementById('btn-acesso');

let currentUser = null;

// Detecta usuário logado
onAuthStateChanged(auth, user => {
    if(user){
        currentUser = user;
        console.log("Usuário logado:", user.email);

        // Atualiza botão de acesso
        if(btnAcesso){
            btnAcesso.textContent = "Dashboard";
            btnAcesso.onclick = () => window.location.href = "dashboard-completo.html";
        }
    } else {
        currentUser = null;
        console.log("Nenhum usuário logado");

        if(btnAcesso){
            btnAcesso.textContent = "Login";
            btnAcesso.onclick = () => window.location.href = "login.html";
        }
    }
});

// Evento de busca e reserva
if(btnBuscar){
    btnBuscar.addEventListener('click', async () => {
        if(!currentUser){
            alert("Você precisa estar logado para fazer reservas.");
            return;
        }

        const origem = origemInput.value.trim();
        const destino = destinoInput.value.trim();
        const data = dataInput.value;
        const adultos = adultosInput.value;

        if(!origem || !destino || !data || !adultos){
            alert("Preencha todos os campos.");
            return;
        }

        const reserva = {
            voo: `${origem} → ${destino}`,
            origem,
            destino,
            data,
            adultos
        };

        try {
            await addDoc(collection(db, "users", currentUser.uid, "reservas"), reserva);
            alert("Reserva feita com sucesso!");
        } catch(err) {
            console.error(err);
            alert("Erro ao fazer a reserva.");
        }
    });
}
