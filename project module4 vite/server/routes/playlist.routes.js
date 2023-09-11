const express = require("express");
const router = express.Router();
const database = require("../utils/database");

router.get("/", async (req, res) => {
  try {
    let data = await database.execute("SELECT * FROM zingmp3.playllist");
    let [playlist] = data;
    res.json({
      status: 200,
      message: "success",
      playlist,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: "Lỗi server!" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let data = await database.execute(
      `SELECT * FROM playllist WHERE id = ${id}`
    );
    let [playlist] = data;
    res.json({
      status: 200,
      playlist: playlist[0],
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: "Lỗi server!" });
  }
});

module.exports = router;
