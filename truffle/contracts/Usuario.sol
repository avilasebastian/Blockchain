//SPDX-License-Identifier: MIT
pragma solidity >= 0.5.0 < 0.7.0;

contract Usuario {

  mapping(address => int256) public saldo;// tiene qu

  modifier positivo(int256 valor){
    require(valor > 0, "El valor debe ser positivo");//validacion
    _;
  }
  // cambiar poner por cargar
  function poner(address usuario, int256 cuanto) public positivo (cuanto){
    int256 plata = saldo[usuario];
    plata += cuanto;
    saldo[usuario] = plata;
  }
  // cambiar sacar por comprar
  function sacar(address usuario, int256 cuanto) public positivo(cuanto){
    int256 dinero = saldo[usuario];
    require(dinero >= cuanto, "No hay suficiente efectivo");
    dinero -= cuanto;
    saldo[usuario] = dinero;
  }

}