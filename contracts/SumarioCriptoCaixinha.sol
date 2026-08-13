// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SumarioCriptoCaixinha {

    struct Pagamento {
        address pagador;
        uint256 valor;
        uint256 data;
    }

    Pagamento[] public pagamentos;

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

    function quantidadePagamentos() public view returns (uint256) {
        return pagamentos.length;
    }

    function saldoContrato() public view returns (uint256) {
        return address(this).balance;
    }
}
