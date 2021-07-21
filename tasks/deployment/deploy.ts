import { task } from "hardhat/config";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { QXS__factory, QXS } from "../../typechain";
import { TASK_DEPLOY } from "../task-names";

//hh deploy --network hardhat|localhost|rinkeby|mainnet
task(TASK_DEPLOY, "Deploy contract")
  .setAction(async (args, hre) => {
    let deployer: SignerWithAddress;

    var PROXY_REGISTRATION_ADDRESS = '0xa5409ec958c83c3f309868babaca7c86dcb077c1';
    const network = await hre.ethers.provider.getNetwork();
    console.log(`network: ${network.name}`);
    
    if (network.name === "rinkeby") {
      console.log('using opensea registration address for rinkeby');
      PROXY_REGISTRATION_ADDRESS = '0xf57b2c51ded3a29e6891aba85459d600256cf317';
    }

    [deployer] = await hre.ethers.getSigners();
    const address = await deployer.getAddress();
    console.log(`deployer address: ${address}`);

    const qxsFactory = (await hre.ethers.getContractFactory(
      'QXS',
      deployer
    )) as QXS__factory;

    console.log('Deploying QXS...');
    const qxs = await qxsFactory.deploy(PROXY_REGISTRATION_ADDRESS);
    await qxs.deployed();

    console.log('QXS deployed to:', qxs.address);
  });

