const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');


exports.transaction = async (req, res) => {
    const { sender_upi_id, receiver_upi_id, amount } = req.body;

    
    const sender = await User.findOne({ upi_id: sender_upi_id });
    const receiver = await User.findOne({ upi_id: receiver_upi_id });

    if (!sender || !receiver) {
        return res.status(404).json({ message: 'Sender or Receiver not found' });
    }

    if (sender.balance < amount) {
        return res.status(400).json({ message: 'Insufficient balance' });
    }

    
    sender.balance -= amount;
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
