const Usuario = artifacts.require("./Usuario.sol")

let usuarioSmartContract

contract('Test de un Usuario', async accounts=>{
  const cuentaTres = accounts[2]
 
  beforeEach( "antes de cada uno", async()=>{
    usuarioSmartContract = await Usuario.new()
    await usuarioSmartContract.poner(cuentaTres, 100)
    const saldo = await usuarioSmartContract.saldo(cuentaTres)
    
    assert.equal(saldo, 100)// (lo que tengo, lo que espero)  
  })
  // Clase Eq 1 caso feliz retiro menos de lo que tengo
  it("Retiro menos plata de lo que tengo (100), espero 80", async()=>{
    await usuarioSmartContract.sacar(cuentaTres, 20)
    const saldo = await usuarioSmartContract.saldo.call(cuentaTres)

    assert.equal(saldo, 80)
  })
  // Clase Eq 2 retiro todo lo que tengo (100) espero 0
  it("Retiro todo lo que tengo (100), espero 0", async()=>{
    await usuarioSmartContract.sacar(cuentaTres,100)
    const saldo = await usuarioSmartContract.saldo.call(cuentaTres)

    assert.equal(saldo, 0)
  })
  // Clase Eq 3 retiro 0 pesos
  it("Retiro 0 pesos, espero un error", async()=>{
    try{
      await usuarioSmartContract.sacar(cuentaTres,0)
      assert.fail("Deberia fallar")
    }catch(error){
      assert.equal(error.reason, "El valor debe ser positivo")//es el de modifier
    }  
  })

  // Clase Eq 4 Retiro un monto negativo
  it("Retiro un monto negativo, espero un error",async()=>{
    try{
      await usuarioSmartContract.sacar(cuentaTres, -10) 
      assert.fail("Deberia fallar")  
    }catch(error){
      assert.equal(error.reason, "El valor debe ser positivo")
    }
  })

  // Clase Eq 5 Retiro mas de lo que tengo
  it("Retiro mas de lo que tengo (100), espero un error", async()=>{
    try{
      await usuarioSmartContract.sacar(cuentaTres, 101)
      assert.fail("Deberia fallar")
      // assert.fail(true,false, "No hay suficiente efectivo")
    }catch(e){
      assert.equal(e.reason, "No hay suficiente efectivo")
      // assert.include(String(e), 'revert', "Tiro un error diferente")
    }
  })
  // Deposito 50, espero 150
  it("Deposito 50, espero 150", async()=>{
      await usuarioSmartContract.poner(cuentaTres, 50)
      const saldo = await usuarioSmartContract.saldo.call(cuentaTres)
      
      assert.equal(saldo, 150)
  })
  // Deposito 0, espero un error
  it("Deposito 0 pesos, espero un error", async()=>{
    try{
      await usuarioSmartContract.poner(cuentaTres,0)
      assert.fail("Deberia fallar")
    }catch(e){
      assert.equal(e.reason, "El valor debe ser positivo")
    }
  })
  
  // Quiero poner un numero negativo
  it("Deposito un numero negativo. espero un error", async()=>{
    try{
      await usuarioSmartContract.poner(cuentaTres, -1)
      assert.fail("Deberia fallar")
    }catch(e){
      assert.equal(e.reason, "El valor debe ser positivo")
    }
  })

})  

