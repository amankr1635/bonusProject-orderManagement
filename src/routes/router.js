const express = require("express");
const router = express.Router()
const { createCustomer, } = require("../constrollers/controllers");
const { createOrder } = require("../constrollers/orderController");

router.get("/test-me", async function(req,res){
    res.status(200).send({status: true, message:"my first api"})
})

router.post("/register", createCustomer),

router.post("/order", createOrder)


module.exports =router