import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

const port = process.env.PORT || 8086;

import morgan from "morgan";
import dbConnect from "./db.js";

app.use(express.json());

const allowedOrigin = {
  origin: [
    "http://localhost:8080",
    "http://localhost:8081",
    "http://localhost:5173",
  ],
  credentials: true,
};
app.use(cors(allowedOrigin));
app.use(helmet());

dbConnect();

app.use(morgan("combined"));

import employeeRouter from "./routes/employeeRoute.js";
import departmentRouter from "./routes/departmentRoute.js";


app.use("/api/employee", employeeRouter);
app.use("/api/department", departmentRouter);


// app.get("/", (req, res) => {
//   res.render
// });

// app.use(express.static(path.join(__dirname, 'dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "dist")));

// router.get("/:", (req, res) => {
//   res.send("Invalid route");
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.listen(port, () => console.log(`Contact app listening at: ` + port));
