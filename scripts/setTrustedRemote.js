const hre = require("hardhat");

const LZ_CHAIN_ID = {
  sepolia: 101,
  polygonMumbai: 10109,
};

const DEPLOYED = {
  sepolia: "YOUR_SEPOLIA_CONTRACT_ADDRESS",
  polygonMumbai: "YOUR_MUMBAI_CONTRACT_ADDRESS",
};

async function main() {
  const network = hre.network.name;
  const [deployer] = await hre.ethers.getSigners();

  const nft = await hre.ethers.getContractAt("OmnichainNFT", DEPLOYED[network]);

  const remoteChain = network === "sepolia" ? "polygonMumbai" : "sepolia";

  const remoteAddress = DEPLOYED[remoteChain];
  const remoteBytes = hre.ethers.utils.solidityPack(["address"], [remoteAddress]);

  const tx = await nft.setTrustedRemote(
    LZ_CHAIN_ID[remoteChain],
    hre.ethers.utils.solidityPack(["address", "address"], [remoteAddress, DEPLOYED[network]])
  );

  await tx.wait();
  console.log(`Trusted remote set from ${network} to ${remoteChain}`);
}

main();
