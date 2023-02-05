const customerModel = require("../models/customerModels");
const mongoose = require("mongoose");
const {
  isValidName,
  isValidNo,
  isValidEmail,
} = require("../validations/validations");
const orderModel = require("../models/orderModel");

const createCustomer = async function (req, res) {
  try {
    let body = req.body;
    if (Object.keys(body).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "please enter some data in body" });
    }
    if (!body.title)
      return res
        .status(400)
        .send({ status: false, message: "please enter title key in body" });
    if (body.title != "MR" && body.title != "MISS" && body.title != "MRS") {
      return res
        .status(400)
        .send({
          status: false,
          message: "please enter among these 'MR', 'MISS', 'MRS'",
        });
    }
    if (!body.name)
      return res
        .status(400)
        .send({ status: false, message: "please enter name key in body" });
    body.name = body.name.trim();
    if (body.name == "") {
      return res
        .status(400)
        .send({ status: false, message: "name can't be empty" });
    }
    if (!isValidName(body.name))
      return res
        .status(400)
        .send({ status: false, message: "Name must contains alphabates only" });
    if (!body.phone)
      return res
        .status(400)
        .send({ status: false, message: "please enter phone key in body" });
    body.phone = body.phone.trim();
    if (body.phone == "") {
      return res
        .status(400)
        .send({ status: false, message: "phone can't be empty" });
    }
    if (!isValidNo(body.phone))
      return res
        .status(400)
        .send({ status: false, message: "please enter a valid phone no." });
    if (!body.email)
      return res
        .status(400)
        .send({ status: false, message: "please enter email key in body" });
    body.email = body.email.toLowerCase().trim();
    if (body.email == "")
      return res
        .status(400)
        .send({ status: false, message: "email can't be empty" });
    if (!isValidEmail(body.email))
      return res
        .status(400)
        .send({ status: false, message: "please enter valid email" });
    let checkUser = await customerModel.find({
      $or: [{ phone: body.phone }, { email: body.email }],
    }); 
    if (checkUser.length >= 1) {
      if (body.phone == checkUser[0].phone) {
        return res
          .status(400)
          .send({ status: false, message: "phone is already exist" });
      } else
        return res
          .status(400)
          .send({ status: false, message: "email is already exist" });
    }
    let createuser = await customerModel.create(body);
    res.status(201).send({ status: true, data: createuser });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};



module.exports = { createCustomer };
    