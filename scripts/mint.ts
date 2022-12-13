import '@nomiclabs/hardhat-ethers'
import { ethers } from 'hardhat'

async function main() {
  const factory = await ethers.getContractFactory('BLS_NFT')

  const contract = factory.attach("0x5b1869D9A4C187F2EAa108f3062412ecf0526b24");

  await contract.mint("0xB92656Efe00cCC50AB76DE68437143b8b9CBc1b8", 2);

  const balance = await contract.balanceOf("0xB92656Efe00cCC50AB76DE68437143b8b9CBc1b8");

  console.log({ balance });

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
