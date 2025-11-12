const openChatBtn = document.getElementById('open-chat');
const chatToggle = document.getElementById("chat-toggle");
const chatbot = document.getElementById("chatbot");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");

chatToggle.addEventListener("click", () => {
  chatbot.style.display = chatbot.style.display === "flex" ? "none" : "flex";
});

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const msg = userInput.value.trim();
  if (!msg) return;

  addMessage(msg, "user");
  userInput.value = "";

  setTimeout(() => {
    const resposta = getBotResponse(msg.toLowerCase());
    addMessage(resposta, "bot");
  }, 700);
}

function addMessage(msg, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add(`${sender}-message`);
  msgDiv.innerHTML = msg;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function getBotResponse(input) {
  const text = input.toLowerCase();

  // 🏖️ Consultas sobre praias
  if (text.includes("praia") || text.includes("mar") || text.includes("sol")) {
    return `
      🏝️ Ah, nada melhor do que sentir a brisa do mar! <br><br>
      Aqui estão alguns destinos paradisíacos que posso te sugerir:  
      • <strong>Maldivas</strong> – luxo e águas cristalinas 💎 <br>
      • <strong>Fernando de Noronha</strong> – natureza e exclusividade 🌿 <br>
      • <strong>Cancún</strong> – diversão e mar turquesa 🐠 <br><br>
      Deseja que eu te mostre pacotes com hospedagem incluída?
    `;
  }

  // 🏨 Consultas sobre hotéis
  if (text.includes("hotel") || text.includes("hospedagem")) {
    return `
      🏨 Claro! Posso te ajudar a encontrar hotéis perfeitos para seu estilo: <br><br>
      • Luxuosos (ex: <strong>The Ritz-Carlton</strong>, <strong>Burj Al Arab</strong>) ✨ <br>
      • Românticos (ex: <strong>Hotel Villa Honegg</strong>, <strong>Paris Boutique Stay</strong>) 💞 <br>
      • Econômicos (ex: <strong>Ibis</strong>, <strong>Holiday Inn Express</strong>) 💼 <br><br>
      Você gostaria que eu filtrasse por <strong>preço</strong>, <strong>localização</strong> ou <strong>tipo de experiência</strong>?
    `;
  }

  // 🏛️ Lugares históricos
  if (text.includes("histórico") || text.includes("historia") || text.includes("cultura")) {
    return `
      🏛️ Fascinante! O mundo está repleto de lugares cheios de história e cultura.  
      Veja alguns destinos imperdíveis: <br><br>
      • <strong>Roma, Itália</strong> – o Coliseu e o coração do Império Romano 🇮🇹 <br>
      • <strong>Atenas, Grécia</strong> – berço da civilização ocidental 🇬🇷 <br>
      • <strong>Egito</strong> – Pirâmides de Gizé e o Vale dos Reis 🇪🇬 <br>
      • <strong>Machu Picchu, Peru</strong> – a cidade perdida dos Incas 🇵🇪 <br><br>
      Quer que eu te mostre pacotes culturais completos com guias e experiências locais?
    `;
  }

  // ✈️ Pacotes e viagens
  if (text.includes("pacote") || text.includes("viagem") || text.includes("voo") || text.includes("viajar")) {
    return `
      ✈️ Que tal começar a planejar sua próxima aventura?  
      Temos pacotes incríveis para todos os gostos: <br><br>
      🌴 <strong>Relaxar</strong> – praias, resorts e spas <br>
      🏔️ <strong>Aventura</strong> – trilhas, escaladas e safáris <br>
      🏙️ <strong>Cultura</strong> – cidades históricas e museus <br>
      💕 <strong>Romance</strong> – viagens a dois inesquecíveis <br><br>
      Me diga o estilo de viagem que você prefere e eu te mostro as melhores opções.
    `;
  }

  // 💬 Dúvidas gerais e suporte
  if (text.includes("ajuda") || text.includes("duvida") || text.includes("problema") || text.includes("cancelar") || text.includes("reserva")) {
    return `
      🧭 Claro, estou aqui pra te ajudar! <br><br>
      Posso responder perguntas sobre: <br>
      • Como <strong>cancelar</strong> ou <strong>alterar</strong> uma reserva 🧾 <br>
      • Como <strong>verificar o status</strong> do pagamento 💳 <br>
      • <strong>Promoções</strong> e <strong>cupons</strong> disponíveis 🎟️ <br><br>
      Sobre qual desses temas você quer saber mais?
    `;
  }

  // ❤️ Receptividade e saudações
  if (text.includes("oi") || text.includes("olá") || text.includes("bom dia") || text.includes("boa tarde") || text.includes("boa noite")) {
    return `
      👋 Olá, viajante! Eu sou o <strong>TravelBot</strong>, seu assistente de viagens.  
      Posso te ajudar a planejar uma viagem inesquecível!  
      Você está pensando em <strong>praia</strong>, <strong>cultura</strong> ou <strong>descanso</strong>?
    `;
  }

  // 💡 Recomendação genérica (fallback)
  return `
    🌍 Que legal! Posso te ajudar a escolher <strong>destinos, hotéis, pacotes</strong> ou tirar dúvidas sobre <strong>reservas</strong>.  
    Me conte um pouquinho mais sobre o que você procura:  
    Quer viajar para <strong>praia</strong>, <strong>montanha</strong>, ou um <strong>lugar histórico</strong>? 🌄
  `;
}