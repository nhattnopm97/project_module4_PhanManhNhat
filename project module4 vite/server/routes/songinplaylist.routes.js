const express = require("express");
const router = express.Router();
const database = require("../utils/database");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    let data = await database.execute(
      "SELECT s.id, s.name, s.singger, s.link, s.img, s.listens FROM song_in_playlist AS p JOIN song AS s ON p.song_id = s.id WHERE p.playlist_id = ?",
      [id]
    );
    let [song] = data;
    res.json({
      status: 200,
      message: "success",
      song,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: "Lỗi server!" });
  }
});

module.exports = router;
