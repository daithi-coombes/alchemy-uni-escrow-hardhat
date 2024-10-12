# Decentralized Escrow Application

This is an Escrow Dapp built with [Hardhat](https://hardhat.org/).

## Project Layout

There are three top-level folders:

1. `/app` - contains the front-end application
2. `/contracts` - contains the solidity contract
3. `/tests` - contains tests for the solidity contract

## Setup

Install dependencies in the top-level directory with `npm install`.

After you have installed hardhat locally, you can use commands to test and compile the contracts, among other things. To learn more about these commands run `npx hardhat help`.

Compile the contracts using `npx hardhat compile`. The artifacts will be placed in the `/app` folder, which will make it available to the front-end. This path configuration can be found in the `hardhat.config.js` file.

## Front-End

`cd` into the `/app` directory and run `npm install`

To run the front-end application run `npm start` from the `/app` directory. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Challenges

### Challenge 1: Run the dApp on a Live Testnet
 > Try running the Escrow dApp on the Göerli testnet. This involves you deploying the smart contract to the Göerli test network.
 > Need an Alchemy endpoint in order to deploy to a testnet? Get one here.
 > You can acquire some testnet ether via Alchemy's Göerli Faucet.
 > Then you can change the network on Apex Wallet to point at the testnet of your choosing. From there, simply deploy and interact with the contract as you did on the local testnet!

Sepolia Testnet: [0x0af82b2c65ac58905d1c1c980c2b2da3643aaceb](https://sepolia.etherscan.io/0x0af82b2c65ac58905d1c1c980c2b2da3643aaceb)

Approved: [0x446e677ebe2d5dc3aa0e3715b9572ab634bf5c7dcebe4ea71bbf4a89ce573d1d](https://sepolia.etherscan.io/tx/0x446e677ebe2d5dc3aa0e3715b9572ab634bf5c7dcebe4ea71bbf4a89ce573d1d)

### Challenge 2: Stylize
 > Make the application your own! Change the HTML around and play with the CSS. Add some JavaScript.
 > Make the best looking decentralized escrow application anyone has ever seen!

### Challenge 3: Wei to Ether Conversion
 > Is Wei really user friendly? Perhaps we should accept the deposit as ether instead of wei.
 > In this case, you'll need to do the conversion inside of the application code, before the contract's deployment!

### Challenge 4: Persistence
 > When you refresh the page, all the escrow smart contracts are gone!
 > It would be nice if we could keep track of all smart contracts that have been deployed. We could do this by creating a server that keeps track of all the deployed Escrow Smart Contracts. Either that or a page that can interface with any Escrow contract given a particular address.

### Challenge 5: What else?
 > What else can be done with the Decentralized Escrow Application?
 > Is there something that can be added to the Escrow Contract? If so, feel free to change the Escrow.sol in /contracts and make sure to test it afterwards by running npm run test!
