// import { HardhatUserConfig } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox";

// const config: HardhatUserConfig = {
//   solidity: "0.8.17",
// };

// export default config;
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";

module.exports = {
  solidity:"0.8.0",
  networks:{
    goerli:{
      url: "https://eth-goerli.g.alchemy.com/v2/BWDOdDz1Gr4RLQRWo4L2oUNr3efm3Zam",
      accounts:[ 'cd8945d3b469bbc14b82f7eda6667376feef7cd4487547e9dd4d717bafa5552f' ]
    }
  }
};

// 