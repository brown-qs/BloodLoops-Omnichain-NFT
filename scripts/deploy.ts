import '@nomiclabs/hardhat-ethers'
import { ethers, network } from 'hardhat'

import CONSTANTS from '../constants';

async function main() {
  const factory = await ethers.getContractFactory('BLS_NFT')

  const networkName = network.name;

  console.log({network: networkName});

  // If we had constructor arguments, they would be passed into deploy()
  
  const contract = await factory.deploy(CONSTANTS.LZEndPoint[networkName]);
  
  // The address the Contract WILL have once mined
  console.log(contract.address)

  // The transaction that was sent to the network to deploy the Contract
  console.log(contract.deployTransaction.hash)

  // The contract is NOT deployed yet; we must wait until it is mined
  await contract.deployed()
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
