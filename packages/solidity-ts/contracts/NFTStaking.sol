pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract NFTStaking is Context, IERC721Receiver {
  IERC721 public nft;
  IERC20 public rewardToken;
  address public rewardWallet;
  uint256 public rewardPerTokenPerDay;

  mapping(uint256 => address) private stakedTokens;
  mapping(address => uint256) public balanceOf;
  mapping(address => uint256) public lastUpdateTime;
  mapping(address => uint256) private reward;

  constructor(
    address nftAddress,
    address rewardTokenAddress,
    address rewardWalletAddress,
    uint256 rewardRate
  ) {
    nft = IERC721(nftAddress);
    rewardToken = IERC20(rewardTokenAddress);
    rewardWallet = rewardWalletAddress;
    rewardPerTokenPerDay = rewardRate;
  }

  modifier update(address account) {
    reward[account] = available(account);
    lastUpdateTime[account] = block.timestamp;
    _;
  }

  function available(address account) public view returns (uint256) {
    uint256 timeElapsed = block.timestamp - lastUpdateTime[account];
    uint256 earned = (balanceOf[account] * timeElapsed * rewardPerTokenPerDay) / 86400;
    return reward[account] + earned;
  }

  function stake(uint256 tokenId) external {
    nft.safeTransferFrom(_msgSender(), address(this), tokenId);
  }

  function withdraw(uint256 tokenId) external update(_msgSender()) {
    require(stakedTokens[tokenId] == _msgSender(), "Token is not staked.");
    delete stakedTokens[tokenId];
    balanceOf[_msgSender()]--;
    nft.transferFrom(address(this), _msgSender(), tokenId);
  }

  function redeem() external update(_msgSender()) {
    uint256 amount = reward[_msgSender()];
    require(amount > 0, "Nothing to redeem");
    reward[_msgSender()] = 0;
    rewardToken.transferFrom(rewardWallet, _msgSender(), amount);
  }

  function onERC721Received(
    address,
    address from,
    uint256 tokenId,
    bytes calldata
  ) external update(from) returns (bytes4) {
    stakedTokens[tokenId] = from;
    balanceOf[from]++;
    return IERC721Receiver.onERC721Received.selector;
  }
}
