const express = require("express");
const router = express.Router();
const database = require("../utils/database");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let data = await database.execute(
      "SELECT f.id as favorite_id, s.id, s. name, s.link, s.img, s.singger, s.release, s.listens,s.national FROM song AS s JOIN favorite AS f ON s.id = f.song_id WHERE f.user_id = ?",
      [id]
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

router.post("/", async (req, res) => {
  const { user_id, song_id } = req.body;
  try {
    await database.execute(
      "INSERT INTO favorite (song_id, user_id) VALUES (?, ?)",
      [song_id, user_id]
    );
    console.log("oke man");
    res.json({
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: "Lỗi server!" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await database.execute("DELETE FROM favorite WHERE id = ?", [id]);
    res.json({
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: "Lỗi server!" });
  }
});

module.exports = router;
