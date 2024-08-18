const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { sendEmailReceipt} = require('../utils/emailUtils');
const { sendSmsReceipt} = require('../utils/smsUtils');

const app = express();
app.use(bodyParser.json());

require('../models/payment');
const Payment = mongoose.model('Payment');



const router = express.Router();
const stripe = require('stripe')('sk_test_51PoAoaB44XaxZNEmptwD5XsZKAZxcF6pa28y2QEHqAG5SFHnxITt8gHgDGPneF5iVXd3KxoKFlLW472HVxsWkVET00vhGVdzx2'); // Replace with your actual secret key

router.get('/status', async (req, res) => {
    const { studentID, year, month, classType } = req.query;

    try {
        const payment = await Payment.findOne({ studentID });

        if (payment) {
            const paymentRecord = payment.payments.find(p => p.year === parseInt(year) && p.month === month && p.classType === classType);
            if (paymentRecord) {
                return res.json({ status: paymentRecord.status });
            }
        }

        res.json({ status: 'Not Paid' });
    } catch (error) {
        console.error('Error fetching payment status:', error);
        res.status(500).send('Server error');
    }
});


// Make a payment
router.post('/make', async (req, res) => {
    const { studentID, year, month, classType, email, phone } = req.body;

    try {
        let payment = await Payment.findOne({ studentID });

        if (!payment) {
            payment = new Payment({ studentID, payments: [] });
        }

        const existingPayment = payment.payments.find(p => p.year === parseInt(year) && p.month === month && p.classType === classType);
        if (existingPayment) {
            existingPayment.status = 'Paid';
        } else {
            payment.payments.push({ year: parseInt(year), month, classType, status: 'Paid' });
        }

        await payment.save();

        // Sending Email and SMS Receipts
        const emailSubject = 'Payment Receipt';
        const emailText = `Dear user,\n\nThank you for your payment of ${classType} for the month of ${month}, ${year}.\n\nRegards,\nYour Company`;
        sendEmailReceipt(email, emailSubject, emailText);

        const smsMessage = `Thank you for your payment of ${classType} for ${month}, ${year}.`;
        sendSmsReceipt(phone, smsMessage);

        res.json({ success: true });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).send('Server error');
    }
});


router.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'lkr', // Changed to LKR (Sri Lankan Rupees)
            payment_method_types: ['card'],
        });
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).send('Server error');
    }
});



module.exports = router;