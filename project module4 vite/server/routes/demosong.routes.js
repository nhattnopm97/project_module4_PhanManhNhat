const express = require("express");
const router = express.Router();
const database = require("../utils/database");

router.get("/", async (req, res) => {
  try {
    let data = await database.execute("SELECT * FROM zingmp3.demosong");
    let [song] = data;
    res.json({
      status: 200,
      song,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: "Lỗi server!" });
  }
});

router.post("/", async (req, res) => {
  let { link, name, singger, user_id } = req.body;
  try {
    let data = await database.execute(
      "INSERT INTO demosong (name, singger, link, user_id) VALUES (?, ?, ?, ?)",
      [name, singger, link, user_id]
    );
    console.log(data);
    res.json({
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: "Lỗi server!" });
  }
});

router.get("/desc", async (req, res) => {
  try {
    let data = await database.execute(
      "SELECT * FROM zingmp3.song ORDER BY listens DESC"
    );
    let [song] = data;
    res.json({
      status: 200,
      song,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: "Lỗi server!" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let data = await database.execute(`DELETE FROM demosong WHERE (id = ?)`, [
      id,
    ]);
    res.json({
      status: 200,
      message: "delete oke man",
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: "Lỗi server!" });
  }
});

module.exports = router;
