import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { QXS__factory, QXS } from "../typechain";

let qxs: QXS;
let qxsFactory: QXS__factory;
let deployer: SignerWithAddress;

const PROXY_REGISTRATION_ADDRESS = '0xa5409ec958c83c3f309868babaca7c86dcb077c1';

async function main() {
  [deployer] = await ethers.getSigners();
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
