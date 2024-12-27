
const mongoose = require('mongoose');


const transactionSchema = new mongoose.Schema({
    sender_upi_id: {
        type: String,
        required: true
    },
    receiver_upi_id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

exports.transaction = async (req, res) => {
    const { sender_upi_id, receiver_upi_id, amount } = req.body;

    // Validate amount
    if (amount <= 0) {
        return res.status(400).json({ message: 'Amount should be greater than zero' });
    }
    if (amount > 50000) {
        return res.status(400).json({ message: 'Transaction amount exceeds the limit' });
    }

    // Transaction fee (e.g., 0.5%)
    const transactionFee = 0.005;
    const fee = amount * transactionFee;

    // Find sender and receiver users
    const sender = await User.findOne({ upi_id: sender_upi_id });
    const receiver = await User.findOne({ upi_id: receiver_upi_id });

    if (!sender || !receiver) {
        return res.status(404).json({ message: 'Sender or Receiver not found' });
    }

    if (sender.balance < amount + fee) {
        return res.status(400).json({ message: 'Insufficient balance, including fee' });
    }

    // Deduct fee from sender
    sender.balance -= (amount + fee);
    receiver.balance += amount;

    const transaction = new Transaction({
        sender_upi_id,
        receiver_upi_id,
        amount
    });

    try {
        await sender.save();
        await receiver.save();
        await transaction.save();
        res.status(200).json({ message: 'Transaction successful' });
    } catch (error) {
        res.status(500).json({ message: 'Transaction failed', error });
    }
};


const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
