const { expect } = require("chai");
const { ethers, upgrades, waffle } = require("hardhat");

describe("SwapLite", function () {
  let owner, user, swapLite;
  beforeEach(async function () {
    [owner, user, swapLite] = await ethers.getSigners();
    const SwapLite = await ethers.getContractFactory("SwapLite");
    this.SwapLite = await SwapLite.deploy(
      swapLite.address
      // "GOLDToken",
      // "GOLD"
    );
  }, 5000);

  describe("Test contructor", () => {
    it("Should initialize data", async function () {
      expect(await this.SwapLite.decimals()).to.equal(8);
      expect(
        (await this.SwapLite.balanceOf(swapLite.address)).toString()
      ).to.equal("100000000000000000");
    });
  });

  describe("Test mint", () => {
    it("Should mint token", async function () {
      const mintAmount = ethers.BigNumber.from("123456");
      await this.SwapLite.connect(owner).mintTo(user.address, mintAmount);

      const userBalance = await this.SwapLite.balanceOf(user.address);
      expect(userBalance.toString()).to.equal(mintAmount.toString());
    });

    it("Should throw if caller is not the owner", async function () {
      const mintAmount = ethers.BigNumber.from("123456");
      await expect(
        this.SwapLite.connect(user).mintTo(user.address, mintAmount)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});
