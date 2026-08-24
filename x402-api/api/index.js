import express from "express";

import {
  paymentMiddleware,
  x402ResourceServer
} from "@x402/express";

import { ExactEvmScheme } from "@x402/evm/exact/server";
import { HTTPFacilitatorClient } from "@x402/core/server";

import { createPaywall } from "@x402/paywall";
import { evmPaywall } from "@x402/paywall/evm";

const app = express();
const PORT = 3000;

const payTo = "0xaa65BD65BdD476d8F3e830e115B7013b07bA9FED";

const facilitatorClient = new HTTPFacilitatorClient({
  url: "https://x402.org/facilitator"
});

const resourceServer = new x402ResourceServer(facilitatorClient)
  .register("eip155:84532", new ExactEvmScheme());

const paywall = createPaywall()
  .withNetwork(evmPaywall)
  .withConfig({
    appName: "Sumario Cripto x402",
    testnet: true
  })
  .build();

const routes = {
  "GET /api/crypto-tip": {
    accepts: {
      scheme: "exact",
      price: "$0.01",
      network: "eip155:84532",
      payTo
    },
    description: "Dica cripto do Sumario Cripto"
  }
};

app.get("/", (req, res) => {
  res.send("Sumario Cripto x402 funcionando!");
});

app.use(
  paymentMiddleware(
    routes,
    resourceServer,
    undefined,
    paywall
  )
);

app.get("/api/crypto-tip", (req, res) => {
  res.json({
    tip: "Nunca arrisque capital que você não pode perder."
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
