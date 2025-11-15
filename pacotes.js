const packages = [
  {name:"Pacote Praia dos Sonhos", desc:"4 dias de pura diversão e descanso na praia.", price:"R$ 1.500", img:"./img/pacotes/pacote1.jpg", tag:"Mais Popular"},
  {name:"Pacote Montanhas", desc:"Trilhas e aventuras em contato com a natureza.", price:"R$ 1.200", img:"./img/pacotes/pacote2.jpg", tag:"Oferta"},
  {name:"Pacote Cultural", desc:"Explore cidades históricas e museus.", price:"R$ 1.000", img:"./img/pacotes/pacote3.jpg", tag:""},
  {name:"Pacote Luxo Total", desc:"Resorts 5 estrelas com tudo incluído.", price:"R$ 2.500", img:"./img/pacotes/pacote4.jpg", tag:"Melhor Avaliado"},
  {name:"Pacote Aventura Radical", desc:"Rafting, escalada e esportes radicais.", price:"R$ 1.800", img:"./img/pacotes/pacote5.jpg", tag:""},
  {name:"Pacote Romântico", desc:"Férias perfeitas para casais apaixonados.", price:"R$ 1.700", img:"./img/pacotes/pacote6.jpg", tag:"Oferta"},
  {name:"Pacote Família Feliz", desc:"Diversão garantida para todas as idades.", price:"R$ 1.600", img:"./img/pacotes/pacote7.jpg", tag:""},
  {name:"Pacote Cidade Grande", desc:"Conheça os principais pontos turísticos urbanos.", price:"R$ 1.400", img:"./img/pacotes/pacote8.jpg", tag:""},
  {name:"Pacote Trilha e Natureza", desc:"Caminhadas e contato direto com a natureza.", price:"R$ 1.300", img:"./img/pacotes/pacote9.jpg", tag:""},
  {name:"Pacote Ilha Paradisíaca", desc:"Férias incríveis em ilhas tropicais.", price:"R$ 2.000", img:"./img/pacotes/pacote10.jpg", tag:""},
  {name:"Pacote Deserto Encantado", desc:"Deserto e luxo em um só lugar.", price:"R$ 2.100", img:"./img/pacotes/pacote11.jpg", tag:""},
  {name:"Pacote Região Vinícola", desc:"Deguste vinhos e paisagens incríveis.", price:"R$ 1.900", img:"./img/pacotes/pacote12.jpg", tag:""},
  {name:"Pacote Cruzeiro Marítimo", desc:"Descubra ilhas e cidades pelo mar.", price:"R$ 2.300", img:"./img/pacotes/pacote13.jpg", tag:"Mais Popular"},
  {name:"Pacote Safari", desc:"Aventura e animais selvagens.", price:"R$ 2.200", img:"./img/pacotes/pacote14.jpg", tag:""},
  {name:"Pacote Snowboard", desc:"Esportes de inverno em montanhas incríveis.", price:"R$ 2.000", img:"./img/pacotes/pacote15.jpg", tag:""}
];

const container = document.querySelector(".grid-packages");
const tooltip = document.getElementById("tooltip");

packages.forEach(pkg => {
    const card = document.createElement("div");
    card.classList.add("package-card");
    card.innerHTML = `
        ${pkg.tag ? `<div class="package-tag">${pkg.tag}</div>` : ''}
        <img src="${pkg.img}" alt="${pkg.name}">
        <div class="package-info">
            <h3>${pkg.name}</h3>
            <p>${pkg.desc}</p>
            <p class="price">${pkg.price}</p>
            <button onclick="reserve('${pkg.name}')">Reservar</button>
        </div>
    `;
    container.appendChild(card);
});

function reserve(name){
    tooltip.textContent = `Você reservou: ${name}!`;
    tooltip.classList.add("show");
    setTimeout(()=> tooltip.classList.remove("show"), 2500);
}

function enviarFormulario(event){
    event.preventDefault();
    tooltip.textContent = "Mensagem enviada com sucesso!";
    tooltip.classList.add("show");
    setTimeout(()=> tooltip.classList.remove("show"), 2500);
}
