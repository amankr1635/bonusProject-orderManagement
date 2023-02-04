const customerModel = require("../models/customerModels");

const create = async function(req,res){
   try{
    let body = req.body
    if(Object.keys(body).length==0){
        return res.status(400).send({status: false , message: "please enter some data in body"})
    }

    let createuser = await customerModel.create({body})
    res.status(201).send({status: true, data: createuser})
}catch(err){

    return res.status(500).send({status: false, message: err.message})
}
}

module.exports = {create}