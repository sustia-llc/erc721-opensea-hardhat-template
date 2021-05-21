import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { QXS__factory, QXS } from "../typechain";

let qxs: QXS;
let qxsFactory: QXS__factory;
let deployer: SignerWithAddress;

const name = 'QXS ERC721 minter';
const symbol = 'QXS';
const PROXY_REGISTRATION_ADDRESS = '0xf57b2c51ded3a29e6891aba85459d600256cf317';

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
