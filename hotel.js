const hotels = [
  {name: "Hotel Paradise Luxo", desc: "Suítes elegantes com vista para o mar.", price: "R$ 450/noite", img: "./img/hoteis/hotel1.jpg", rating: 5, tag: "Melhor Avaliado"},
  {name: "Hotel Praia Azul", desc: "Quartos confortáveis com café da manhã incluso.", price: "R$ 350/noite", img: "./img/hoteis/hotel2.jpg", rating: 4, tag: "Oferta"},
  {name: "Hotel Família Feliz", desc: "Perfeito para famílias, com piscina e lazer.", price: "R$ 400/noite", img: "./img/hoteis/hotel3.jpg", rating: 5, tag: ""},
  {name: "Hotel Montanha Verde", desc: "Vista incrível para a natureza e trilhas próximas.", price: "R$ 380/noite", img: "./img/hoteis/hotel4.jpg", rating: 4, tag: ""},
  {name: "Hotel Sol Mar", desc: "Desfrute de praias paradisíacas.", price: "R$ 420/noite", img: "./img/hoteis/hotel5.jpg", rating: 5, tag: "Oferta"},
  {name: "Hotel Lago Azul", desc: "Ambiente tranquilo com vista para o lago.", price: "R$ 390/noite", img: "./img/hoteis/hotel6.jpg", rating: 4, tag: ""},
  {name: "Hotel Cidade Viva", desc: "No coração da cidade, perto de tudo.", price: "R$ 360/noite", img: "./img/hoteis/hotel7.jpg", rating: 3, tag: ""},
  {name: "Hotel Jardim Encantado", desc: "Perfeito para relaxar cercado de verde.", price: "R$ 400/noite", img: "./img/hoteis/hotel8.jpg", rating: 5, tag: "Melhor Avaliado"},
  {name: "Hotel Praia Dourada", desc: "Aproveite o sol e a areia dourada.", price: "R$ 430/noite", img: "./img/hoteis/hotel9.jpg", rating: 4, tag: "Oferta"},
  {name: "Hotel Luxo e Conforto", desc: "Suítes sofisticadas com todos os serviços.", price: "R$ 500/noite", img: "./img/hoteis/hotel10.jpg", rating: 5, tag: "Melhor Avaliado"},
  {name: "Hotel Vista Mar", desc: "Acorde com a vista deslumbrante do oceano.", price: "R$ 480/noite", img: "./img/hoteis/hotel11.jpg", rating: 4, tag: ""},
  {name: "Hotel Sunset", desc: "Aproveite o pôr do sol do seu quarto.", price: "R$ 420/noite", img: "./img/hoteis/hotel12.jpg", rating: 5, tag: ""},
  {name: "Hotel Refúgio", desc: "Lugar perfeito para descanso total.", price: "R$ 390/noite", img: "./img/hoteis/hotel13.jpg", rating: 4, tag: ""},
  {name: "Hotel Montanhas", desc: "Vista incrível para as montanhas.", price: "R$ 410/noite", img: "./img/hoteis/hotel14.jpg", rating: 4, tag: ""},
  {name: "Hotel Oasis", desc: "Deserto e luxo em um só lugar.", price: "R$ 470/noite", img: "./img/hoteis/hotel15.jpg", rating: 5, tag: "Oferta"},
  {name: "Hotel Mar e Sol", desc: "Paraíso à beira-mar.", price: "R$ 450/noite", img: "./img/hoteis/hotel16.png", rating: 4, tag: ""},
  {name: "Hotel Cidade Histórica", desc: "Próximo aos pontos turísticos.", price: "R$ 360/noite", img: "./img/hoteis/hotel17.jpg", rating: 3, tag: ""},
  {name: "Hotel Encanto", desc: "Lugar mágico e tranquilo.", price: "R$ 400/noite", img: "./img/hoteis/hotel18.jpg", rating: 5, tag: "Melhor Avaliado"},
  {name: "Hotel Litoral", desc: "Aproveite a praia e o sol.", price: "R$ 430/noite", img: "./img/hoteis/hotel19.jpg", rating: 4, tag: ""},
  {name: "Hotel Luxo Total", desc: "Suítes com todo conforto possível.", price: "R$ 500/noite", img: "./img/hoteis/hotel20.jpg", rating: 5, tag: "Oferta"}
];

function createStars(rating) {
    let stars = '';
    for(let i = 0; i < 5; i++) {
        stars += i < rating ? '★' : '☆';
    }
    return stars;
}

const container = document.querySelector(".grid-hotels");
hotels.forEach(hotel => {
    const card = document.createElement("div");
    card.classList.add("hotel-card");
    card.innerHTML = `
        ${hotel.tag ? `<div class="hotel-tag">${hotel.tag}</div>` : ''}
        <img src="${hotel.img}" alt="${hotel.name}">
        <div class="hotel-info">
            <h3>${hotel.name}</h3>
            <p class="rating">${createStars(hotel.rating)}</p>
            <p>${hotel.desc}</p>
            <p class="price">${hotel.price}</p>
            <button onclick="reserve('${hotel.name}')">Reservar</button>
        </div>
    `;
    container.appendChild(card);
});

// TOOLTIP
function showTooltip(message) {
    let tooltip = document.querySelector(".tooltip");
    if (!tooltip) {
        tooltip = document.createElement("div");
        tooltip.classList.add("tooltip");
        document.body.appendChild(tooltip);
    }
    tooltip.textContent = message;
    tooltip.classList.add("show");
    setTimeout(() => {
        tooltip.classList.remove("show");
    }, 2500);
}

// RESERVA
function reserve(hotelName) {
    showTooltip(`Você reservou: ${hotelName}! Entraremos em contato em breve.`);
}

// FORMULÁRIO
function enviarFormulario(event) {
    event.preventDefault();
    showTooltip("Mensagem enviada com sucesso!");
}
