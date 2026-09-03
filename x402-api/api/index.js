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
  },

  "GET /api/bitcoin-summary": {
    accepts: {
      scheme: "exact",
      price: "$0.02",
      network: "eip155:8453",
      payTo
    },
    description: "Resumo rapido do mercado de Bitcoin",
    extensions: {
      [BUILDER_CODE]: declareBuilderCodeExtension("bc_qshphqwc")
    }
  },

  "GET /api/risk-check": {
    accepts: {
      scheme: "exact",
      price: "$0.01",
      network: "eip155:8453",
      payTo
    },
    description: "Analise simples de risco cripto",
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

app.get("/api/bitcoin-summary", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"
    );

    const data = await response.json();

    const price = data.bitcoin.usd;
    const change24h = data.bitcoin.usd_24h_change;

    let sentiment = "Neutro";

    if (change24h > 2) sentiment = "Positivo";
    if (change24h < -2) sentiment = "Negativo";

    const formattedPrice = price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "USD"
    });

    res.send(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bitcoin Market Summary</title>

        <style>
          body {
            font-family: Arial, sans-serif;
            background: #0f1115;
            color: white;
            margin: 0;
            padding: 40px 20px;
          }

          .container {
            max-width: 600px;
            margin: auto;
          }

          .card {
            background: #181b22;
            border: 1px solid #2a2f3a;
            border-radius: 16px;
            padding: 30px;
          }

          h1 {
            margin-top: 0;
          }

          .label {
            color: #aaa;
            margin-top: 25px;
          }

          .value {
            font-size: 28px;
            font-weight: bold;
            margin-top: 5px;
          }

          .summary {
            line-height: 1.6;
            margin-top: 25px;
          }

          a {
            display: inline-block;
            margin-top: 25px;
            color: white;
            text-decoration: none;
          }
        </style>
      </head>

      <body>
        <div class="container">
          <div class="card">

            <h1>Bitcoin Market Summary</h1>

            <div class="label">Preço atual</div>
            <div class="value">${formattedPrice}</div>

            <div class="label">Variação em 24h</div>
            <div class="value">${change24h.toFixed(2)}%</div>

            <div class="label">Sentimento</div>
            <div class="value">${sentiment}</div>

            <div class="summary">
              O Bitcoin está cotado a ${formattedPrice} e apresenta
              variação de ${change24h.toFixed(2)}% nas últimas 24 horas.
              O movimento de curto prazo está ${sentiment.toLowerCase()}.
            </div>

            <a href="/">← Voltar</a>

          </div>
        </div>
      </body>
      </html>
    `);

  } catch (error) {
    res.status(500).send("Não foi possível obter os dados do Bitcoin.");
  }
});

app.get("/api/risk-check", (req, res) => {
  const token = req.query.token || "";
  const investimento = Number(req.query.investimento || 0);
  const percentual = Number(req.query.percentual || 0);

  if (!token || !investimento || !percentual) {
    return res.send(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Risk Check</title>

        <style>
          body {
            font-family: Arial, sans-serif;
            background: #0f1115;
            color: white;
            margin: 0;
            padding: 40px 20px;
          }

          .container {
            max-width: 600px;
            margin: auto;
          }

          .card {
            background: #181b22;
            border: 1px solid #2a2f3a;
            border-radius: 16px;
            padding: 30px;
          }

          input {
            width: 100%;
            box-sizing: border-box;
            padding: 12px;
            margin: 8px 0 18px;
            border-radius: 8px;
            border: 1px solid #333;
            background: #0f1115;
            color: white;
          }

          button {
            width: 100%;
            padding: 12px;
            border: 0;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
          }

          label {
            color: #bbb;
          }

          a {
            color: white;
          }
        </style>
      </head>

      <body>
        <div class="container">
          <div class="card">

            <h1>Risk Check</h1>

            <p>
              Informe alguns dados para receber uma análise simples
              do tamanho da posição.
            </p>

            <form method="GET" action="/api/risk-check">

              <label>Token</label>
              <input
                type="text"
                name="token"
                placeholder="Ex: BTC, ETH, AERO"
                required
              >

              <label>Valor que pretende investir (US$)</label>
              <input
                type="number"
                name="investimento"
                min="0.01"
                step="0.01"
                placeholder="Ex: 500"
                required
              >

              <label>Quanto isso representa da sua carteira (%)</label>
              <input
                type="number"
                name="percentual"
                min="0.1"
                max="100"
                step="0.1"
                placeholder="Ex: 10"
                required
              >

              <button type="submit">Analisar risco</button>

            </form>

            <p>
              <a href="/">← Voltar</a>
            </p>

          </div>
        </div>
      </body>
      </html>
    `);
  }

  let nivel = "Baixo";
  let mensagem =
    "O tamanho da posição está relativamente controlado em relação à sua carteira.";

  if (percentual > 10 && percentual <= 25) {
    nivel = "Médio";
    mensagem =
      "A posição já representa uma parcela relevante da carteira. Avalie bem a volatilidade do ativo.";
  }

  if (percentual > 25) {
    nivel = "Alto";
    mensagem =
      "A posição representa uma parcela muito grande da carteira. Uma queda forte do ativo pode ter impacto significativo no patrimônio.";
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resultado do Risk Check</title>

      <style>
        body {
          font-family: Arial, sans-serif;
          background: #0f1115;
          color: white;
          margin: 0;
          padding: 40px 20px;
        }

        .container {
          max-width: 600px;
          margin: auto;
        }

        .card {
          background: #181b22;
          border: 1px solid #2a2f3a;
          border-radius: 16px;
          padding: 30px;
        }

        .label {
          color: #aaa;
          margin-top: 20px;
        }

        .value {
          font-size: 26px;
          font-weight: bold;
          margin-top: 5px;
        }

        .message {
          margin-top: 25px;
          line-height: 1.6;
        }

        a {
          color: white;
        }
      </style>
    </head>

    <body>
      <div class="container">
        <div class="card">

          <h1>Risk Check</h1>

          <div class="label">Token</div>
          <div class="value">${token.toUpperCase()}</div>

          <div class="label">Valor do investimento</div>
          <div class="value">
            US$ ${investimento.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </div>

          <div class="label">Peso na carteira</div>
          <div class="value">${percentual}%</div>

          <div class="label">Nível de risco da posição</div>
          <div class="value">${nivel}</div>

          <div class="message">
            ${mensagem}
          </div>

          <p>
            <a href="/api/risk-check">← Fazer nova análise</a>
          </p>

          <p>
            <a href="/">← Voltar ao início</a>
          </p>

        </div>
      </div>
    </body>
    </html>
  `);
});

export default app;
