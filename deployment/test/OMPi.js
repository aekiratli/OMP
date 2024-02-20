const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OMPi", function () {

    async function deployOMPi() {
        const OMPi = await ethers.getContractFactory("OMPi");
        const maxSupply = 1000000;
        const name = "OMPi Token";
        const symbol = "OMPi";
        const ompi = await OMPi.deploy(name, symbol, maxSupply);
        const [owner, otherAccount] = await ethers.getSigners();
        return { ompi, owner, otherAccount, maxSupply };
    }

    describe("Deployment", function () {
        it("Should set the right name", async function () {
            const { ompi } = await deployOMPi();
            expect(await ompi.name()).to.equal("OMPi Token");
        });

        it("Should set the right symbol", async function () {
            const { ompi } = await deployOMPi();
            expect(await ompi.symbol()).to.equal("OMPi");
        });
    });

    describe("Minting", function () {
        it("Should mint the right amount", async function () {
            const { ompi, maxSupply } = await deployOMPi();
            const [owner, otherAccount] = await ethers.getSigners();
            await ompi.preMint();
            expect(await ompi.totalSupply()).to.equal(maxSupply);
            // check balance of owner
            expect(await ompi.balanceOf(owner.address)).to.equal(maxSupply);
        });
    });

    describe("Purchase", function () {
        it ("Should allow purchase of OMPi", async function() {
            const { ompi, owner, otherAccount } = await deployOMPi();
            await ompi.preMint();
            const purchaseAmount = 100;
            // purchase usin g otherAccount
            await ompi.connect(otherAccount).purchase(purchaseAmount);
            expect(await ompi.balanceOf(otherAccount.address)).to.equal(purchaseAmount);
        });
    });
});