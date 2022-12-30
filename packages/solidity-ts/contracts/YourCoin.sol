pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract YourCoin is ERC20 {
  constructor() ERC20("YourCoin", "YCOIN") {
    _mint(msg.sender, 1000000000000000000000000);
  }
}
