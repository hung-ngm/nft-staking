import { DeployFunction } from 'hardhat-deploy/types';
import { THardhatRuntimeEnvironmentExtended } from 'helpers/types/THardhatRuntimeEnvironmentExtended';

const func: DeployFunction = async (hre: THardhatRuntimeEnvironmentExtended) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log('Deployer: ', deployer);
  const nftContractAddress = '0x9c57FBc8362309851816382DFc8b06c48607ed11';
  const yourCoinContractAddress = '0x565c45f8E0011AFb3c6E76c46D04fa45dD3Ef674';
  const rewardWallet = '0xA63E675e404791E9C700a7af529D82Ad84d8177C';
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
