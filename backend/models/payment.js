const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    studentID: { type: String, required: true },
    payments: [{
        year: { type: Number, required: true },
        month: { type: String, required: true },
        classType: { type: String, required: true },
        status: { type: String, default: 'Not Paid' }
    }]
});

module.exports = mongoose.model('Payment', paymentSchema);
