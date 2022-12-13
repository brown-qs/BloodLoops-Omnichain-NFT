import { expect } from 'chai'
import { ethers } from 'hardhat'
import '@nomiclabs/hardhat-ethers'

import { BLSNFT__factory, BLSNFT } from '../build/types'


const { getContractFactory, getSigners } = ethers

describe('BLSNFT', () => {
  let nft: BLSNFT

  beforeEach(async () => {
    // 1
    const signers = await getSigners()

    // 2
    const nftFactory = (await getContractFactory('BLS_NFT', signers[0])) as BLSNFT__factory
    nft = await nftFactory.deploy()
    await nft.deployed()
    const initialCount = await nft.getCount()

    // 3
    expect(initialCount).to.eq(0)
    expect(nft.address).to.properAddress
  })

  // 4
  describe('count up', async () => {
    it('should count up', async () => {
      await nft.countUp()
      const count = await nft.getCount()
      expect(count).to.eq(1)
    })
  })

  describe('count down', async () => {
    // 5
    it('should fail due to underflow exception', async () => {
      const tx = nft.countDown()
      await expect(tx).revertedWith(
        'VM Exception while processing transaction: reverted with panic code 0x11 (Arithmetic operation underflowed or overflowed outside of an unchecked block)',
      )
    })

    it('should count down', async () => {
      await nft.countUp()

      await nft.countDown()
      const count = await nft.getCount()
      expect(count).to.eq(0)
    })
  })
})
