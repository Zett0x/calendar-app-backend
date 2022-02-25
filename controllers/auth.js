const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user-model");
const { generateJWT } = require("../utils/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });

  try {
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "User already exists with that email",
      });
    }
    user = new User(req.body);
    //encriptar contraseña
    const salt = bcrypt.genSaltSync(15);
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    //generar JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please contact with the administrator",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  try {
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "email or password incorrect",
      });
    }

    //Confirmar los password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "email or password incorrect",
      });
    }

    //Generar nuestro JWT
    const token = await generateJWT(user.id, user.name);
    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please contact with the administrator",
    });
  }
};

const renewToken = async (req, res = response) => {
  const { uid, name } = req;

  // generar un nuevo JWT y retornarle en esta peticion
  const token = await generateJWT(uid, name);
  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
