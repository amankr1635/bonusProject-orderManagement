const express = require("express");
const {create} = require("../constrollers/controllers")
const router = express.Router()

router.get("/test-me", async function(req,res){
    res.status(200).send({status: true, message:"my first api"})
})

router.post("/register", create)


module.exports =router