const Web3 = require("web3");
const { predeploys } = require("@eth-optimism/contracts");
const L2StandardTokenABI = require('./abi.json');

const l2RpcUrl = "https://goerli.optimism.io"; // Optimism Goerli RPC URL
const web3 = new Web3(l2RpcUrl);
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

const l2StandardBridgeAddress = predeploys.L2StandardBridge;
const l2StandardBridgeContract = new web3.eth.Contract(L2StandardTokenABI, l2StandardBridgeAddress);

async function mine(req, res) {
    const recipient = req.body.address;
  
    try {
      web3.utils.toChecksumAddress(recipient);
  
      const value = web3.utils.toWei("0.01", "ether"); // Amount to send
      const gasLimit = 1000000;
  
      const tx = {
        from: web3.eth.defaultAccount,
        to: l2StandardBridgeAddress,
        data: l2StandardBridgeContract.methods.withdraw(recipient, value, 0).encodeABI(),
        gasLimit: web3.utils.toHex(gasLimit),
      };
  
      const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY);
      const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
      res.json({ message: `Transaction sent: ${txReceipt.transactionHash}` });
    } catch (error) {
      console.log(error.message)
      res.status(400).json({ message: "Invalid address" });
    }
}
  

module.exports = {
    mine
};