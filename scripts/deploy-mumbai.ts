import { ethers } from "hardhat";
import { QXS__factory, QXS } from "../typechain";
// run:
// hh run --network matic scripts/deploy-mumbai.ts
// https://explorer-mumbai.maticvigil.com/address/<contract address>
const MUMBAI_PRIVATE_KEY = process.env.MUMBAI_PRIVATE_KEY || '';

const URL = 'https://rpc-mumbai.maticvigil.com';
console.log(`url: ${URL}`);

let qxs: QXS;
let qxsFactory: QXS__factory;

const PROXY_REGISTRATION_ADDRESS = '0xf57b2c51ded3a29e6891aba85459d600256cf317';

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(URL);
  const deployer = new ethers.Wallet(MUMBAI_PRIVATE_KEY, provider);
  const address = await deployer.getAddress();
  console.log(`deployer address: ${address}`);

  qxsFactory = (await ethers.getContractFactory(
    'QXS',
    deployer
  )) as QXS__factory;

  qxs = (await qxsFactory.deploy(PROXY_REGISTRATION_ADDRESS)) as QXS;
  console.log("deployed to:", qxs.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
