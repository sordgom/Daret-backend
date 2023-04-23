const ethers = require('ethers');
const faucet = require('./faucet');

const mine = async (req, res) => {
  try {
    const { address } = req.body;

    if (!address || !ethers.utils.isAddress(address)) {
      return res.status(400).json({ message: 'Invalid address provided.' });
    }

    const amount = 5n * 10n ** 15n; // 0.005 ETH in wei

    const transaction = await faucet.depositETH(amount, address);

    return res.status(200).json({
      message: 'Funds sent successfully.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while sending funds.' });
  }
};

module.exports = {
    mine
};