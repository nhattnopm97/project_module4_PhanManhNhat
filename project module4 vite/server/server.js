const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const songRouter = require("./routes/song.routes");
const demoSongRouter = require("./routes/demosong.routes");
const userRouter = require("./routes/user.routes");
const playlistRouter = require("./routes/playlist.routes");
const songInPlaylistRouter = require("./routes/songinplaylist.routes");
const favoriteRouter = require("./routes/favorite.routes");
const bannerRouter = require("./routes/banner.routes");
const historyRouter = require("./routes/history.routes");
server.use(express.static("./public"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(cors());

server.use("/api/v1/song", songRouter);
server.use("/api/v1/demosong", demoSongRouter);
server.use("/api/v1/user", userRouter);
server.use("/api/v1/playlist", playlistRouter);
server.use("/api/v1/songinplaylist", songInPlaylistRouter);
server.use("/api/v1/favorite", favoriteRouter);
server.use("/api/v1/banner", bannerRouter);
server.use("/api/v1/history", historyRouter);

server.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

server.listen(3579, () => {
  console.log("server listening at http://localhost:3579");
});
