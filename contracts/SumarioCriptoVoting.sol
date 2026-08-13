// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SumarioCriptoVoting {

    struct Proposta {
        string descricao;
        uint256 votos;
    }

    Proposta[] public propostas;

    mapping(uint256 => mapping(address => bool)) public jaVotou;

    function criarProposta(string memory descricao) public {
        propostas.push(
            Proposta({
                descricao: descricao,
                votos: 0
            })
        );
    }

    function votar(uint256 propostaId) public {
        require(propostaId < propostas.length, "Proposta inexistente");
        require(!jaVotou[propostaId][msg.sender], "Carteira ja votou");

        jaVotou[propostaId][msg.sender] = true;
        propostas[propostaId].votos++;
    }

    function quantidadePropostas() public view returns (uint256) {
        return propostas.length;
    }
}
