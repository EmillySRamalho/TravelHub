async function buscarVoosAmadeus(origem, destino, data, adultos) {
    const clientId = "xHAvCBANaAjDalIF2OAHL58ZTtkZHi3E";
    const clientSecret = "HcnVQkgby8GsbGtQ";

    // Obter token
    const tokenRes = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: clientId,
            client_secret: clientSecret
        })
    });
    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // Buscar voos
    const res = await fetch(
        `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origem}&destinationLocationCode=${destino}&departureDate=${data}&adults=${adultos}&max=5`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const dataJson = await res.json();
    return dataJson.data || [];
}

document.getElementById("btn-buscar").addEventListener("click", async () => {
    const origem = document.getElementById("origem").value.toUpperCase() || "GRU";
    const destino = document.getElementById("destino").value.toUpperCase() || "MIA";
    const data = document.getElementById("data").value || "2025-12-10";
    const adultos = document.getElementById("adultos").value || 1;

    try {
        const voos = await buscarVoosAmadeus(origem, destino, data, adultos);

        const lista = document.getElementById("lista-voos");
        lista.innerHTML = "";

        voos.forEach((voo) => {
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
