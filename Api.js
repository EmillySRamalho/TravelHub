import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Suas credenciais de teste
const client_id = "Z5M9d9w5KEPNduGv8nviOoee0CZBjPU8";
const client_secret = "H3hORONfu19uh0Jp";

// Endpoint para buscar voos
app.get("/voos", async (req, res) => {
  try {
    // Captura parâmetros da query ou define valores padrão
    const {
      origem = "GRU",
      destino = "MIA",
      data = "2025-12-10",
      adultos = 1,
      max = 5,
    } = req.query;

    // 1️⃣ Gerar token OAuth2
    const tokenResponse = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id,
        client_secret,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const token = tokenResponse.data.access_token;

    // 2️⃣ Buscar voos usando os parâmetros
    const voosResponse = await axios.get(
      "https://test.api.amadeus.com/v2/shopping/flight-offers",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          originLocationCode: origem,
          destinationLocationCode: destino,
          departureDate: data,
          adults: adultos,
          max,
        },
      }
    );

    res.json(voosResponse.data);

  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).send("Erro ao buscar voos");
  }
});

// Rodando o servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
