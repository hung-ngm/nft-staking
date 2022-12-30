import { DeployFunction } from 'hardhat-deploy/types';
import { THardhatRuntimeEnvironmentExtended } from 'helpers/types/THardhatRuntimeEnvironmentExtended';

const func: DeployFunction = async (hre: THardhatRuntimeEnvironmentExtended) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log('Deployer: ', deployer);
  const nftContractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
  const yourCoinContractAddress = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';
  const rewardWallet = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
  const rewardRate = 10;
  await deploy('NFTStaking', {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [nftContractAddress, yourCoinContractAddress, rewardWallet, rewardRate],
    log: true,
  });

  /*
    // Getting a previously deployed contract
    const YourContract = await ethers.getContract("YourContract", deployer);
    await YourContract.setPurpose("Hello");

    //const yourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */
};
export default func;
func.tags = ['NFTStaking'];

/*
Tenderly verification
let verification = await tenderly.verify({
  name: contractName,
  address: contractAddress,
  network: targetNetwork,
});
*/
