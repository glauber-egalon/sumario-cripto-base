// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SumarioCriptoX402Registry {
    address public dono;

    struct Servico {
        string nome;
        string endpoint;
        uint256 precoUsdCents;
        bool ativo;
    }

    Servico[] public servicos;

    constructor() {
        dono = msg.sender;
    }

    function registrarServico(
        string memory nome,
        string memory endpoint,
        uint256 precoUsdCents
    ) public {
        require(msg.sender == dono, "Apenas o dono");

        servicos.push(
            Servico({
                nome: nome,
                endpoint: endpoint,
                precoUsdCents: precoUsdCents,
                ativo: true
            })
        );
    }

    function alterarStatus(uint256 id, bool ativo) public {
        require(msg.sender == dono, "Apenas o dono");
        require(id < servicos.length, "Servico inexistente");

        servicos[id].ativo = ativo;
    }

    function quantidadeServicos() public view returns (uint256) {
        return servicos.length;
    }
}
