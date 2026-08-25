# Sumário Cripto — Base Builder Projects

Projetos desenvolvidos no ecossistema Base, incluindo aplicações em Base Mainnet e experimentos em Base Sepolia.

## Builder

**Wallet:**  
`0xaa65BD65BdD476d8F3e830e115B7013b07bA9FED`

**Builder Code:**  
`bc_qshphqwc`

**Network:** Base Mainnet  
**Chain ID:** `8453`

---

## Projetos

### 1. MeuPrimeiroContrato

Primeiro smart contract desenvolvido e implantado na Base.

Permite armazenar e alterar uma mensagem on-chain.

**Contract:**  
`0x53E24759c7798D5c49B4701c4af5d68AB2461c88`

---

### 2. SumarioCriptoRegistry

Contrato para armazenar registros contendo:

- título
- mensagem
- autor
- timestamp

Também possui uma dApp própria que permite conexão de carteira, leitura dos registros e criação de novos registros on-chain.

**Contract:**  
`0x7075Ef1FbCcCA4934E24F129f667bEd1bBCf9a1B`

**dApp:**  
https://sumario-cripto-dapp.vercel.app/

---

### 3. SumarioCriptoVoting

Sistema de votação on-chain.

Permite:

- criar propostas
- votar em propostas
- consultar resultados
- impedir que uma mesma carteira vote duas vezes na mesma proposta

**Contract:**  
`0x1e7341274051D8e78e764a3aF27A85755a3C1722`

---

### 4. SumarioCriptoNFT

Coleção **ERC-721** criada na Base utilizando OpenZeppelin.

**Collection:** Sumario Cripto Builder  
**Symbol:** `SCB`

**Contract:**  
`0x3d0151C3abb23F1aaBd371904381E600B2bB28D8`

---

### 5. SumarioCriptoCaixinha

Smart contract para receber ETH, registrar depósitos e permitir saque pelo dono do contrato.

Cada depósito registra:

- carteira do pagador
- valor enviado
- timestamp

A versão atual também possui:

- definição de `dono`
- função de saque restrita ao dono
- interface própria para depósitos
- atribuição ERC-8021 via Builder Code

**Contract:**  
`0x147cE9b67Bc61E90B1128083a4CE025E2Abcf6B0`

**dApp:**  
https://sumario-cripto-caixinha.vercel.app/

---

### 6. SumarioCriptoCaixinhaUSDC

Smart contract para receber, registrar e sacar pagamentos em **USDC** na Base.

O fluxo utiliza o padrão ERC-20:

- `approve()` para autorizar o contrato
- `depositar()` para transferir USDC
- `sacar()` para devolver USDC ao dono
- registro do pagador, valor e timestamp

A dApp também utiliza **ERC-8021** com o Builder Code:

`bc_qshphqwc`

**Contract:**  
`0xF1c08b93838Dca425b0aC2cdbaF1de660a666D6a`

**dApp:**  
https://sumario-cripto-caixinha-usdc.vercel.app/

---

### 7. SumarioCriptoX402

API construída com o protocolo **x402** para pagamentos por requisição na Base.

O projeto protege um endpoint HTTP e libera o conteúdo somente após o pagamento em **USDC**.

Atualmente o projeto está funcionando em **Base Mainnet**.

### Funcionalidades

- endpoint protegido por pagamento x402
- pagamento em USDC
- integração com carteira via paywall
- liquidação via Coinbase Developer Platform Facilitator
- liberação automática do conteúdo após o pagamento
- atribuição on-chain via Builder Code / ERC-8021
- registro on-chain do serviço através de contrato próprio

**Endpoint público:**

`https://sumario-cripto-base.vercel.app/api/crypto-tip`

**Preço atual:**

`0.01 USDC`

**Builder Code:**

`bc_qshphqwc`

**Registry Contract:**

`0xeB6937359ad2d9368F3faAAf6682b30167D86870`

**Deploy transaction:**

`0x0c5ae0c0e8563ece3c2e7472c371acabe92180450d73274dc6fbe3b3fe9220e6`

**Service registration transaction:**

`0x5e8a15db4a0e1a58204ce08d7387c74e0c94e0aa73cb7bb3785ff0c2b4daaf52`

---

## dApp e ERC-8021

A dApp do Sumário Cripto utiliza `ethers.js` para interação com a Base.

Também foi implementada atribuição on-chain utilizando **ERC-8021** e o Builder Code:

`bc_qshphqwc`

Isso permite atribuir ao aplicativo as transações geradas pela interface.

---

## Tecnologias

- Solidity
- Base Mainnet
- Remix IDE
- ethers.js
- OpenZeppelin
- ERC-721
- ERC-8021
- HTML
- CSS
- JavaScript
- Vercel
- GitHub
- Node.js
- Express
- x402
- Coinbase Developer Platform
- USDC

---

## Estrutura do projeto

```text
sumario-cripto-base/
├── contracts/
│   ├── MeuPrimeiroContrato.sol
│   ├── SumarioCriptoRegistry.sol
│   ├── SumarioCriptoVoting.sol
│   ├── SumarioCriptoNFT.sol
│   ├── SumarioCriptoCaixinha.sol
│   └── SumarioCriptoX402Registry.sol
│
├── dapp/
│   └── index.html
│
├── caixinha/
│   └── index.html
│
├── caixinha-usdc/
│   └── index.html
│
├── x402-api/
│   ├── api/
│   │   └── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── vercel.json
│
└── README.md
```

---

## Objetivo

Este repositório registra minha evolução como builder no ecossistema Base, começando por contratos simples e avançando para dApps, NFTs, sistemas de votação, pagamentos on-chain e novas aplicações.
