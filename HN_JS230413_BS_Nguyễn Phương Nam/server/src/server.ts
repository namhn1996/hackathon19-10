import express from "express";

//require package

import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
const port = 3000;

//require routes
const app = express();

import todoRoutes from "./routes/todo.routes";

//setup routes
app.use("/api/v1/todo", todoRoutes);

// use package
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
