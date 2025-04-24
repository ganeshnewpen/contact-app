import dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();
const app = express();
const port = process.env.PORT || 8086;

import morgan from "morgan";
import dbConnect from "./db.js";

app.use(express.json());

const allowedOrigin = ['http://localhost:3000', 'http://localhost:3001'];
var corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigin.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

app.use(cors(corsOptions));

dbConnect();

app.use(morgan("combined"));

import contactRouter from "./routes/contactRoute.js";

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api/contact", contactRouter);

app.post("/", (req, res) => {
  console.log(req.body);
  res.json({ success: true });
});

app.listen(port, () => console.log(`Example app listening at: ` + port));
