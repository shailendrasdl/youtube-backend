const { stripe_Publishable_key, stripe_secret_key } = process.env;

import Stripe from "stripe";
import { asyncHandler } from "../../../utils/asyncHandler.js";
const stripe = new Stripe(stripe_secret_key);

export const createCustomer = asyncHandler(async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      name: req.body.name,
      email: req.body.email,
    });
    res.status(200).send(customer);
  } catch (error) {
    console.log(
      "error",
      "try-catch: add create-customer controller failed.",
      error
    );
    return res.json(error);
  }
});

export const addNewCard = asyncHandler(async (req, res) => {
  try {
    const {
      customer_id,
      card_Name,
      card_ExpYear,
      card_ExpMonth,
      card_Number,
      card_CVC,
    } = req.body;

    const card_token = await stripe.tokens.create({
      card: {
        name: card_Name,
        number: card_Number,
        exp_year: card_ExpYear,
        exp_month: card_ExpMonth,
        cvc: card_CVC,
      },
    });

    const card = await stripe.customers.createSource(customer_id, {
      source: `${card_token.id}`,
    });

    res.status(200).send({ card: card.id });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});
/*
export const addNewCard = asyncHandler(async (req, res) => {
  try {
    let {
      customer_id,
      card_name,
      card_ExpYear,
      card_ExpMonth,
      card_number,
      card_cvc,
    } = req.body;

    const card_token = await stripe.tokens.create({
      card: {
        name: card_name,
        number: card_number,
        exp_year: card_ExpYear,
        exp_month: card_ExpMonth,
        cvc: card_cvc,
      },
    });
    const card = await stripe.customers.createSource(customer_id, {
      source: `${card_token.id}`,
    });
    console.log("card :", card);
    res.status(200).send(card);
  } catch (error) {
    console.log("error", "try-catch:  add-New-Card controller failed.", error);
    return res.json(error);
  }
});
*/
export const createCharges = asyncHandler(async (req, res) => {
  try {
    const createCharge = await stripe.charges.create({
      receipt_email: "shailendrakumarsen@gmail.com",
      amount: parseInt(req.body.amount) * 100,
      currency: "INR",
      card: req.body.card_id,
      customer_id: req.body.customer_id,
    });
    res.status(200).send(createCharge);
  } catch (error) {
    console.log(
      "error",
      "try-catch:  create-charges controller failed.",
      error
    );
    return res.json(error);
  }
});
