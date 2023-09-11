const express = require("express");
const router = express.Router();
const database = require("../utils/database");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let data = await database.execute(
      "SELECT s.id, h.timelisten, s.name, s.singger,s.link, s.img, s.listens  FROM history as h JOIN song AS s ON s.id = h.song_id WHERE h.user_id = ? ORDER BY h.timelisten DESC;",
      [id]
    );
    let [history] = data;
    res.json({
      status: "success",
      history,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: "Lỗi server!" });
  }
});

router.post("/", async (req, res) => {
  const { song_id, user_id, timelisten } = req.body;
  console.log("song_id, user_id, timelisten", song_id, user_id, timelisten);
  try {
    let table = await database.execute(
      "SELECT * FROM history WHERE user_id = ? ORDER BY timelisten DESC;",
      [user_id]
    );
    let [result] = table;
    let findSong = result.find((song) => song.song_id === song_id);
    if (findSong !== undefined) {
      await database.execute(
        `UPDATE history SET timelisten = ? WHERE (id = ?)`,
        [timelisten, findSong.id]
      );
      return res.json({
        status: 200,
        message: "success",
      });
    }
    let data = await database.execute(
      "INSERT INTO history (song_id, user_id, timelisten) VALUES (?, ?, ?)",
      [song_id, user_id, timelisten]
    );

    res.json({
      status: 200,
      message: "success",
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: "Lỗi server!" });
  }
});

module.exports = router;
