import express from "express";
import dotenv from "dotenv";
import stripe from "stripe";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./connectDB.js";
import authRouter from './Routes/auth.js';
const app = express();
dotenv.config();
export const stripe_handler = stripe("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");



 
connectDB();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(cors());

app.use('/auth', authRouter);

app.get("/", (req, res) => {
  res.send("SERVER RUNNING")
});

/*app.post("/subscription", cors(), async (req, res) => {
    let {customer, id} = req.body;
    try{
      const subscription = await stripe_handler.subscriptions.create({
        customer,
        items: [{price: id}],
        payment_behavior: 'default_incomplete',
        payment_settings: {
            payment_method_types: ['us_bank_account']
        },
        expand: ['latest_invoice.payment_intent']
      });
      res.send(subscription);
    }catch (err){
        console.log({"Error": err})
		res.json({
			message: "Payment failed",
			success: false
		})
    }
})*/

app.post('/create-subscription', async (req, res) => {
  const {priceId, customerId} = req.body;
console.log(priceId, customerId);
  try {
    const subscription = await stripe_handler.subscriptions.create({
      customer: customerId.id,
      items: [{
        price: priceId
      }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription',
     payment_method_options: {
      us_bank_account: {
        financial_connections: {
          permissions: ['payment_method', 'balances', 'ownership'],
          prefetch: ['balances']
        }
      }
     }},
      expand: ['latest_invoice.payment_intent'],
     
    });
console.log(subscription);
  const paymentIntent = await stripe_handler.paymentIntents.retrieve(
    subscription.latest_invoice.payment_intent.id, {
      expand: ['payment_method']
    }
  );



      res.json({
        type: 'payment',
        clientSecret: paymentIntent.client_secret,
      });
   

  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: { message: error.message } });
  }
});

mongoose.connection.once("open", () => {
  app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });
})