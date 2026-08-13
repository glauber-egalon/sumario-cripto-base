# Sumário Cripto — Base Builder Projects

Projetos desenvolvidos na **Base Mainnet** com o objetivo de aprender desenvolvimento on-chain e construir aplicações reais utilizando smart contracts.

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

---

## Estrutura do projeto

```text
sumario-cripto-base/
├── contracts/
│   ├── MeuPrimeiroContrato.sol
│   ├── SumarioCriptoRegistry.sol
│   ├── SumarioCriptoVoting.sol
│   ├── SumarioCriptoNFT.sol
│   └── SumarioCriptoCaixinha.sol
│
├── dapp/
│   └── index.html
│
├── caixinha/
│   └── index.html
│
└── README.md
```

---

## Objetivo

Este repositório registra minha evolução como builder no ecossistema Base, começando por contratos simples e avançando para dApps, NFTs, sistemas de votação, pagamentos on-chain e novas aplicações.
