const express = require("express");
const { userAuth } = require("../middlewares/auth");
const razorpayInstance = require("../utils/razorpay");
const paymentRouter = express.Router();
const Payment = require("../models/payment");
const { membershipAmount } = require("../utils/constants");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;
    console.log(membershipAmount);
    const { firstName, lastName, emailId } = req.user;
    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType: membershipType,
      },
    });
    console.log(order);

    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();

    res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = paymentRouter;
