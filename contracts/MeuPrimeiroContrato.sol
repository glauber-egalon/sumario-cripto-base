// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MeuPrimeiroContrato {
    string public mensagem = "Meu primeiro contrato na Base!";

    function alterarMensagem(string memory novaMensagem) public {
        mensagem = novaMensagem;
    }
}
