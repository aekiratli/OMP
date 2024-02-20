// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("OMP", function () {
//     async function deployOMPwithFutureStartTime() {
//         const OMP = await ethers.getContractFactory("OMP");
//         const startTimestamp = 1000000000000000;
//         const maxSupply = 10000;
//         const name = "OMP Token";
//         const symbol = "OMP";
//         const omp = await OMP.deploy(name, symbol, maxSupply, startTimestamp);
//         const [owner, otherAccount] = await ethers.getSigners();
//         return { omp, owner, otherAccount, maxSupply, startTimestamp };
//     }

//     async function deployOMPwithPastStartTime() {
//         const OMP = await ethers.getContractFactory("OMP");
//         const startTimestamp = 0;
//         const maxSupply = 10000;
//         const name = "OMP Token";
//         const symbol = "OMP";
//         const omp = await OMP.deploy(name, symbol, maxSupply, startTimestamp);
//         const [owner, otherAccount] = await ethers.getSigners();
//         return { omp, owner, otherAccount, maxSupply, startTimestamp };
//     }

//     describe("Deployment", function () {
//         it("Should set the right name", async function () {
//             const { omp } = await deployOMPwithPastStartTime();
//             expect(await omp.name()).to.equal("OMP Token");
//         });

//         it("Should set the right symbol", async function () {
//             const { omp } = await deployOMPwithPastStartTime();
//             expect(await omp.symbol()).to.equal("OMP");
//         });

//         it("Should set the right maxSupply", async function () {
//             const { omp, maxSupply } = await deployOMPwithPastStartTime();
//             expect(await omp.getMaxSupply()).to.equal(maxSupply);
//         });
//     });

//     describe("Minting", function () {
//         it("Should mint the right amount", async function () {
//             const { omp, owner } = await deployOMPwithPastStartTime();
//             const amount = 500;
//             await omp.mint(amount);
//             expect(await omp.balanceOf(owner)).to.equal(amount);
//         });

//         it("Should fail if the amount is too high", async function () {
//             const { omp, maxSupply } = await deployOMPwithPastStartTime();
//             const chunkAmount = 1000;
//             // mint max supply with for loops using chunkAmount
//             for (let i = 0; i < maxSupply / chunkAmount; i++) {
//                 await omp.mint(chunkAmount);
//             }
//             // mint the remaining amount
//             await expect(omp.mint(1)).to.be.revertedWith("Exceeds max supply");
//         });

//         it("Should fail if startTimestamp is in the future", async function () {
//             const { omp } = await deployOMPwithFutureStartTime();
//             await expect(omp.mint(1000)).to.be.revertedWith("Minting has not started yet");
//         });
//     });



// });