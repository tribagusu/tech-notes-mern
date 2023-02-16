const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/error-handler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/cors-options");
const connectDB = require("./config/db-connect");
const mongoose = require("mongoose");

const app = express();
dotenv.config({ path: "../.env" });

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/users", require("./routes/user.route"));
app.use("/notes", require("./routes/note.route"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("[info] Connected to MongoDB");
  app.listen(process.env.PORT, () => {
    console.log(`[info] server running on port ${process.env.PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.lo(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
