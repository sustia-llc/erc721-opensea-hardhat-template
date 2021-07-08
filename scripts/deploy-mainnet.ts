import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { QXS__factory, QXS } from "../typechain";

const INFURA_API_KEY = process.env.INFURA_API_KEY || '';
const MAINNET_PRIVATE_KEY = process.env.MAINNET_PRIVATE_KEY || '';

const URL = `https://mainnet.infura.io/v3/${INFURA_API_KEY}`;
console.log(`url: ${URL}`);

let qxs: QXS;
let qxsFactory: QXS__factory;

const PROXY_REGISTRATION_ADDRESS = '0xa5409ec958c83c3f309868babaca7c86dcb077c1';

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(URL);
    const deployer = new ethers.Wallet(MAINNET_PRIVATE_KEY, provider);
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
