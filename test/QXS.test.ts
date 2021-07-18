import { ethers } from "hardhat";
import chai from "chai";
import { QXS__factory, QXS } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

const { expect } = chai;

let qxs: QXS;
let qxsFactory: QXS__factory;
let deployer: SignerWithAddress;
let other: SignerWithAddress;

const PROXY_REGISTRATION_ADDRESS = "0xf57b2c51ded3a29e6891aba85459d600256cf317";
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

describe("qxs", () => {

    beforeEach(async () => {
        [deployer, other] = await ethers.getSigners();
        qxsFactory = (await ethers.getContractFactory(
            'QXS',
            deployer
        )) as QXS__factory;

        qxs = (await qxsFactory.deploy(PROXY_REGISTRATION_ADDRESS)) as QXS;
        expect(qxs.address).to.properAddress;
    });

    describe("deployment", async () => {
        it('deployer is owner', async () => {
            expect(await qxs.owner()).to.equal(deployer.address);
        });

        it("has expected name and symbol", async function () {
            expect(await qxs.name()).to.equal("QXSs");
            expect(await qxs.symbol()).to.equal("QXS");
        });
    });

    describe("minting", async () => {
        it('contract owner can mint tokens', async () => {
            const tokenId = ethers.BigNumber.from(0);
            const tokenURI = "https://eth.iwahi.com/1df0";

            await expect(qxs.connect(deployer).safeMint(other.address, tokenURI))
                .to.emit(qxs, 'Transfer')
                .withArgs(ZERO_ADDRESS, other.address, tokenId);

            expect(await qxs.balanceOf(other.address)).to.equal(1);
            expect(await qxs.ownerOf(tokenId)).to.equal(other.address);
            expect(await qxs.tokenURI(tokenId)).to.equal(tokenURI);
        });

        it('other accounts cannot mint tokens', async () => {
            const tokenURI = "https://eth.iwahi.com/2d3a";
            await expect(qxs.connect(other).safeMint(other.address, tokenURI))
                .to.be.revertedWith('Ownable: caller is not the owner');
        });
    });

    describe("burning", async () => {
        it('holders can burn their tokens', async () => {
            const tokenId = ethers.BigNumber.from(0);
            const tokenURI = "https://eth.iwahi.com/e01b";

            await expect(qxs.connect(deployer).safeMint(other.address, tokenURI))
                .to.emit(qxs, 'Transfer')
                .withArgs(ZERO_ADDRESS, other.address, tokenId);

            await expect(qxs.connect(other).burn(tokenId))
                .to.emit(qxs, 'Transfer')
                .withArgs(other.address, ZERO_ADDRESS, tokenId);
            expect(await qxs.balanceOf(other.address)).to.equal(0);
            await expect(qxs.ownerOf(tokenId))
                .to.be.revertedWith('ERC721: owner query for nonexistent token');
            expect(await qxs.totalSupply()).to.equal(0);
        });

        it('cannot burn if not token owner', async () => {
            const tokenId = ethers.BigNumber.from(0);
            const tokenURI = "https://eth.iwahi.com/e01b";

            await expect(qxs.connect(deployer).safeMint(other.address, tokenURI))
                .to.emit(qxs, 'Transfer')
                .withArgs(ZERO_ADDRESS, other.address, tokenId);

            await expect(qxs.connect(deployer).burn(tokenId))
                .to.be.revertedWith('function call to a non-contract account');

            expect(await qxs.balanceOf(other.address)).to.equal(1);
            expect(await qxs.totalSupply()).to.equal(1);
        });
    });
});


