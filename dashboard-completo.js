import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, addDoc, deleteDoc, query, where, orderBy } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase
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
const storage = getStorage();
const db = getFirestore();

// DOM
const userPhoto = document.getElementById('user-photo');
const changePhotoBtn = document.getElementById('change-photo-btn');
const photoInput = document.getElementById('photo-input');
const userName = document.getElementById('user-name');
const userNameHeader = document.getElementById('user-name-header');
const dashboardBtn = document.getElementById('dashboard-btn');
const reservasBtn = document.getElementById('reservas-btn');
const pagamentoBtn = document.getElementById('pagamento-btn');
const logoutBtn = document.getElementById('logout-btn');
const contentArea = document.getElementById('content-area');
const notifCount = document.getElementById('notif-count');

// Trocar foto
changePhotoBtn.addEventListener('click', ()=>photoInput.click());
photoInput.addEventListener('change', async e=>{
    const file=e.target.files[0];
    const user=auth.currentUser;
    if(file && user){
        const storageRef=ref(storage,`users/${user.uid}/profile.jpg`);
        await uploadBytes(storageRef,file);
        const photoURL=await getDownloadURL(storageRef);
        await updateProfile(user,{photoURL});
        userPhoto.src=photoURL;
        await setDoc(doc(db,"users",user.uid),{photoURL},{merge:true});
    }
});

// Delegação de eventos
contentArea.addEventListener('click', async e=>{
    const user=auth.currentUser;
    if(!user) return;

    if(e.target.classList.contains('details-btn')){
        const id=e.target.dataset.id;
        const docSnap=await getDoc(doc(db,"users",user.uid,"reservas",id));
        if(docSnap.exists()) alert(JSON.stringify(docSnap.data(),null,2));
    }

    if(e.target.classList.contains('cancel-btn')){
        const id=e.target.dataset.id;
        if(confirm("Deseja realmente cancelar esta reserva?")){
            await deleteDoc(doc(db,"users",user.uid,"reservas",id));
            e.target.parentElement.remove();
        }
    }

    if(e.target.classList.contains('remove-cartao-btn')){
        const id=e.target.dataset.id;
        if(confirm("Deseja remover este cartão?")){
            await deleteDoc(doc(db,"users",user.uid,"pagamentos",id));
            e.target.parentElement.remove();
        }
    }
});

// Carregar usuário
onAuthStateChanged(auth,async user=>{
    if(user){
        userName.textContent=user.displayName||"Usuário";
        userNameHeader.textContent=user.displayName||"Usuário";
        if(user.photoURL) userPhoto.src=user.photoURL;
        else{
            const docSnap=await getDoc(doc(db,"users",user.uid));
            if(docSnap.exists() && docSnap.data().photoURL) userPhoto.src=docSnap.data().photoURL;
        }
    } else window.location.href='login.html';
});

// Dashboard
dashboardBtn.addEventListener('click',async ()=>{
    contentArea.innerHTML=`<div class="card"><h4>Resumo de Reservas</h4><canvas id="reservasChart"></canvas></div>`;
    const user=auth.currentUser;
    const snapshot=await getDocs(collection(db,"users",user.uid,"reservas"));
    const data={};
    snapshot.forEach(doc=>{const d=doc.data().data; data[d]=(data[d]||0)+1;});
    const ctx=document.getElementById('reservasChart').getContext('2d');
    new Chart(ctx,{type:'bar',data:{labels:Object.keys(data),datasets:[{label:'Reservas',data:Object.values(data),backgroundColor:'#3498db'}]},options:{responsive:true,plugins:{legend:{display:false}}}});
});

// Reservas com filtros
reservasBtn.addEventListener('click',async ()=>{
    contentArea.innerHTML=`
        <div class="filters">
            <input type="date" id="start-date">
            <input type="date" id="end-date">
            <button id="filter-btn">Filtrar</button>
        </div>
        <div id="reservas-list" class="content"></div>
    `;
    const reservasList=document.getElementById('reservas-list');
    const startDate=document.getElementById('start-date');
    const endDate=document.getElementById('end-date');
    const filterBtn=document.getElementById('filter-btn');

    const loadReservas=async ()=>{
        reservasList.innerHTML="";
        let q=collection(db,"users",auth.currentUser.uid,"reservas");
        const snapshot=await getDocs(q);
        snapshot.forEach(doc=>{
            const data=doc.data();
            const d=new Date(data.data);
            if(startDate.value && new Date(startDate.value)>d) return;
            if(endDate.value && new Date(endDate.value)<d) return;
            reservasList.innerHTML+=`
                <div class="card">
                    <h4>Voo: ${data.voo}</h4>
                    <p>Data: ${data.data}</p>
                    <p>Origem: ${data.origem} → Destino: ${data.destino}</p>
                    <button class="details-btn" data-id="${doc.id}">Detalhes</button>
                    <button class="cancel-btn" data-id="${doc.id}">Cancelar</button>
                </div>
            `;
        });
    };

    filterBtn.addEventListener('click',loadReservas);
    loadReservas();
});

// Pagamentos com filtros
pagamentoBtn.addEventListener('click',async ()=>{
    contentArea.innerHTML=`
        <h3>Formas de Pagamento</h3>
        <input type="text" id="cartao-input" placeholder="Número do cartão">
        <button id="add-cartao-btn">Adicionar Cartão</button>
        <div id="pagamentos-list" class="content"></div>
    `;
    const pagamentosList=document.getElementById('pagamentos-list');
    const addBtn=document.getElementById('add-cartao-btn');
    const cartaoInput=document.getElementById('cartao-input');

    const loadPagamentos=async ()=>{
        pagamentosList.innerHTML="";
        const snapshot=await getDocs(collection(db,"users",auth.currentUser.uid,"pagamentos"));
        snapshot.forEach(doc=>{
            pagamentosList.innerHTML+=`
                <div class="payment-card">
                    <span><i class="fa fa-credit-card"></i> ${doc.data().cartao}</span>
                    <button class="remove-cartao-btn" data-id="${doc.id}">Remover</button>
                </div>
            `;
        });
    };

    addBtn.addEventListener('click',async ()=>{
        const cartao=cartaoInput.value.trim();
        if(cartao!==""){
            await addDoc(collection(db,"users",auth.currentUser.uid,"pagamentos"),{cartao});
            cartaoInput.value="";
            loadPagamentos();
        }
    });

    loadPagamentos();
});

// Logout
logoutBtn.addEventListener('click',async ()=>{await signOut(auth);window.location.href='login.html';});
