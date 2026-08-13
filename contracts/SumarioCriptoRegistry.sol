// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SumarioCriptoRegistry {

    struct Registro {
        string titulo;
        string mensagem;
        address autor;
        uint256 data;
    }

    Registro[] public registros;

    function registrar(
        string memory titulo,
        string memory mensagem
    ) public {
        registros.push(
            Registro(
                titulo,
                mensagem,
                msg.sender,
                block.timestamp
            )
        );
    }

    function quantidadeRegistros() public view returns (uint256) {
        return registros.length;
    }
}
