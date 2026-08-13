// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SumarioCriptoCaixinha {

    address public dono;

    struct Pagamento {
        address pagador;
        uint256 valor;
        uint256 data;
    }

    Pagamento[] public pagamentos;

    constructor() {
        dono = msg.sender;
    }

    function depositar() public payable {
        require(msg.value > 0, "Envie algum ETH");

        pagamentos.push(
            Pagamento({
                pagador: msg.sender,
                valor: msg.value,
                data: block.timestamp
            })
        );
    }

    function sacar(uint256 valor) public {
        require(msg.sender == dono, "Apenas o dono");
        require(valor <= address(this).balance, "Saldo insuficiente");

        (bool sucesso, ) = payable(dono).call{value: valor}("");
        require(sucesso, "Falha ao sacar");
    }

    function quantidadePagamentos() public view returns (uint256) {
        return pagamentos.length;
    }

    function saldoContrato() public view returns (uint256) {
        return address(this).balance;
    }
}
