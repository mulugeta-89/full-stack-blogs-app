const express = require("express")
const cookieParser = require("cookie-parser")
const multer = require("multer")
const postRouter = require("./routes/posts")
const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")
const db = require("./db")
const app = express()

app.use(express.json())
app.use(cookieParser())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});
app.use("/api/posts", postRouter)
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

db.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database Sucessfully");
  }
});

app.listen(8080, () => {
    console.log("connected")
})