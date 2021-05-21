# QXS for OpenSea, adapted for hardhat from https://github.com/ProjectOpenSea/opensea-creatures
## Quick start

```sh
git clone https://github.com/dynamiculture/qxs-opensea
cd qxs-opensea
npm i
# list hardhat tasks:
npx hardhat
```
# install hardhat-shorthand
```sh
npm i -g hardhat-shorthand
hardhat-completion install
hh == npx hardhat
```
## Rinkeby Testnet, Etherscan
Get ether on Rinkeby:
https://faucet.rinkeby.io/

Create free accounts on:
https://infura.io
https://etherscan.io

Create .env (listed in .gitignore) supplying the following values:
```sh
RINKEBY_PRIVATE_KEY=
INFURA_API_KEY=
ETHERSCAN_API_KEY=
```
Clean, compile and test:
```sh
hh clean
hh compile
hh test

npm hardhat coverage
```
## Local test deployment
```sh
hh node
```
On a new terminal, go to the repository's root folder and run this to
deploy your contract:

```sh
hh run --network localhost scripts/deploy.ts
```
## Deploy to rinkeby
```sh
hh run --network rinkeby scripts/deploy-rinkeby.ts
```
## Verify on rinkeby
```sh
hh verify 0x8dbbd010B0B4B215C07feF16FEa9dA4Ea8e3FfA1 --contract contracts/QXS.sol:QXS --network rinkeby
```
## check for code and abi
https://rinkeby.etherscan.io/address/0x8dbbd010B0B4B215C07feF16FEa9dA4Ea8e3FfA1#code