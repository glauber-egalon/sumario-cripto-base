import express from "express";

import { paymentMiddleware, x402ResourceServer} from "@x402/express";

import { ExactEvmScheme } from "@x402/evm/exact/server";
import { createCdpFacilitatorClient } from "@coinbase/cdp-sdk/x402";

import { createPaywall } from "@x402/paywall";
import { evmPaywall } from "@x402/paywall/evm";

import {
  BUILDER_CODE,
  declareBuilderCodeExtension
} from "@x402/extensions/builder-code";

const app = express();
app.set("trust proxy", 1);

const PORT = 3000;

const payTo = "0xaa65BD65BdD476d8F3e830e115B7013b07bA9FED";

const facilitatorClient = createCdpFacilitatorClient();

const resourceServer = new x402ResourceServer(facilitatorClient)
  .register("eip155:8453", new ExactEvmScheme())

await resourceServer.initialize();

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
      network: "eip155:8453",
      payTo
    },
    description: "Dica cripto do Sumario Cripto",
    extensions: {
      [BUILDER_CODE]: declareBuilderCodeExtension("bc_qshphqwc")
    }
  }
};

app.get("/", (req, res) => {
  res.send("Sumario Cripto x402 funcionando!");
});

app.get("/api/cdp-sdk-test", async (req, res) => {
  try {
    const facilitator = createCdpFacilitatorClient();

    const start = Date.now();

    const supported = await facilitator.getSupported();

    res.json({
      ok: true,
      timeMs: Date.now() - start,
      supported
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      name: error.name,
      message: error.message
    });
  }
});

app.get("/api/cdp-test", async (req, res) => {
  try {
    const start = Date.now();

    const response = await fetch(
      "https://api.cdp.coinbase.com/platform/v2/x402/supported",
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const text = await response.text();

    res.json({
      ok: response.ok,
      status: response.status,
      timeMs: Date.now() - start,
      body: text
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
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

export default app;
