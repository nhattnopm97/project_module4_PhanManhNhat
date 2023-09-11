const express = require("express");
const router = express.Router();
const database = require("../utils/database");

router.get("/", async (req, res) => {
  try {
    let data = await database.execute("SELECT * FROM zingmp3.song");
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
router.get("/desc", async (req, res) => {
  try {
    const data = await database.execute(
      "SELECT * FROM zingmp3.song ORDER BY listens DESC"
    );
    const song = data[0];
    res.json({
      status: 200,
      song,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Lỗi server!" });
  }
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let data = await database.execute(
      `SELECT * FROM zingmp3.song WHERE id = ${id}`
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

module.exports = router;
