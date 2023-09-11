const express = require("express");
const router = express.Router();
const database = require("../utils/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isLogin } = require("../middleware/allValidate.middleware");

router.get("/", async (req, res) => {
  try {
    let data = await database.execute("SELECT * FROM zingmp3.user");
    let [users] = data;
    res.json({
      status: "success",
      users,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    let data = await database.execute(
      "SELECT * FROM zingmp3.user WHERE id = ?",
      [id]
    );
    let result = data[0];
  } catch (error) {
    console.log(error);
  }
  res.json({ message: "Hello world!" });
});

// Đăng ký
router.post("/register", async (req, res) => {
  let { name, email, password, repeatPassword, role, createDate, birthday } =
    req.body;
  try {
    let isEmail = await database.execute(
      "SELECT * FROM zingmp3.user WHERE email = ?",
      [email]
    );
    findEmail = isEmail[0];
    if (findEmail.length > 0) {
      return res
        .status(400)
        .json({ status: 400, message: "Email đã tồn tại!" });
    }
    const hash = await bcrypt.hash(password, 10);

    const query = `INSERT INTO zingmp3.user (name, password, email, createDate, role, birthday) 
        VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [name, hash, email, createDate, role, birthday];

    await database.execute(query, values);
    res.json({ message: "Đăng ký thành công!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

// Đăng nhập
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let isEmail = await database.execute(
      "SELECT * FROM zingmp3.user WHERE email = ?",
      [email]
    );
    findEmail = isEmail[0];
    if (findEmail && findEmail.length > 0) {
      if (findEmail[0].password) {
        let comparePass = await bcrypt.compare(password, findEmail[0].password);
        if (comparePass) {
          let token = jwt.sign(
            {
              email: findEmail[0].email,
              id: findEmail[0].id,
            },
            process.env.SECRET,
            {
              expiresIn: "1w",
            }
          );
          return res.status(200).json({
            status: 200,
            message: "Đăng nhập thành công",
            data: findEmail[0],
            token: token,
          });
        } else {
          res.json({
            status: 400,
            message: "Tài khoản hoặc mật khẩu không chính xác!",
          });
        }
      } else {
        return res
          .status(400)
          .json({ status: 400, message: "Mật khẩu không tồn tại!" });
      }
    } else {
      return res
        .status(400)
        .json({ status: 400, message: "Email không tồn tại!" });
    }
  } catch (error) {
    console.log("error", error);
  }
});

router.get("/:id", isLogin, async (req, res) => {
  const id = req.params.id;
  try {
    let data = await database.execute(
      "SELECT * FROM zingmp3.user WHERE id = ?",
      [id]
    );
    let [user] = data;
    res.json({
      status: "success",
      song,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: "Lỗi server!" });
  }
});

module.exports = router;
