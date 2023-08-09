import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import UsersController from "./controllers/users-controller.js";

const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/Pendulum";
console.log(CONNECTION_STRING);
mongoose.connect(CONNECTION_STRING, {
  dbName: "Pendulum",
});

const app = express();
app.get("/hello", (req, res) => {
  res.send("Hello!");
});

app.use(express.json());

app.use(
  session({
    secret: "secret", // process.env.SECRET
    resave: false,
    saveUnintialized: true
  })
);

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
    ],
  })
);

UsersController(app);

app.listen(process.env.PORT || 4000);
