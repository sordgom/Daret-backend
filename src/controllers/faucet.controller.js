const ethers = require('ethers');
const faucet = require('./faucet');

/**To address the timeout issue, you can still consider implementing asynchronous processing. 
You can return a response to the user immediately, informing them that their transaction is being processed, and then handle the actual transaction in the background.
*/
const mine = async (req, res) => {
  try {
    const { address } = req.body;

    if (!address || !ethers.utils.isAddress(address)) {
      return res.status(400).json({ message: 'Invalid address provided.' });
    }

    const amount = 5n * 10n ** 15n; // 0.005 ETH in wei

    const transactionHash = await faucet.depositETH(amount, address);

    // Process the transaction asynchronously
    faucet.processDeposit(transactionHash).catch((error) => {
      console.error('Error processing deposit:', error);
    });

    return res.status(200).json({
      message: 'Funds are being sent. Please wait for the transaction to complete.',
      transactionHash,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while sending funds.' });
  }
};

module.exports = {
    mine
};