const hre = require("hardhat");

const ENDPOINTS = {
  sepolia: "0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675",
  polygonMumbai: "0x0A3F013E5a3C2D9FBD68E015c09956E89879B192",
  coretestnet: "0xBd3fa81B58Ba92a82136038B25aDec7066af3155",
};

async function main() {
  const network = hre.network.name;
  const [deployer] = await hre.ethers.getSigners();

  const NAME = "OmnichainNFT";
  const SYMBOL = "OMNI";
  const MIN_GAS_TO_TRANSFER = 350000;
  const LZ_ENDPOINT = ENDPOINTS[network];

  const OmnichainNFT = await hre.ethers.getContractFactory("OmnichainNFT");
  const contract = await OmnichainNFT.deploy(NAME, SYMBOL, MIN_GAS_TO_TRANSFER, LZ_ENDPOINT);
  await contract.deployed();

  console.log(`Deployed OmnichainNFT on ${network} at:`, contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
