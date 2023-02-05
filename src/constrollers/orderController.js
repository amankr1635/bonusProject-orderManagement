const mongoose= require("mongoose")

const orderModel = require("../models/orderModel");
const customerModel = require("../models/customerModels");


const createOrder = async function(req,res){

  let body = req.body;

  if(Object.keys(body).length == 0){
    return res.status(400).send({status: false, message:"Please enter data in body"})
  }
  if(!body.title) return res.status(400).send({status: false, message:"Please enter title in body"})
  body.title = body.title.trim()
  if(body.title == "") return res.status(400).send({status: false, message:"Title can't be empty"})
  let titleCheck = await orderModel.findOne({title: body.title})
  if(titleCheck)return res.status(400).send({status: false, message: "title alreade taken"})
  if(!body.description) return res.status(400).send({status: false, message : "Please enter description in body"})
  body.description = body.description.trim()
  if(body.description == "") return res.status(400).send({status: false, message:  "description can't be empty"})
  if(!body.price) return res.status(400).send({status: false, message : "Please enter price in body"})
  if(!Number(body.price))return res.status(400).send({status: false, message : "Please enter price in number"})
  if(!body.customerId)return res.status(400).send({status: false, message : "Please enter customerId in body"})
  body.customerId = body.customerId.trim()
  if(body.customerId == "") return res.status(400).send({status: false, message : "customerId can't be empty"})
  if(!mongoose.isValidObjectId(body.customerId)) return res.status(400).send({status: false, message : "Please enter valid customerId"})

  let checkUser = await customerModel.findOne({_id: body.customerId})
  if(!checkUser) return res.status(400).send({status: false, mesasge: "user Not found"})

  let create  = await orderModel.create(body)

  let {noOfOrders, moneyBack} = checkUser

// let update 

if(noOfOrders<10){
    let remainingOrders = (9-noOfOrders)

    //  update = {_id:body.customerId},{$inc:{noOfOrders:1}}
 await customerModel.findOneAndUpdate( {_id:body.customerId},{$inc:{noOfOrders:1}})
return res.status(201).send({status:true,message:`Order placed, you are ${remainingOrders} orders behind to become a gold member and enjoying 10% discount`,orderDetails:create})

  }
if(noOfOrders>= 10 && noOfOrders <20){
    let remainingOrders = (19-noOfOrders)
    moneyBack = moneyBack+(body.price*10/100)
//   update = {_id:body.customerId},{$set:{moneyBack:moneyBack,category:"gold"}}
    await customerModel.findOneAndUpdate({_id:body.customerId},{$set:{moneyBack:moneyBack,category:"gold"},$inc:{noOfOrders:1}})
    return res.status(201).send({status:true,message:`Order placed, you are ${remainingOrders} orders behind to become a platinum member and enjoying 10% discount`,orderDetails:create})

}
if(noOfOrders>=20){
    moneyBack = moneyBack+(body.price*20/100)
    // update = {_id:body.customerId},{$set:{moneyBack:moneyBack,category:"platinum"},$inc:{numberOfOrders:1}}
    moneyBack = moneyBack+(body.price*20/100)
await customerModel.findOneAndUpdate({_id:body.customerId},{$set:{moneyBack:moneyBack,category:"platinum"},$inc:{noOfOrders:1}})
  return res.status(201).send({status:true,message:`20% discount credited to your account`,orderDetails:create})

}
//  await customerModel.findOneAndUpdate({update,$inc: {noOfOrders: 1}})
//  return res.status(201).send({status: true , msg :" created", orders: create})
}
module.exports = {createOrder}


