import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { create, mplCore } from '@metaplex-foundation/mpl-core'
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'

const RPC = 'https://api.devnet.solana.com'

const METADATA_URI =
  'https://amaranth-eldest-duck-598.mypinata.cloud/ipfs/bafkreid2ozmgxjfc6xf4a6r4hvnxnzasnq24cimykprq6jevhxiksunhfi'

const umi = createUmi(RPC).use(mplCore())

const wallet = new PhantomWalletAdapter()

const connectButton = document.querySelector('#connect')
const mintButton = document.querySelector('#mint')
const status = document.querySelector('#status')

connectButton.addEventListener('click', async () => {
  try {
    status.textContent = 'Connecting to Phantom...'

    await wallet.connect()

    umi.use(walletAdapterIdentity(wallet))

    status.textContent =
      `Connected:\n${wallet.publicKey.toBase58()}`

    mintButton.disabled = false

  } catch (error) {
    console.error(error)
    status.textContent = 'Phantom connection failed.'
  }
})

mintButton.addEventListener('click', async () => {
  try {
    mintButton.disabled = true

    status.textContent =
      'Preparing Arash 2099 #001 transaction...'

    const result = await create(umi, {
      name: 'Arash 2099',
      uri: METADATA_URI
    }).sendAndConfirm(umi)

    status.textContent =
      `SUCCESS!\n\nArash 2099 #001 was created on Devnet.\n\nSignature:\n${result.signature}`

  } catch (error) {

    console.error(error)

    status.textContent =
      `Mint failed:\n${error?.message || error}`

    mintButton.disabled = false
  }
})
