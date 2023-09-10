import React, { useEffect, useState } from 'react';
import Menu from './components/Navbar';
import Formulario from './components/Formulario';
import InstalarMetaMask from './components/instalarMetaMask';
import Web3 from 'web3';
import smartContractRegistro from './smartContract/registro.json';
import ListarRegistro from './components/ListarRegistro';

function App() {
  // Mostrar contenido de registro.json en la consola
  //console.log('Contenido de registro.json:', smartContractRegistro);

  const [Metamask, setMetamask] = useState(false);

  const [web3, setWeb3] = useState(null); // Guardar instancia de web3
  const [account, setAccount] = useState(null); // Variable para la dirección de la cuenta
  const [balance, setBalance] = useState(null); // Variable para el saldo de la cuenta
  const [contract, setContract] = useState(null); // Variable de instancia del contrato

  const [listarInformacionEstudios, setListarInformacionEstudios] = useState([]);
  // console.log("ListarInformacionEstudios ==>", listarInformacionEstudios);

  // Función para conenctar wallet
  const conectarWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
  
      try {
        await window.ethereum.enable();
  
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
  
        const balanceWei = await web3Instance.eth.getBalance(accounts[0]);
        const balanceEth = web3Instance.utils.fromWei(balanceWei, 'ether');
        setBalance(balanceEth);

        const contractInstance = new web3Instance.eth.Contract(
          smartContractRegistro,
          smartContractRegistro && "0x34D44DBc2c73B0eCb4bC738bfB850f92AaB89ae2"
        ); // Crear una instancia
        setContract(contractInstance);
        // console.log("contractInstance ==>", contractInstance);

      } catch (error) {
        console.error(error);
      }
    } else {
      setMetamask(false);
    }
  };

  useEffect(() => {
    async function Wallet() { // Verificamos si tenemos una wallet disponible
      if (typeof window.ethereum !== 'undefined') {
        console.log("¡Sí tenemos wallet!");
        setMetamask(true);
      } else {
        console.log("¡No tenemos wallet!")
      }
    };
    Wallet();
  }, []);

  const ListarRegistros = async () =>{

    // console.log("contract == >",contract);
    if (contract) {
      try{
        const contadorRegistros = await contract.methods.registroCounter().call();
        console.log("contadorRegistros ==>", contadorRegistros);

        let arrayEstudio = [];
        for (let i = 1; i <= contadorRegistros; i++) {
          const inforestudio = await contract.methods.estudios(i).call();
          console.log(inforestudio);          
          if (inforestudio.categoria != " ") {
            const estudio = {
              categoria: inforestudio.categoria,
              creatAtl: inforestudio.creatAtl,
              fechaFin: inforestudio.fechaFin,
              fechaInicio: inforestudio.fechaInicio,
              id:inforestudio.id,
              lugarDeFormacion:inforestudio.lugarDeFormacion,
              id: inforestudio.id,
              lugarDeFormacion: inforestudio.lugarDeFormacion,
              tituloEstudio: inforestudio.tituloEstudio,
              verificacion: inforestudio.verificacion
            };
            arrayEstudio.push(estudio);
          };
        };
        // console.log(arrayEstudio);
        setListarInformacionEstudios(arrayEstudio);

      } catch (error) {
        console.error('Error al actualizar el valor: ', error);
      }
    }
  };
  useEffect(() => { ListarRegistros(); }, [contract]);

  return (
    <div>
      <Menu conectarWallet={conectarWallet} account={account} balance={balance} />
      <div>
        {Metamask ? (
          <div>
            <Formulario contrato={contract} direccion={account} ></Formulario>
            <ListarRegistro listarInformacionEstudios={listarInformacionEstudios} />
          </div>
        ) : (
          <InstalarMetaMask />
        )}
      </div>
    </div>
  );
}

export default App;