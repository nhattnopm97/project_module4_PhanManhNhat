const express = require("express");
const router = express.Router();
const database = require("../utils/database");

router.get("/", async (req, res) => {
  try {
    let data = await database.execute("SELECT * FROM zingmp3.banner");
    let banner = data[0];
    res.json(banner);
  } catch (error) {
    console.log(error);
    res.json({ status: 500, error });
  }
});

module.exports = router;
