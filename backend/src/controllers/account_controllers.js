const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require('express');



module.exports.register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      type,
      avatar,
    } = req.body;
    console.log(req.body)
    if (!(name && email && password && confirmPassword)) {
      return res.status(400).send("Email and password needed");
    }
    //0 student 1 mentor 2 admin
    if (!(type === 0 || type === 1 || type === 2)) {

      return res
        .status(400)
        .send("You can only register as student or mentor or admin");
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User already exists");
    } else if (password != confirmPassword) {
      return res.status(422).send({ error: "Password not matching" })
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name,
      email: email,
      password: encryptedPassword,
      isEmailVerified: true,
      type: type,
      avatar: avatar,
      isActive: false,
      isDelete: false,
      createdOn: Date.now().toString(),
      updatedOn: Date.now().toString(),
      token: "",
      tokenExpiresOn: "",
    });
    const token = jwt.sign(
      { user: { user_id: user._id, email } },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );
    user.token = token;
    res.cookie("xauthtoken", token);
    (user.tokenExpiresIn = "1h"), await user.save();
    await res.status(200).json(user);
  } catch (e) {
    await res.status(400).send(e.toString());
  }
};


module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res.status(400).send("All inputs are required");
    }
    const user = await User.findOne({ email });
    //check if user mail is not verified, if not verified send a verification mail

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token

      const token = jwt.sign(
        { user: { user_id: user._id, email } },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );

      // save user token
      user.token = token;
      await user.save();
      // user
      res.cookie('xauthtoken', token, { httpOnly: true })
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentialjhs");
  } catch (e) {
    await res.status(400).send(e.toString());
  }
};

module.exports.isValidToken = (req, res, next) => {
  if (!req.user) {
    return res.status(400).send("Invalid Token");
  }
  return res.status(200).send("Valid Token");
};
module.exports.resetPassword = async (req, res, next) => {
  try {
    const user_id = req.user.user_id;
    const { new_password } = req.body;
    let user = await User.findById(user_id);
    if (!user) {
      res.status(400).send("No such User exists");
    }
    user.password = await bcrypt.hash(new_password, 10);
    const payload = {
      user: req.user,
    };
    const token = await jwt.sign(payload, process.env.TOKEN_KEY);
    user.token = token;
    await user.save();
    res.cookie("xauthtoken", token);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).send(e.toString());
  }
};


module.exports.refreshAccessToken = async (req, res, next) => {
  try {
    const user_id = req.user.user_id;
    let user = await User.findById(user_id);
    if (!user) {
      res.status(400).send("No such User exists");
    }
    const payload = {
      user: req.user,
    };
    const token = await jwt.sign(payload, process.env.TOKEN_KEY);
    res.cookie("xauthtoken", token);
    return res.status(200).send("Token Refreshed");
  } catch (err) {
    return res.status(400).send(e.toString());
  }
};


module.exports.verifyEmail = async (req, res, next) => {
  try {
    const user_id = req.user.user_id;
    let user = await User.findById(user_id);
    if (!user) {
      res.status(400).send("No such User exists");
    }
    user.isEmailVerified = true;
    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).send(e.toString());
  }
};