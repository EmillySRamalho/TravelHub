let indice = 0;
        const imagens = document.querySelectorAll(".carrosel .imagem");

        function mostrarSlide(n) {
            imagens.forEach(img => img.classList.remove("ativo"));
            indice = (n + imagens.length) % imagens.length;
            imagens[indice].classList.add("ativo");
        }
        setInterval(() => {
            mostrarSlide(indice + 1);
        }, 4000);


document.getElementById("btn-buscar").addEventListener("click", async () => {
    const origem = document.getElementById("origem").value.toUpperCase() || "GRU";
    const destino = document.getElementById("destino").value.toUpperCase() || "MIA";
    const data = document.getElementById("data").value || "2025-12-10";
    const adultos = document.getElementById("adultos").value || 1;

    try {
        const response = await fetch(`http://localhost:3000/voos?origem=${origem}&destino=${destino}&data=${data}&adultos=${adultos}`);
        const dados = await response.json();

        const lista = document.getElementById("lista-voos");
        lista.innerHTML = "";

        dados.data.forEach((voo) => {
            const itinerario = voo.itineraries[0];
            const partida = itinerario.segments[0].departure;
            const chegada = itinerario.segments.slice(-1)[0].arrival;

            const div = document.createElement("div");
            div.classList.add("card-voo");
            div.innerHTML = `
                <h3>${partida.iataCode} → ${chegada.iataCode}</h3>
                <p><strong>Partida:</strong> ${partida.at}</p>
                <p><strong>Chegada:</strong> ${chegada.at}</p>
                <p><strong>Preço:</strong> ${voo.price.total} ${voo.price.currency}</p>
                <p><strong>Assentos:</strong> ${voo.numberOfBookableSeats}</p>
                <a href="#" class="btn-voo">Reservar</a>
            `;
            lista.appendChild(div);
        });
    } catch (error) {
        console.error("Erro ao carregar voos:", error);
        alert("Não foi possível carregar os voos.");
    }
});
