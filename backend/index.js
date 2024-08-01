const express = require("express");
const cors = require("cors");
const Moralis = require("moralis").default;
require("dotenv").config();
const app = express();
const port = 3000;

app.use(cors());

app.get("/getBalance", async (req, res) => {

    const { query } = req;

    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
        address: query.address,
        chain: "97",
        tokenAddresses: ["0x337610d27c682e347c9cd60bd4b3b107c9d34ddd"]
    })


    const bal = response.raw[0]?.balance / 1E18;

    if(bal){
        res.send({balance: bal.toFixed(2)});
    }else{
        res.send({balance: "0.00"})
    }
  
});

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for reqs`);
  });
});